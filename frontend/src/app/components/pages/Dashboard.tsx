import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { samplePrompts, platforms, categories } from "../theme";

const tabs = ["Overview", "Categories", "Platforms", "Prompts"];

export function Dashboard() {
  const [tab, setTab] = useState("Overview");

  const tested = samplePrompts.filter(p => p.tested).length;
  const untested = samplePrompts.length - tested;
  const testedData = [
    { name: "Tested",   value: tested,   color: "#4FC3F7" },
    { name: "Untested", value: untested, color: "#e5e7eb" },
  ];
  const catData = [...categories.image, ...categories.text].slice(0, 6).map((c, i) => ({
    name: c.name,
    score: parseFloat((3.8 + ((i * 0.23) % 1.1)).toFixed(2)),
  }));
  const platData = platforms.map((p, i) => ({
    name: p.name,
    score: parseFloat((3.9 + ((i * 0.19) % 1)).toFixed(2)),
    color: p.color,
  }));

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 text-[#0a0a0a]">
      <h1 className="text-3xl mb-1">Analytics Dashboard</h1>
      <p className="text-[#6b7280] mb-6">Quality, coverage, and performance across your prompt library.</p>

      <div className="flex gap-1 mb-8 bg-[#0a0a0a]/5 p-1 rounded-xl w-fit">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-lg text-[14px] ${tab===t?"bg-[#4FC3F7] text-[#0a0a0a]":"text-[#6b7280] hover:text-[#0a0a0a]"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              ["Total prompts", samplePrompts.length],
              ["Tested %",      `${Math.round(tested/samplePrompts.length*100)}%`],
              ["Avg quality",   "4.7"],
              ["Contributors",  "14"],
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
                  <Tooltip contentStyle={{ background: "#bce4d8", border: "1px solid rgba(10, 10, 10,0.15)" }} />
                </PieChart>
              </ResponsiveContainer>
            </Chart>
            <Chart title="Category average scores">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={catData}>
                  <XAxis dataKey="name" stroke="#94a1b2" fontSize={11} />
                  <YAxis stroke="#94a1b2" domain={[0, 5]} />
                  <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid rgba(10, 10, 10,0.15)" }} />
                  <Bar dataKey="score" fill="#4FC3F7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Chart>
          </div>
        </>
      )}

      {tab === "Categories" && (
        <Chart title="All category scores">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={catData} layout="vertical">
              <XAxis type="number" stroke="#94a1b2" domain={[0, 5]} />
              <YAxis type="category" dataKey="name" stroke="#94a1b2" width={160} />
              <Bar dataKey="score" fill="#4FC3F7" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      )}

      {tab === "Platforms" && (
        <Chart title="Platform performance">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={platData}>
              <XAxis dataKey="name" stroke="#94a1b2" />
              <YAxis stroke="#94a1b2" domain={[0, 5]} />
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
          <PromptList title="Low performers" items={[...samplePrompts].sort((a, b) => a.rating - b.rating).slice(0, 5)} />
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
        {items.map((p: any) => (
          <li key={p.id} className="flex items-center gap-3 p-2 rounded hover:bg-[#0a0a0a]/5">
            <div className="text-[#6b7280] w-14 text-[12px]">{p.id.slice(0, 6)}</div>
            <div className="text-[#0a0a0a] flex-1 line-clamp-1" style={{ fontSize: "13px" }}>{p.title}</div>
            <div className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>★ {p.rating}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}