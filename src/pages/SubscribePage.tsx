import { Check, Plus, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type Extra = { label: string; note: string; highlight?: boolean };
type Plan = {
  id: string;
  name: string;
  desc: string;
  price: string | null;
  freeLabel: string | null;
  period: string | null;
  badge: string | null;
  buttonLabel: string;
  buttonStyle: "gold" | "navy" | "ghost";
  note: string;
  features: string[];
  extras: Extra[];
};

const plans: Plan[] = [
  {
    id: "trial",
    name: "Free Trial",
    desc: "One full school week · No card · No commitment",
    price: null,
    freeLabel: "5 Days",
    period: null,
    badge: null,
    buttonLabel: "Start Free Trial",
    buttonStyle: "ghost",
    note: "No card · Ends after 5 days",
    features: [
      "Full daily Scriptorium access",
      "Anchor · Oath · Triad · Illumination",
      "Lore · Tides · Forge",
      "Daily Resonance from Master Scribes",
      "Parent progress dashboard",
    ],
    extras: [],
  },
  {
    id: "monthly",
    name: "Monthly",
    desc: "Flexible · Cancel anytime · Books sold separately",
    price: "9.99",
    freeLabel: null,
    period: "/ month",
    badge: null,
    buttonLabel: "Start Monthly",
    buttonStyle: "navy",
    note: "After 5-day free trial",
    features: [
      "Full daily Scriptorium access",
      "Anchor · Oath · Triad · Illumination",
      "Lore · Tides · Forge",
      "Daily Resonance from Master Scribes",
      "Parent progress dashboard",
    ],
    extras: [
      { label: "The Young Scribe (Student Guide)", note: "sold separately" },
      { label: "Our Children in Exile (Parent Guide)", note: "sold separately" },
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    desc: "One full year · Save 20% · Student guide included",
    price: "99",
    freeLabel: null,
    period: "/ year",
    badge: "Best Value · Save 20%",
    buttonLabel: "Start Yearly — Best Value",
    buttonStyle: "gold",
    note: "After 5-day free trial · $99 billed annually",
    features: [
      "Full daily Scriptorium access",
      "Anchor · Oath · Triad · Illumination",
      "Lore · Tides · Forge",
      "Daily Resonance from Master Scribes",
      "Parent progress dashboard",
      "Lion's Pen novel — digital access",
    ],
    extras: [
      { label: "The Young Scribe (Student Guide)", note: "Included", highlight: true },
      { label: "Our Children in Exile (Parent Guide)", note: "sold separately" },
    ],
  },
];

function PlanButton({
  style,
  label,
  onClick,
}: {
  style: Plan["buttonStyle"];
  label: string;
  onClick: () => void;
}) {
  const base =
    "w-full py-3 text-xs tracking-widest uppercase font-semibold transition-opacity hover:opacity-90 cursor-pointer";
  if (style === "gold")
    return (
      <button onClick={onClick} className={`${base} bg-amber-600 text-amber-950`}>
        {label}
      </button>
    );
  if (style === "navy")
    return (
      <button onClick={onClick} className={`${base} bg-slate-800 text-amber-300`}>
        {label}
      </button>
    );
  return (
    <button
      onClick={onClick}
      className={`${base} bg-transparent text-stone-400 border border-amber-600/30 hover:border-amber-600/60`}
    >
      {label}
    </button>
  );
}

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect: () => void }) {
  const isBest = plan.id === "yearly";

  return (
    <div
      className={`relative flex flex-col bg-stone-100 p-8 ${
        isBest ? "border-2 border-amber-600" : "border border-amber-600/35"
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs tracking-widest uppercase px-4 py-1 font-semibold whitespace-nowrap">
          {plan.badge}
        </div>
      )}

      <p className="font-serif text-slate-800 font-bold tracking-wide text-base small-caps mb-1">
        {plan.name}
      </p>
      <p className="text-xs text-stone-400 mb-5 leading-relaxed">{plan.desc}</p>

      {plan.freeLabel ? (
        <p className="font-serif text-5xl italic text-amber-600 font-bold leading-none mb-5">
          {plan.freeLabel}
        </p>
      ) : (
        <div className="flex items-baseline gap-0.5 mb-5">
          <span className="font-serif text-xl font-bold text-slate-800">$</span>
          <span className="font-serif text-5xl italic font-bold text-amber-600 leading-none">
            {plan.price}
          </span>
          <span className="text-xs text-stone-400 self-end pb-1.5">{plan.period}</span>
        </div>
      )}

      <div className="w-full h-px bg-amber-600/20 mb-4" />

      <ul className="flex-1 space-y-2 mb-5">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-stone-600 leading-snug">
            <Check size={13} className="text-amber-600 mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}

        {plan.extras.map((e, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-snug">
            {e.highlight ? (
              <BookOpen size={13} className="text-amber-600 mt-0.5 flex-shrink-0" />
            ) : (
              <Plus size={13} className="text-rose-400 mt-0.5 flex-shrink-0" />
            )}
            <span className={e.highlight ? "text-stone-600" : "text-stone-400 italic"}>
              {e.label}
              {" — "}
              <span className={e.highlight ? "text-amber-600 font-semibold not-italic" : ""}>
                {e.note}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <PlanButton style={plan.buttonStyle} label={plan.buttonLabel} onClick={onSelect} />
      <p className="text-center mt-2 text-xs text-stone-400 tracking-wide">{plan.note}</p>
    </div>
  );
}

export default function SubscribePage() {
  const navigate = useNavigate();
  const handleSelect = () => navigate("/parent?signup=1");

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center px-4 py-12">
      {/* Back to Home */}
      <div className="w-full max-w-4xl mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 hover:text-amber-600 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <span className="block text-xs tracking-widest uppercase text-amber-600 mb-2">
          Join the Lion's Pen
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 mb-1">
          Choose Your{" "}
          <em className="italic text-amber-600 font-normal">Scribe's Journey</em>
        </h1>
        <p className="font-serif italic text-stone-500 text-lg">
          Five days free · No credit card · Cancel anytime
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelect={handleSelect} />
        ))}
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-stone-400 tracking-wider text-center">
        Grades 3–8
        <span className="mx-2 text-amber-600/40">·</span>
        Cancel anytime
        <span className="mx-2 text-amber-600/40">·</span>
        No credit card for trial
        <span className="mx-2 text-amber-600/40">·</span>
        The lions did not touch Daniel
      </p>
    </div>
  );
}
