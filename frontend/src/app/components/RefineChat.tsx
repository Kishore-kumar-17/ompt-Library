import { useState } from "react";
import { MessageSquare, Send, RefreshCw } from "lucide-react";
import type { RefineTurn } from "../lib/api";

/**
 * Chat-driven alternative to the blind "Regenerate" re-roll: the user
 * describes what specifically is wrong ("make it darker", "remove the
 * neon"), and the AI revises the current prompt instead of starting over.
 * `history` always ends on an assistant turn (the latest prompt version) —
 * this component only ever appends a user turn to send.
 */
export function RefineChat({
  history,
  onSend,
  sending,
}: {
  history: RefineTurn[];
  onSend: (instruction: string) => void;
  sending: boolean;
}) {
  const [draft, setDraft] = useState("");

  // The seed turn (the just-generated prompt, posted as the first assistant
  // message) isn't shown as a chat bubble — it's already visible in the
  // prompt box above. Only true back-and-forth refinement turns render here.
  const visibleTurns = history.slice(1);

  function handleSend() {
    const instruction = draft.trim();
    if (!instruction || sending) return;
    onSend(instruction);
    setDraft("");
  }

  return (
    <section className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-4">
      <h3 className="text-[13px] text-[#0a0a0a] inline-flex items-center gap-2 mb-3" style={{ fontWeight: 600 }}>
        <MessageSquare className="w-4 h-4" />
        Not quite right? Tell it what to change
      </h3>

      {visibleTurns.length > 0 && (
        <div className="space-y-2 mb-3 max-h-[240px] overflow-y-auto pr-1">
          {visibleTurns.map((turn, i) => (
            <div
              key={i}
              className={`text-[12px] leading-relaxed rounded-xl px-3 py-2 ${
                turn.role === "user"
                  ? "bg-[#4FC3F7]/15 text-[#0a0a0a] ml-6"
                  : "bg-[#fafafa] border border-[#0a0a0a]/8 text-[#6b7280] mr-6"
              }`}
            >
              {turn.content}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={sending}
          placeholder="e.g. make the lighting darker, remove the neon accents..."
          rows={2}
          className="flex-1 resize-none rounded-xl border border-[#0a0a0a]/15 px-3 py-2 text-[13px] text-[#0a0a0a] placeholder:text-[#6b7280] focus:outline-none focus:border-[#4FC3F7] disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={sending || !draft.trim()}
          className="h-10 w-10 shrink-0 rounded-xl bg-[#4FC3F7] text-[#0a0a0a] flex items-center justify-center hover:bg-[#4FC3F7]/85 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {sending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
}
