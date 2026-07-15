import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { ArrowLeft } from "lucide-react";
import { samplePrompts, platforms, categories } from "../theme";

const tabs = ["Overview", "Categories", "Platforms", "Prompts"];

export function Dashboard({ go }: { go: (p: string) => void }) {
  const [tab, setTab] = useState("Overview");

  const tested = samplePrompts.filter(p => p.tested).length;
  const untested = samplePrompts.length - tested;
  const avgQuality = (samplePrompts.reduce((sum, p) => sum + p.rating, 0) / samplePrompts.length).toFixed(1);
  const contributorCount = new Set(samplePrompts.map(p => p.author)).size;
  const testedData = [
    { name: "Tested",   value: tested,   color: "#4FC3F7" },
    { name: "Untested", value: untested, color: "rgba(10,10,10,0.12)" },
  ];
  const allCatFamilies: [string, string][] = [
    ...categories.image.map(c => [c.name, "Image"] as [string, string]),
    ...categories.video.map(c => [c.name, "Video"] as [string, string]),
    ...categories.website.map(c => [c.name, "Website"] as [string, string]),
    ...categories.text.map(c => [c.name, "Text"] as [string, string]),
  ];
  const allCatData = allCatFamilies.map(([name, family], i) => ({
    name, family,
    score: parseFloat((3.7 + ((i * 0.17) % 1.2)).toFixed(2)),
  }));
  // Overview's compact preview reuses the same scores as the full breakdown,
  // so a category never shows two different numbers depending on which tab you're on.
  const catData = allCatData.slice(0, 6);
  const platData = platforms.map((p, i) => ({
    name: p.name,
    score: parseFloat((3.9 + ((i * 0.19) % 1)).toFixed(2)),
    color: p.color,
  }));

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 text-[#0a0a0a]">
      <button onClick={() => go("library")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-3 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>
      <div className="flex items-center gap-2.5 mb-1 flex-wrap">
        <h1 className="text-3xl font-bold">Analytics <span className="font-extrabold">Dashboard</span></h1>
        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wide">Preview data</span>
      </div>
      <p className="text-[#6b7280] mb-6">A preview of what quality, coverage, and platform-performance analytics will look like — the numbers below are illustrative, not live data yet.</p>

      <div className="flex gap-1 mb-8 bg-[#0a0a0a]/5 p-1 rounded-xl w-fit max-w-full overflow-x-auto no-scrollbar">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`shrink-0 px-4 py-1.5 rounded-lg text-[14px] ${tab===t?"bg-[#4FC3F7] text-white":"text-[#6b7280] hover:text-[#0a0a0a]"}`}>
            {t}
          </button>
        ))}
      </div>
      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {tab === "Overview" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              ["Total prompts", samplePrompts.length],
              ["Tested %",      `${Math.round(tested/samplePrompts.length*100)}%`],
              ["Avg quality",   avgQuality],
              ["Contributors",  contributorCount],
            ].map(([l, v]) => (
              <div key={l as string} className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-5">
                <div className="text-[#6b7280]" style={{ fontSize: "13px" }}>{l}</div>
                <div className="text-3xl text-[#0a0a0a] mt-1" style={{ fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <Chart title="Tested coverage">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={testedData} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={4}>
                    {testedData.map((d) => <Cell key={`tested-${d.name}`} fill={d.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid rgba(10,10,10,0.15)" }} />
                </PieChart>
              </ResponsiveContainer>
            </Chart>
            <Chart title="Category average scores">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={catData}>
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                  <YAxis stroke="#6b7280" domain={[0, 5]} />
                  <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid rgba(10,10,10,0.15)" }} />
                  <Bar dataKey="score" fill="#4FC3F7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Chart>
          </div>
        </>
      )}

      {tab === "Categories" && (
        <Chart title={`All category scores (${allCatData.length} categories across Image, Video, Website, Text)`}>
          <ResponsiveContainer width="100%" height={allCatData.length * 32}>
            <BarChart data={allCatData} layout="vertical" margin={{ left: 40 }}>
              <XAxis type="number" stroke="#6b7280" domain={[0, 5]} />
              <YAxis type="category" dataKey="name" stroke="#6b7280" width={170} fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#ffffff", border: "1px solid rgba(10,10,10,0.15)" }}
                formatter={(value: any, _name, item: any) => [value, item?.payload?.family]}
              />
              <Bar dataKey="score" fill="#4FC3F7" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      )}

      {tab === "Platforms" && (
        <Chart title="Platform performance">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={platData}>
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 5]} />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {platData.map((d) => <Cell key={`plat-${d.name}`} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      )}

      {tab === "Prompts" && (
        <div className="grid md:grid-cols-2 gap-4">
          <PromptList title="Top rated" items={[...samplePrompts].sort((a, b) => b.rating - a.rating).slice(0, 5)} />
          <PromptList title="Needs improvement" items={[...samplePrompts].sort((a, b) => a.rating - b.rating).slice(0, 5)} />
        </div>
      )}
    </div>
  );
}

function Chart({ title, children }: any) {
  return (
    <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-5">
      <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>{title}</div>
      {children}
    </div>
  );
}

function PromptList({ title, items }: any) {
  return (
    <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-5">
      <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>{title}</div>
      <ul className="space-y-2">
        {items.map((p: any, i: number) => (
          <li key={p.id} className="flex items-center gap-3 p-2 rounded hover:bg-[#0a0a0a]/5">
            <div className="text-[#6b7280] w-5 text-[12px] text-right">{i + 1}</div>
            <div className="text-[#0a0a0a] flex-1 line-clamp-1" style={{ fontSize: "13px" }}>{p.title}</div>
            <div className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>★ {p.rating}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}