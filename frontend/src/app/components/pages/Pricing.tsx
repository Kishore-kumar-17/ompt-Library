import { Check, Zap, Star, Building2, ArrowLeft } from "lucide-react";

const plans = [
  {
    id: "free",
    icon: <Zap className="w-5 h-5" />,
    name: "Free",
    price: "â‚¹0",
    period: "forever",
    description: "Explore, copy, and build with the full library.",
    color: "#bce4d8",
    features: [
      "Browse all public prompts",
      "Copy up to 20 prompts/day",
      "Use the Prompt Builder",
      "Use the Prompt Improver",
      "Submit 2 prompts/month",
      "Basic dashboard analytics",
    ],
    cta: "Get started free",
    highlighted: false,
  },
  {
    id: "pro",
    icon: <Star className="w-5 h-5" />,
    name: "Pro",
    price: "â‚¹499",
    period: "per month",
    description: "For power users who want unlimited access and saves.",
    color: "#4FC3F7",
    features: [
      "Everything in Free",
      "Unlimited prompt copies",
      "Unlimited saves to library",
      "Submit unlimited prompts",
      "Priority review for submissions",
      "Full dashboard analytics",
      "Compare across all platforms",
      "Early access to new prompts",
    ],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    id: "enterprise",
    icon: <Building2 className="w-5 h-5" />,
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For teams and agencies that need volume, admin controls, and SLAs.",
    color: "#0a0a0a",
    features: [
      "Everything in Pro",
      "Team workspaces & sharing",
      "Bulk import (CSV/JSON)",
      "Admin review dashboard",
      "Custom prompt categories",
      "API access",
      "Dedicated support & SLA",
      "White-label option",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];

const faqs = [
  { q: "Can I switch plans?", a: "Yes â€” upgrade or downgrade any time. Changes take effect at the next billing cycle." },
  { q: "Is the free plan really free?", a: "Yes, forever. No credit card required to sign up." },
  { q: "What counts as a 'copy'?", a: "Every time you copy a prompt text to your clipboard, that counts as one copy." },
  { q: "Do submitted prompts get reviewed?", a: "Yes â€” all submissions go through editorial review before going live. Pro users get priority review (usually within 24 hours)." },
];

export function Pricing({ go, onAuth }: { go: (p: string) => void; onAuth?: () => void }) {
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-14 text-[#0a0a0a]">

      {/* Header */}
      <div className="text-center mb-14">
        <button onClick={() => go("home")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-3 mx-auto transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <div className="inline-flex items-center gap-2 text-[#0a0a0a] mb-3 text-[13px] font-semibold">
          <Zap className="w-4 h-4" /> Pricing
        </div>
        <h1 className="text-4xl font-bold mb-3">Simple, honest pricing</h1>
        <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
          Start free. Upgrade when you need more. No hidden fees, no lock-in.
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl border-2 p-7 flex flex-col relative ${
              plan.highlighted
                ? "border-[#0a0a0a] shadow-[6px_6px_0_0_#0a0a0a]"
                : "border-[#0a0a0a]/20"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#4FC3F7] border-2 border-[#0a0a0a] text-[#0a0a0a] text-[11px] font-bold px-3 py-0.5 rounded-full whitespace-nowrap">
                Most popular
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl border-2 border-[#0a0a0a] flex items-center justify-center"
                style={{ background: plan.color }}
              >
                {plan.icon}
              </div>
              <span className="text-[18px] font-bold">{plan.name}</span>
            </div>

            <div className="mb-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-[#6b7280] ml-2 text-[14px]">{plan.period}</span>
            </div>
            <p className="text-[#6b7280] text-[14px] mb-6">{plan.description}</p>

            <ul className="space-y-2.5 flex-1 mb-7">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[14px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] shrink-0 mt-2" />
                  <span className="text-[#0a0a0a]">{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={plan.id !== "enterprise" ? () => onAuth?.() : undefined}
              className={`w-full h-11 rounded-full font-bold text-[14px] border-2 border-[#0a0a0a] transition-all hover:shadow-[3px_3px_0_0_#0a0a0a] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
                plan.highlighted
                  ? "bg-[#0a0a0a] text-white"
                  : plan.id === "enterprise"
                  ? "bg-white text-[#0a0a0a]"
                  : "bg-[#4FC3F7] text-[#0a0a0a]"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-5">
              <div className="font-semibold text-[#0a0a0a] mb-1">{faq.q}</div>
              <div className="text-[#6b7280] text-[14px]">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
