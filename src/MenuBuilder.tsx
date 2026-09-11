import { useMemo, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const EVENT_TYPES = [
  { id: "wedding", label: "Wedding", icon: "💍", desc: "Haldi · Mehendi · Reception" },
  { id: "engagement", label: "Engagement", icon: "💒", desc: "Ring ceremony & sangeet" },
  { id: "vegetarian", label: "Vegetarian Events", icon: "🪔", desc: "Vegetarian catering" },
  { id: "birthday", label: "Birthday / Anniversary", icon: "🎂", desc: "Family & social events" },
  { id: "corporate", label: "Corporate", icon: "🏛️", desc: "Conferences & launches" },
  { id: "festival", label: "Festival / Mela", icon: "🎊", desc: "Community celebrations" },
];

const MENU_PLANS = [
  {
    id: "veg",
    title: "Full Veg Menu",
    subtitle: "Vegetarian menu designed for weddings, family events, and formal occasions.",
    accent: "#7B1E1E",
    badge: "Most Popular",
    highlights: ["Starters", "Classic curries", "Desserts"],
  },
  {
    id: "non-veg",
    title: "Full Non Veg Menu",
    subtitle: "Rich, celebratory spreads with premium proteins and biryanis.",
    accent: "#2C1A0E",
    badge: "Premium",
    highlights: ["Chicken specialties", "Slow-cooked biryani", "Chef's counters"],
  },
  {
    id: "veg-200",
    title: "Veg Below 200",
    subtitle: "Balanced vegetarian menu for budget-conscious gatherings.",
    accent: "#C9A96E",
    badge: "Budget Friendly",
    highlights: ["Compact menu", "Affordable service", "Easy to customise"],
  },
  {
    id: "nonveg-200",
    title: "Non Veg Below 200",
    subtitle: "Affordable mixed menu options with strong crowd appeal.",
    accent: "#7B4A2A",
    badge: "Value Pick",
    highlights: ["Crowd favourites", "High impact menu", "Great for receptions"],
  },
];

type Dish = { id: string; name: string; tag?: string; veg: boolean; price: number };
type Category = {
  id: string;
  name: string;
  icon: string;
  min: number;
  max: number;
  dishes: Dish[];
};

const CATEGORIES: Category[] = [
  {
    id: "welcome",
    name: "Welcome Drinks",
    icon: "🥤",
    min: 1,
    max: 3,
    dishes: [
      { id: "w1", name: "Aam Panna", tag: "Seasonal", veg: true, price: 15 },
      { id: "w2", name: "Rose Sharbat", veg: true, price: 12 },
      { id: "w3", name: "Jaljeera", tag: "Popular", veg: true, price: 10 },
      { id: "w4", name: "Fresh Lime Soda", veg: true, price: 14 },
      { id: "w5", name: "Thandai", tag: "Festive", veg: true, price: 18 },
      { id: "w6", name: "Coconut Water", veg: true, price: 20 },
    ],
  },
  {
    id: "chaat",
    name: "Chaat & Starters",
    icon: "🥗",
    min: 2,
    max: 6,
    dishes: [
      { id: "c1", name: "Pani Puri Counter", tag: "Must Have", veg: true, price: 35 },
      { id: "c2", name: "Dahi Bhalla", tag: "Popular", veg: true, price: 28 },
      { id: "c3", name: "Aloo Tikki Chaat", veg: true, price: 25 },
      { id: "c4", name: "Raj Kachori", veg: true, price: 30 },
      { id: "c5", name: "Papdi Chaat", veg: true, price: 22 },
      { id: "c6", name: "Samosa Platter", veg: true, price: 18 },
      { id: "c7", name: "Paneer Tikka", tag: "Premium", veg: true, price: 55 },
      { id: "c8", name: "Hara Bhara Kebab", veg: true, price: 40 },
      { id: "c9", name: "Chicken Tikka", tag: "Non-Veg", veg: false, price: 65 },
    ],
  },
  {
    id: "soup",
    name: "Soups",
    icon: "🍲",
    min: 1,
    max: 2,
    dishes: [
      { id: "s1", name: "Tomato Shorba", veg: true, price: 20 },
      { id: "s2", name: "Sweet Corn Soup", tag: "Popular", veg: true, price: 22 },
      { id: "s3", name: "Dal Shorba", veg: true, price: 18 },
      { id: "s4", name: "Chicken Clear Soup", tag: "Non-Veg", veg: false, price: 30 },
    ],
  },
  {
    id: "main",
    name: "Main Course — Curries",
    icon: "🍛",
    min: 3,
    max: 7,
    dishes: [
      { id: "m1", name: "Dal Makhani", tag: "Classic", veg: true, price: 38 },
      { id: "m2", name: "Shahi Paneer", tag: "Popular", veg: true, price: 52 },
      { id: "m3", name: "Palak Paneer", veg: true, price: 45 },
      { id: "m4", name: "Kadai Vegetable", veg: true, price: 35 },
      { id: "m5", name: "Matar Mushroom", veg: true, price: 40 },
      { id: "m6", name: "Rajma Masala", veg: true, price: 32 },
      { id: "m7", name: "Chana Masala", veg: true, price: 30 },
      { id: "m8", name: "Butter Chicken", tag: "Non-Veg", veg: false, price: 70 },
      { id: "m9", name: "Mutton Rogan Josh", tag: "Non-Veg", veg: false, price: 95 },
      { id: "m10", name: "Fish Curry", tag: "Non-Veg", veg: false, price: 80 },
    ],
  },
  {
    id: "rice",
    name: "Rice & Biryani",
    icon: "🍚",
    min: 1,
    max: 3,
    dishes: [
      { id: "r1", name: "Jeera Rice", veg: true, price: 20 },
      { id: "r2", name: "Vegetable Dum Biryani", tag: "Popular", veg: true, price: 55 },
      { id: "r3", name: "Peas Pulao", veg: true, price: 25 },
      { id: "r4", name: "Curd Rice", veg: true, price: 18 },
      { id: "r5", name: "Chicken Dum Biryani", tag: "Non-Veg", veg: false, price: 80 },
      { id: "r6", name: "Mutton Biryani", tag: "Non-Veg", veg: false, price: 110 },
    ],
  },
  {
    id: "bread",
    name: "Breads",
    icon: "🫓",
    min: 2,
    max: 4,
    dishes: [
      { id: "b1", name: "Tandoori Roti", tag: "Must Have", veg: true, price: 8 },
      { id: "b2", name: "Butter Naan", tag: "Popular", veg: true, price: 12 },
      { id: "b3", name: "Laccha Paratha", veg: true, price: 15 },
      { id: "b4", name: "Puri", veg: true, price: 10 },
      { id: "b5", name: "Garlic Naan", veg: true, price: 14 },
      { id: "b6", name: "Missi Roti", veg: true, price: 10 },
    ],
  },
  {
    id: "sides",
    name: "Sides & Accompaniments",
    icon: "🥣",
    min: 2,
    max: 5,
    dishes: [
      { id: "si1", name: "Raita (Boondi / Mix)", veg: true, price: 12 },
      { id: "si2", name: "Papad Platter", veg: true, price: 8 },
      { id: "si3", name: "Pickle Selection", veg: true, price: 6 },
      { id: "si4", name: "Salad Bar", tag: "Fresh", veg: true, price: 15 },
      { id: "si5", name: "Green Chutney & Tamarind", veg: true, price: 8 },
    ],
  },
  {
    id: "dessert",
    name: "Desserts & Sweets",
    icon: "🍮",
    min: 2,
    max: 5,
    dishes: [
      { id: "d1", name: "Gulab Jamun", tag: "Classic", veg: true, price: 25 },
      { id: "d2", name: "Gajar Ka Halwa", veg: true, price: 28 },
      { id: "d3", name: "Kheer", tag: "Popular", veg: true, price: 22 },
      { id: "d4", name: "Rasgulla", veg: true, price: 20 },
      { id: "d5", name: "Jalebi & Rabri", tag: "Festive", veg: true, price: 32 },
      { id: "d6", name: "Ice Cream Counter", tag: "Premium", veg: true, price: 45 },
      { id: "d7", name: "Malpua", veg: true, price: 30 },
    ],
  },
  {
    id: "paan",
    name: "Paan & Mukhwas",
    icon: "🌿",
    min: 0,
    max: 2,
    dishes: [
      { id: "p1", name: "Meetha Paan Counter", tag: "Popular", veg: true, price: 20 },
      { id: "p2", name: "Mukhwas Selection", veg: true, price: 10 },
      { id: "p3", name: "Banarasi Paan", tag: "Special", veg: true, price: 25 },
    ],
  },
];

const GUEST_OPTIONS = [50, 100, 150, 200, 300, 500, 750, 1000, 1500, 2000];
const BASE_SERVICE_CHARGE = 25;

const FEATURED_CATEGORIES = [
  { id: "welcome", label: "Welcome Drinks" },
  { id: "chaat", label: "Chaat & Starters" },
  { id: "main", label: "Main Course" },
  { id: "rice", label: "Rice & Biryani" },
];

// ─── Subcomponents ────────────────────────────────────────────────────────────

function StepBadge({ step, label, active, done }: { step: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${active ? "opacity-100" : done ? "opacity-70" : "opacity-40"}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
        ${active ? "bg-[#7B1E1E] text-white border-[#7B1E1E]" : done ? "bg-[#C9A96E] text-white border-[#C9A96E]" : "bg-white text-[#9B7B5A] border-[#E0D0BC]"}`}>
        {done ? "✓" : step}
      </div>
      <span className={`text-xs font-medium tracking-wide hidden sm:block ${active ? "text-[#7B1E1E]" : "text-[#9B7B5A]"}`}>{label}</span>
    </div>
  );
}

function DishCard({
  dish,
  selected,
  onToggle,
}: {
  dish: Dish;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left p-3 border transition-all duration-200 relative group
        ${selected
          ? "border-[#7B1E1E] bg-[#7B1E1E08]"
          : "border-[#E0D0BC] bg-white hover:border-[#C9A96E]"
        }`}
    >
      <div className="flex items-start gap-2">
        {/* Veg/Non-veg indicator */}
        <span className={`mt-0.5 shrink-0 w-4 h-4 border-2 flex items-center justify-center rounded-sm text-[8px]
          ${dish.veg ? "border-green-600 text-green-600" : "border-red-600 text-red-600"}`}>
          {dish.veg ? "●" : "●"}
        </span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium leading-snug ${selected ? "text-[#7B1E1E]" : "text-[#2C1A0E]"}`}>
            {dish.name}
          </p>
          {dish.tag && (
            <span className="inline-block text-[10px] text-[#C9A96E] font-semibold tracking-wider mt-0.5 bg-[#C9A96E15] px-1.5 py-px">
              {dish.tag}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-xs text-[#9B7B5A]">₹{dish.price}/head</span>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
            ${selected ? "bg-[#7B1E1E] border-[#7B1E1E]" : "border-[#D0C0B0] group-hover:border-[#C9A96E]"}`}>
            {selected && <span className="text-white text-[10px] font-bold">✓</span>}
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MenuBuilder() {
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState<string>("");
  const [activePlan, setActivePlan] = useState<string>(MENU_PLANS[0].id);
  const [guests, setGuests] = useState<number>(200);
  const [customGuests, setCustomGuests] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");
  const [selected, setSelected] = useState<Record<string, Set<string>>>({});
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
  const [submitted, setSubmitted] = useState(false);

  const guestCount = customGuests ? parseInt(customGuests) || guests : guests;

  const toggleDish = (catId: string, dishId: string) => {
    setSelected((prev) => {
      const next = { ...prev };
      const cat = new Set(next[catId] ?? []);
      if (cat.has(dishId)) {
        cat.delete(dishId);
      } else {
        const catDef = CATEGORIES.find((c) => c.id === catId)!;
        if (cat.size >= catDef.max) return prev;
        cat.add(dishId);
      }
      next[catId] = cat;
      return next;
    });
  };

  const selectedForCat = (catId: string) => selected[catId] ?? new Set<string>();

  const categoryStatus = (cat: Category): "ok" | "under" | "empty" => {
    const count = selectedForCat(cat.id).size;
    if (count === 0 && cat.min === 0) return "ok";
    if (count === 0) return "empty";
    if (count < cat.min) return "under";
    return "ok";
  };

  const allCategoriesValid = CATEGORIES.every(
    (cat) => categoryStatus(cat) === "ok"
  );

  const { totalPerHead, totalCost, breakdown } = useMemo(() => {
    let perHead = BASE_SERVICE_CHARGE;
    const breakdown: { catName: string; dishes: string[]; subtotal: number }[] = [];

    CATEGORIES.forEach((cat) => {
      const ids = selectedForCat(cat.id);
      const dishes = cat.dishes.filter((d) => ids.has(d.id));
      if (dishes.length === 0) return;
      const subtotal = dishes.reduce((sum, d) => sum + d.price, 0);
      perHead += subtotal;
      breakdown.push({ catName: cat.name, dishes: dishes.map((d) => d.name), subtotal });
    });

    return { totalPerHead: perHead, totalCost: perHead * guestCount, breakdown };
  }, [selected, guestCount]);

  const totalDishCount = Object.values(selected).reduce((sum, s) => sum + s.size, 0);

  const featuredPreview = FEATURED_CATEGORIES.map((feature) => {
    const category = CATEGORIES.find((cat) => cat.id === feature.id);
    const picked = selectedForCat(feature.id);
    const names = category?.dishes.filter((dish) => picked.has(dish.id)).map((dish) => dish.name) ?? [];

    return {
      label: feature.label,
      count: picked.size,
      items: names.length > 0 ? names.slice(0, 3) : category?.dishes.slice(0, 3).map((dish) => dish.name) ?? [],
    };
  });

  const selectedPlan = MENU_PLANS.find((plan) => plan.id === activePlan) ?? MENU_PLANS[0];

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-display text-3xl font-bold text-[#7B1E1E] mb-3">Your Menu is Ready!</h3>
        <p className="text-[#5C3D2E] mb-2">
          <strong>{eventName || "Your event"}</strong> · {guestCount.toLocaleString()} guests
        </p>
        <p className="text-[#9B7B5A] text-sm mb-6">
          Estimated budget: <strong className="text-[#2C1A0E]">₹{totalCost.toLocaleString()}</strong> (₹{totalPerHead}/head)
        </p>
        <p className="text-sm text-[#6B5040] max-w-sm mb-8">
          Our team will call you within 2 hours to confirm your menu and discuss customisations.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep(1); setSelected({}); setEventType(""); }}
          className="btn-outline-maroon px-8 py-3 text-sm font-semibold tracking-widest uppercase"
        >
          Build Another Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6">

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] mb-8">
        <div className="relative overflow-hidden border border-[#E0D0BC] bg-[#FAF7F2] p-6 md:p-8">
          <div className="absolute inset-0 opacity-40 pointer-events-none paisley-tile" />
          <div className="relative z-10 flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-semibold tracking-[0.3em] text-[#7B4A2A] uppercase">Our Catering Menus</span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase bg-white border border-[#E0D0BC] px-3 py-1 text-[#9B7B5A]">
              SA-style curated plans
            </span>
          </div>
          <h3 className="relative z-10 font-display text-3xl md:text-4xl font-bold text-[#2C1A0E] leading-tight mb-3">
            Build a menu that feels <span className="text-[#7B1E1E] italic">royal</span> before the first plate is served.
          </h3>
          <p className="relative z-10 text-sm md:text-base text-[#5C3D2E] max-w-xl leading-relaxed mb-6">
            Start with a menu plan inspired by the reference experience, then fine-tune course by course for your event size, budget, and taste.
          </p>
          <div className="relative z-10 grid sm:grid-cols-2 gap-3">
            {MENU_PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`text-left border p-4 transition-all duration-200 ${activePlan === plan.id ? "bg-white shadow-sm" : "bg-white/70 hover:bg-white"}`}
                style={{ borderColor: activePlan === plan.id ? plan.accent : "#E0D0BC" }}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h4 className="font-display text-2xl font-semibold text-[#2C1A0E]">{plan.title}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7B4A2A] border border-[#E0D0BC] px-2 py-1 bg-[#FAF7F2]">
                    {plan.badge}
                  </span>
                </div>
                <p className="text-sm text-[#5C3D2E] leading-relaxed mb-3">{plan.subtitle}</p>
                <div className="flex flex-wrap gap-2">
                  {plan.highlights.map((item) => (
                    <span key={item} className="text-[11px] bg-[#F5EDE0] text-[#7B4A2A] border border-[#E0D0BC] px-2.5 py-1">
                      {item}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#7B1E1E] text-white p-6 md:p-8 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] opacity-70 uppercase mb-3">Selected Menu Plan</p>
            <h4 className="font-display text-3xl font-bold mb-2">{selectedPlan.title}</h4>
            <p className="text-sm text-white/80 leading-relaxed mb-6">{selectedPlan.subtitle}</p>
            <div className="space-y-3">
              {featuredPreview.map((preview) => (
                <div key={preview.label} className="bg-white/10 border border-white/10 p-3">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">{preview.label}</span>
                    <span className="text-xs text-[#F5C842]">{preview.count} selected</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preview.items.map((item) => (
                      <span key={item} className="text-[11px] bg-white/10 px-2.5 py-1 border border-white/10">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm text-white/70">Estimated per head</span>
              <span className="font-display text-3xl font-bold text-[#F5C842]">₹{totalPerHead}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-white/70">For {guestCount.toLocaleString()} guests</span>
              <span className="font-display text-4xl font-bold">₹{totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step progress */}
      <div className="flex items-center gap-0 mb-10 max-w-sm mx-auto">
        <StepBadge step={1} label="Event" active={step === 1} done={step > 1} />
        <div className={`flex-1 h-px mx-1 transition-colors ${step > 1 ? "bg-[#C9A96E]" : "bg-[#E0D0BC]"}`} />
        <StepBadge step={2} label="Build Menu" active={step === 2} done={step > 2} />
        <div className={`flex-1 h-px mx-1 transition-colors ${step > 2 ? "bg-[#C9A96E]" : "bg-[#E0D0BC]"}`} />
        <StepBadge step={3} label="Review" active={step === 3} done={false} />
      </div>

      {/* ── STEP 1: Event Details ── */}
      {step === 1 && (
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-[#2C1A0E] mb-1">Tell us about your event</h3>
          <p className="text-sm text-[#9B7B5A] mb-8">We'll suggest the right menu for your occasion.</p>

          {/* Event type */}
          <p className="text-xs font-semibold tracking-[0.2em] text-[#7B4A2A] uppercase mb-3">Select Event Type</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {EVENT_TYPES.map((et) => (
              <button
                key={et.id}
                onClick={() => setEventType(et.id)}
                className={`p-4 border text-left transition-all duration-200
                  ${eventType === et.id ? "border-[#7B1E1E] bg-[#7B1E1E08]" : "border-[#E0D0BC] bg-white hover:border-[#C9A96E]"}`}
              >
                <span className="text-2xl block mb-1">{et.icon}</span>
                <span className={`text-sm font-semibold block ${eventType === et.id ? "text-[#7B1E1E]" : "text-[#2C1A0E]"}`}>{et.label}</span>
                <span className="text-xs text-[#9B7B5A]">{et.desc}</span>
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {/* Event name */}
            <div>
              <label className="block text-xs font-semibold tracking-[0.2em] text-[#7B4A2A] uppercase mb-1.5">
                Event / Family Name
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. Sharma Wedding"
                className="w-full bg-[#FAF7F2] border border-[#E0D0BC] text-[#2C1A0E] placeholder-[#B0977E] px-4 py-2.5 text-sm focus:outline-none focus:border-[#7B1E1E] transition-colors"
              />
            </div>
            {/* Event date */}
            <div>
              <label className="block text-xs font-semibold tracking-[0.2em] text-[#7B4A2A] uppercase mb-1.5">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E0D0BC] text-[#2C1A0E] px-4 py-2.5 text-sm focus:outline-none focus:border-[#7B1E1E] transition-colors"
              />
            </div>
          </div>

          {/* Guests */}
          <p className="text-xs font-semibold tracking-[0.2em] text-[#7B4A2A] uppercase mb-3">Number of Guests</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {GUEST_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => { setGuests(n); setCustomGuests(""); }}
                className={`px-4 py-2 text-sm font-medium border transition-all
                  ${guests === n && !customGuests ? "bg-[#7B1E1E] text-white border-[#7B1E1E]" : "bg-white text-[#5C3D2E] border-[#E0D0BC] hover:border-[#7B1E1E]"}`}
              >
                {n.toLocaleString()}
              </button>
            ))}
            <input
              type="number"
              value={customGuests}
              onChange={(e) => setCustomGuests(e.target.value)}
              placeholder="Custom"
              className="w-24 bg-[#FAF7F2] border border-[#E0D0BC] text-[#2C1A0E] placeholder-[#B0977E] px-3 py-2 text-sm focus:outline-none focus:border-[#7B1E1E] transition-colors"
            />
          </div>
          <p className="text-xs text-[#9B7B5A] mb-8">
            Selected: <strong className="text-[#2C1A0E]">{guestCount.toLocaleString()} guests</strong>
          </p>

          <button
            onClick={() => setStep(2)}
            disabled={!eventType}
            className="btn-maroon px-10 py-3 text-sm font-bold tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue to Menu Builder →
          </button>
        </div>
      )}

      {/* ── STEP 2: Menu Builder ── */}
      {step === 2 && (
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: category nav */}
          <div className="lg:w-56 shrink-0">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#7B4A2A] uppercase mb-3">Courses</p>
            <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {CATEGORIES.map((cat) => {
                const count = selectedForCat(cat.id).size;
                const status = categoryStatus(cat);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 flex items-center gap-2 px-3 py-2.5 text-left border transition-all text-sm
                      ${activeCategory === cat.id
                        ? "bg-[#7B1E1E] text-white border-[#7B1E1E]"
                        : "bg-white border-[#E0D0BC] text-[#5C3D2E] hover:border-[#C9A96E]"
                      }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="hidden lg:block font-medium flex-1 leading-tight text-xs">{cat.name}</span>
                    <span className={`ml-auto text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0
                      ${activeCategory === cat.id
                        ? "bg-white text-[#7B1E1E]"
                        : status === "ok" ? "bg-[#C9A96E20] text-[#7B4A2A]"
                        : status === "under" ? "bg-yellow-100 text-yellow-700"
                        : "bg-[#F5EDE0] text-[#B0977E]"
                      }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: dish grid */}
          <div className="flex-1 min-w-0">
            {CATEGORIES.filter((c) => c.id === activeCategory).map((cat) => {
              const count = selectedForCat(cat.id).size;
              const status = categoryStatus(cat);
              return (
                <div key={cat.id}>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display text-xl font-bold text-[#2C1A0E]">
                      {cat.icon} {cat.name}
                    </h3>
                    <span className={`text-xs font-semibold px-2 py-1
                      ${status === "ok" ? "bg-green-50 text-green-700" : status === "under" ? "bg-yellow-50 text-yellow-700" : "bg-[#F5EDE0] text-[#9B7B5A]"}`}>
                      {count}/{cat.max} selected
                    </span>
                  </div>
                  <p className="text-xs text-[#9B7B5A] mb-4">
                    {cat.min === 0
                      ? `Optional · up to ${cat.max} items`
                      : `Choose ${cat.min}–${cat.max} items`}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {cat.dishes.map((dish) => (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        selected={selectedForCat(cat.id).has(dish.id)}
                        onToggle={() => toggleDish(cat.id, dish.id)}
                      />
                    ))}
                  </div>
                  {status === "under" && (
                    <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 px-3 py-2 mt-3">
                      Please select at least {cat.min} item{cat.min > 1 ? "s" : ""} to proceed.
                    </p>
                  )}
                </div>
              );
            })}

            {/* Nav between categories */}
            <div className="flex gap-3 mt-6">
              {CATEGORIES.findIndex((c) => c.id === activeCategory) > 0 && (
                <button
                  onClick={() => {
                    const idx = CATEGORIES.findIndex((c) => c.id === activeCategory);
                    setActiveCategory(CATEGORIES[idx - 1].id);
                  }}
                  className="btn-outline-maroon px-5 py-2 text-sm font-semibold tracking-wide uppercase"
                >
                  ← Prev
                </button>
              )}
              {CATEGORIES.findIndex((c) => c.id === activeCategory) < CATEGORIES.length - 1 ? (
                <button
                  onClick={() => {
                    const idx = CATEGORIES.findIndex((c) => c.id === activeCategory);
                    setActiveCategory(CATEGORIES[idx + 1].id);
                  }}
                  className="btn-maroon px-5 py-2 text-sm font-semibold tracking-wide uppercase"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={() => setStep(3)}
                  disabled={!allCategoriesValid}
                  className="btn-maroon px-8 py-2 text-sm font-bold tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Review Menu →
                </button>
              )}
            </div>
          </div>

          {/* Right: live cost ticker */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-[#FAF7F2] border border-[#E0D0BC] p-5 sticky top-24">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#7B4A2A] uppercase mb-4">Live Summary</p>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between text-[#5C3D2E]">
                  <span>Event</span>
                  <span className="font-medium text-right text-xs">{eventName || "—"}</span>
                </div>
                <div className="flex justify-between text-[#5C3D2E]">
                  <span>Guests</span>
                  <span className="font-medium">{guestCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5C3D2E]">
                  <span>Dishes</span>
                  <span className="font-medium">{totalDishCount}</span>
                </div>
              </div>
              <div className="gold-divider mb-4" />
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs text-[#9B7B5A]">Per head</span>
                <span className="font-display text-xl font-bold text-[#7B1E1E]">₹{totalPerHead}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[#9B7B5A]">Total est.</span>
                <span className="font-display text-2xl font-bold text-[#2C1A0E]">₹{totalCost.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-[#B0977E] mt-2">*Inclusive of service charge. Taxes extra.</p>
              <div className="gold-divider my-4" />
              <button
                onClick={() => setStep(3)}
                disabled={!allCategoriesValid}
                className="btn-maroon w-full py-2.5 text-xs font-bold tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Review & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3: Review & Submit ── */}
      {step === 3 && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#2C1A0E] mb-1">Review Your Menu</h3>
              <p className="text-sm text-[#9B7B5A]">Confirm your selections before we contact you.</p>
            </div>

            {/* Event summary */}
            <div className="bg-[#FAF7F2] border border-[#E0D0BC] p-5">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-3">Event Details</p>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                {[
                  { label: "Event", value: EVENT_TYPES.find((e) => e.id === eventType)?.label ?? "—" },
                  { label: "Name", value: eventName || "Not specified" },
                  { label: "Date", value: eventDate || "Not specified" },
                  { label: "Guests", value: guestCount.toLocaleString() },
                ].map((r) => (
                  <div key={r.label}>
                    <p className="text-xs text-[#9B7B5A] font-medium uppercase tracking-wide">{r.label}</p>
                    <p className="text-[#2C1A0E] font-semibold mt-0.5">{r.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu breakdown */}
            {breakdown.map((section) => (
              <div key={section.catName} className="bg-white border border-[#E0D0BC] p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-[#2C1A0E]">{section.catName}</p>
                  <span className="text-xs text-[#9B7B5A]">₹{section.subtotal}/head</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.dishes.map((d) => (
                    <span key={d} className="text-xs bg-[#F5EDE0] text-[#5C3D2E] px-2.5 py-1 border border-[#E0D0BC]">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(2)} className="btn-outline-maroon px-6 py-2.5 text-sm font-semibold tracking-widest uppercase">
                ← Edit Menu
              </button>
            </div>
          </div>

          {/* Cost card + submit */}
          <div className="space-y-4">
            <div className="bg-[#7B1E1E] text-white p-6">
              <p className="text-xs font-semibold tracking-[0.25em] opacity-70 uppercase mb-4">Cost Estimate</p>
              {breakdown.map((s) => (
                <div key={s.catName} className="flex justify-between text-sm py-1 border-b border-[#FFFFFF15]">
                  <span className="opacity-80 text-xs">{s.catName}</span>
                  <span className="font-medium">₹{s.subtotal}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm py-1 border-b border-[#FFFFFF15]">
                <span className="opacity-80 text-xs">Service charge</span>
                <span className="font-medium">₹{BASE_SERVICE_CHARGE}</span>
              </div>
              <div className="flex justify-between items-baseline mt-4 mb-1">
                <span className="text-sm opacity-80">Per head</span>
                <span className="font-display text-2xl font-bold">₹{totalPerHead}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm opacity-80">Total ({guestCount.toLocaleString()} guests)</span>
                <span className="font-display text-3xl font-bold text-[#F5C842]">₹{totalCost.toLocaleString()}</span>
              </div>
              <p className="text-[10px] opacity-50 mt-2">*Estimates only. Final quote confirmed by our team.</p>
            </div>

            {/* Contact form */}
            <div className="bg-white border border-[#E0D0BC] p-5 space-y-3">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#7B4A2A] uppercase">Your Contact</p>
              {[
                { label: "Full Name", placeholder: "Ananya Sharma", type: "text" },
                { label: "Phone", placeholder: "+91 98765 43210", type: "tel" },
                { label: "Email", placeholder: "ananya@example.com", type: "email" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[#7B4A2A] uppercase tracking-wider mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full bg-[#FAF7F2] border border-[#E0D0BC] text-[#2C1A0E] placeholder-[#B0977E] px-3 py-2 text-sm focus:outline-none focus:border-[#7B1E1E] transition-colors"
                  />
                </div>
              ))}
              <button
                onClick={() => setSubmitted(true)}
                className="btn-maroon w-full py-3 text-sm font-bold tracking-widest uppercase mt-1"
              >
                Submit Menu Request ✦
              </button>
              <p className="text-[10px] text-[#B0977E] text-center">We'll call back within 2 hours</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
