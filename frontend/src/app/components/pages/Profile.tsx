import { useEffect, useState, type ReactNode } from "react";
import { Settings, Heart, Clock, Upload, Sparkles } from "lucide-react";
import { imageLibraryPrompts } from "../../lib/library-data";
import { PromptCard } from "../PromptCard";
import { profileApi, authStore, submissionsApi, type ProfileStats, type Submission } from "../../lib/api";

export function Profile({ go }: { go: (p: string) => void }) {
  const user = authStore.getUser();
  const displayName = user?.displayName ?? user?.email?.split("@")[0] ?? "Guest";

  const [stats, setStats] = useState<ProfileStats>({ saved: 0, copied: 0, submitted: 0, approved: 0 });
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submissionsLoaded, setSubmissionsLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    profileApi.stats()
      .then(setStats)
      .catch(() => {/* backend not running — keep zeros */})
      .finally(() => setStatsLoaded(true));
    submissionsApi.mine()
      .then(setSubmissions)
      .catch(() => setSubmissions([]))
      .finally(() => setSubmissionsLoaded(true));
  }, []);

  const statCards = [
    { n: String(stats.copied),    l: "Copied" },
    { n: String(stats.saved),     l: "Saved" },
    { n: String(stats.submitted), l: "Submitted" },
    { n: String(stats.approved),  l: "Approved" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 text-[#094067]">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ffd803] to-[#ef4565] flex items-center justify-center text-[#094067] text-xl font-bold border-2 border-[#094067]">
          {displayName[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl text-[#094067] font-bold">Hi, {displayName}</h1>
          <p className="text-[#5f6c7b]">{user ? `${user.email} · Joined 2026` : "Sign in to see your activity"}</p>
        </div>
        <button className="ml-auto inline-flex items-center gap-2 px-4 h-10 rounded-full bg-[#094067]/5 border border-[#094067]/20 text-[#094067] hover:bg-[#094067]/10 transition-colors">
          <Settings className="w-4 h-4" />Settings
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map(({ n, l }) => (
          <div key={l} className="bg-white border border-[#094067]/15 rounded-2xl p-5">
            <div className={`text-3xl text-[#ef4565] font-bold ${!statsLoaded && user ? "animate-pulse opacity-40" : ""}`}>{n}</div>
            <div className="text-[#5f6c7b]">{l}</div>
          </div>
        ))}
      </div>

      <EmptySection icon={<Heart className="w-5 h-5 text-[#ef4565]" />} title="Your favorites" loggedIn={!!user} emptyMsg="Save prompts by clicking the bookmark icon on any prompt card." signInMsg="Sign in to save your favourite prompts." />
      <EmptySection icon={<Clock className="w-5 h-5 text-[#90b4ce]" />} title="Recently viewed" loggedIn={!!user} emptyMsg="Prompts you open will appear here." signInMsg="Sign in to track your recently viewed prompts." />

      <section className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-[#ef4565]" />
          <h2 className="text-[#094067]">Your submissions</h2>
        </div>
        {user ? (
          <div className="bg-white border border-[#094067]/15 rounded-2xl overflow-hidden">
            {!submissionsLoaded ? (
              <div className="p-4 text-[#5f6c7b]">Loading submissions...</div>
            ) : submissions.length === 0 ? (
              <div className="p-4 text-[#5f6c7b]">No submissions yet.</div>
            ) : submissions.map((submission) => {
              const raw = submission.rawData as any;
              const title = raw?.title ?? raw?.basePrompt?.slice?.(0, 60) ?? "Untitled prompt";
              const color = submission.status === "approved"
                ? "#22c55e"
                : submission.status === "rejected"
                  ? "#ef4565"
                  : "#a7a9be";
              return (
                <div key={submission.id} className="flex items-center p-4 border-b last:border-b-0 border-[#094067]/15">
                  <div className="text-[#094067] flex-1 font-medium">{title}</div>
                  <div className="px-2 py-0.5 rounded-full text-[12px] font-bold capitalize" style={{ background: `${color}22`, color }}>{submission.status}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#094067]/15 rounded-2xl p-6 text-[#5f6c7b] text-center">
            Sign in to see your submission history.
          </div>
        )}
      </section>

      <ProfileSection icon={<Sparkles className="w-5 h-5 text-[#ef4565]" />} title="Recommended for you" items={imageLibraryPrompts.slice(0, 4)} go={go} />
    </div>
  );
}

function ProfileSection({ icon, title, items, go }: any) {
  return (
    <section className="mt-10">
      <div className="flex items-center gap-2 mb-4">{icon}<h2 className="text-[#094067]">{title}</h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((p: any) => <PromptCard key={p.id} p={p} onClick={() => go("detail:" + p.id)} />)}
      </div>
    </section>
  );
}

function EmptySection({ icon, title, loggedIn, emptyMsg, signInMsg }: { icon: ReactNode; title: string; loggedIn: boolean; emptyMsg: string; signInMsg: string }) {
  return (
    <section className="mt-10">
      <div className="flex items-center gap-2 mb-4">{icon}<h2 className="text-[#094067]">{title}</h2></div>
      <div className="bg-white border border-[#094067]/15 rounded-2xl p-6 text-[#5f6c7b] text-center">
        {loggedIn ? emptyMsg : signInMsg}
      </div>
    </section>
  );
}
