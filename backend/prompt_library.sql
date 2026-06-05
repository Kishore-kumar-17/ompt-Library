-- =============================================================================
-- PromptVault — Prompt Library Schema
-- Compatible with PostgreSQL 14+ (Supabase / Neon / self-hosted)
-- Run once before importing data:  psql $DATABASE_URL -f prompt_library.sql
-- =============================================================================

-- Fuzzy search support (trigram similarity)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- Accent-insensitive search (searches "cafe" matches "café")
CREATE EXTENSION IF NOT EXISTS unaccent;

-- -----------------------------------------------------------------------------
-- 1. CATEGORIES — normalised lookup table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pl_categories (
  id    SERIAL      PRIMARY KEY,
  name  VARCHAR(100) NOT NULL UNIQUE,
  slug  VARCHAR(100) NOT NULL UNIQUE    -- url-safe version: "art-illustration"
);

-- -----------------------------------------------------------------------------
-- 2. PROMPTS — main table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pl_prompts (
  id            SERIAL        PRIMARY KEY,
  slug          VARCHAR(60)   NOT NULL UNIQUE,  -- original prompt_id e.g. "ART-CUL-001"
  title         VARCHAR(300)  NOT NULL,
  base_prompt   TEXT          NOT NULL,
  category      VARCHAR(100)  NOT NULL,
  sub_category  VARCHAR(100),
  prompt_type   VARCHAR(150),
  tags          TEXT[]        NOT NULL DEFAULT '{}',
  source        VARCHAR(100)  DEFAULT 'curated',
  quality_score SMALLINT      DEFAULT 5 CHECK (quality_score BETWEEN 1 AND 10),
  tested        BOOLEAN       DEFAULT FALSE,

  -- Generated full-text search vector (auto-updated on INSERT/UPDATE)
  -- Covers title, base_prompt, category, sub_category, and all tags
  search_vec    TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english',
      unaccent(coalesce(title, ''))        || ' ' ||
      unaccent(coalesce(base_prompt, ''))  || ' ' ||
      unaccent(coalesce(category, ''))     || ' ' ||
      unaccent(coalesce(sub_category, '')) || ' ' ||
      unaccent(coalesce(prompt_type, ''))  || ' ' ||
      unaccent(array_to_string(tags, ' '))
    )
  ) STORED,

  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 3. PLATFORM VERSIONS — one row per prompt × platform
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pl_prompt_platforms (
  id          SERIAL       PRIMARY KEY,
  prompt_id   INTEGER      NOT NULL REFERENCES pl_prompts(id) ON DELETE CASCADE,
  platform    VARCHAR(50)  NOT NULL,   -- chatgpt | gemini | grok | midjourney | firefly | flux
  prompt_text TEXT         NOT NULL,
  UNIQUE (prompt_id, platform)
);

-- -----------------------------------------------------------------------------
-- 4. USER ACTIVITY FOR IMPORTED LIBRARY
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pl_saved_prompts (
  user_id   VARCHAR(21) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt_id INTEGER     NOT NULL REFERENCES pl_prompts(id) ON DELETE CASCADE,
  saved_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, prompt_id)
);

CREATE TABLE IF NOT EXISTS pl_copy_events (
  id         SERIAL      PRIMARY KEY,
  prompt_id  INTEGER     NOT NULL REFERENCES pl_prompts(id) ON DELETE CASCADE,
  user_id    VARCHAR(21) REFERENCES users(id) ON DELETE SET NULL,
  platform   VARCHAR(50),
  copied_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. INDEXES
-- -----------------------------------------------------------------------------

-- Full-text search (fast for @@ operator)
CREATE INDEX IF NOT EXISTS idx_pl_prompts_search
  ON pl_prompts USING GIN(search_vec);

-- Tag containment/overlap queries  (@>, &&, @< operators)
CREATE INDEX IF NOT EXISTS idx_pl_prompts_tags
  ON pl_prompts USING GIN(tags);

-- Trigram fuzzy search on title (ILIKE '%...%' and similarity())
CREATE INDEX IF NOT EXISTS idx_pl_prompts_title_trgm
  ON pl_prompts USING GIN(title gin_trgm_ops);

-- Category filter
CREATE INDEX IF NOT EXISTS idx_pl_prompts_category
  ON pl_prompts (category);

-- Platform lookup
CREATE INDEX IF NOT EXISTS idx_pl_platforms_prompt
  ON pl_prompt_platforms (prompt_id);

CREATE INDEX IF NOT EXISTS idx_pl_saved_user
  ON pl_saved_prompts (user_id);

CREATE INDEX IF NOT EXISTS idx_pl_copy_user
  ON pl_copy_events (user_id);

-- -----------------------------------------------------------------------------
-- 6. UPDATED_AT trigger
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE OR REPLACE TRIGGER trg_pl_prompts_updated_at
  BEFORE UPDATE ON pl_prompts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =============================================================================
-- UPGRADE PATH — AI Semantic Search with pgvector
-- =============================================================================
-- When you're ready to add embedding-based semantic search:
--
--   1. Enable the extension (available on Supabase/Neon by default):
--        CREATE EXTENSION IF NOT EXISTS vector;
--
--   2. Add an embedding column (OpenAI text-embedding-3-small = 1536 dims):
--        ALTER TABLE pl_prompts ADD COLUMN embedding VECTOR(1536);
--
--   3. Generate embeddings for existing rows via your backend:
--        const embed = await openai.embeddings.create({ model: 'text-embedding-3-small', input: row.title + ' ' + row.base_prompt });
--        await db.query('UPDATE pl_prompts SET embedding=$1 WHERE id=$2', [embed.data[0].embedding, row.id]);
--
--   4. Create an approximate nearest-neighbour index:
--        CREATE INDEX ON pl_prompts USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
--
--   5. Semantic search query:
--        SELECT *, 1 - (embedding <=> $queryEmbedding) AS similarity
--        FROM pl_prompts
--        ORDER BY embedding <=> $queryEmbedding
--        LIMIT 20;
-- =============================================================================
