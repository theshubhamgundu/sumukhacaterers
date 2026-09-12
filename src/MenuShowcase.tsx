import { useMemo, useState } from "react";
import { MENU_TABS, PREMIUM_MENUS, type MenuCategory } from "./data/menuData";
import { createWhatsAppUrl } from "./whatsapp";

type SelectedDish = {
  key: string;
  menuTitle: string;
  category: string;
  item: string;
};

type PremiumSelection = {
  mode: "veg" | "nonVeg";
  tierId: string;
};

const categoryIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("juice") || lower.includes("beverage") || lower.includes("shake")) return "🥤";
  if (lower.includes("sweet") || lower.includes("dessert") || lower.includes("ice cream")) return "🍮";
  if (lower.includes("rice") || lower.includes("biryani")) return "🍚";
  if (lower.includes("bread") || lower.includes("roti")) return "🫓";
  if (lower.includes("curry") || lower.includes("dal")) return "🍛";
  if (lower.includes("pan")) return "🌿";
  if (lower.includes("chicken") || lower.includes("mutton") || lower.includes("kabab") || lower.includes("sea")) return "🍗";
  if (lower.includes("dosa") || lower.includes("breakfast") || lower.includes("classics")) return "🥞";
  if (lower.includes("starter") || lower.includes("snack") || lower.includes("chat")) return "🥗";
  return "✦";
};

function MenuCategoryCard({
  category,
  categoryKey,
  query,
  expanded,
  isItemSelected,
  onToggleItem,
  onToggle,
}: {
  category: MenuCategory;
  categoryKey: string;
  query: string;
  expanded: boolean;
  isItemSelected: (item: string, index: number) => boolean;
  onToggleItem: (item: string, index: number) => void;
  onToggle: () => void;
}) {
  const normalizedQuery = query.toLowerCase();
  const categoryMatches = normalizedQuery && category.name.toLowerCase().includes(normalizedQuery);
  const itemEntries = category.items.map((item, index) => ({ item, index }));
  const matchingItems = query && !categoryMatches
    ? itemEntries.filter(({ item }) => item.toLowerCase().includes(normalizedQuery))
    : itemEntries;
  const visibleItems = expanded ? matchingItems : matchingItems.slice(0, 9);
  const hasMore = matchingItems.length > visibleItems.length;

  return (
    <article className="border border-[#E8DDD0] bg-white/90 p-5 shadow-[0_20px_50px_-40px_rgba(44,26,14,0.7)] transition-all hover:border-[#C9A96E] hover:shadow-[0_22px_60px_-40px_rgba(123,30,30,0.5)]">
      <div className="flex items-start justify-between gap-4 border-b border-[#E8DDD0] pb-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5EDE0] text-xl">
            {categoryIcon(category.name)}
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold leading-tight text-[#7B1E1E]">{category.name}</h3>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B0977E]">
              {matchingItems.length} {matchingItems.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
        <span className="mt-1 text-[#C9A96E]">✦</span>
      </div>

      <ul className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
        {visibleItems.map(({ item, index }) => {
          const selected = isItemSelected(item, index);
          return (
            <li key={`${categoryKey}-${index}`} className="text-sm leading-relaxed text-[#5C3D2E]">
              <label className={`flex cursor-pointer items-start gap-2 rounded-sm p-1.5 -ml-1.5 transition-colors ${selected ? "bg-[#F5E5C8]" : "hover:bg-[#F9F3EA]"}`}>
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => onToggleItem(item, index)}
                  className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#7B1E1E]"
                />
                <span className={item.toLowerCase().startsWith("others") ? "italic text-[#9B7B5A]" : ""}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={onToggle}
          className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#7B1E1E] transition-colors hover:text-[#C9A96E]"
        >
          Show all {matchingItems.length} items →
        </button>
      )}
      {expanded && !query && matchingItems.length > 9 && (
        <button
          type="button"
          onClick={onToggle}
          className="mt-4 block text-xs font-bold uppercase tracking-[0.18em] text-[#9B7B5A] transition-colors hover:text-[#7B1E1E]"
        >
          Show less ↑
        </button>
      )}
    </article>
  );
}

export default function MenuShowcase() {
  const [activeTabId, setActiveTabId] = useState(MENU_TABS[0].id);
  const [query, setQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [premiumMode, setPremiumMode] = useState<"veg" | "nonVeg">("veg");
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>([]);
  const [selectedPremium, setSelectedPremium] = useState<PremiumSelection | null>(null);

  const activeTab = MENU_TABS.find((tab) => tab.id === activeTabId) ?? MENU_TABS[0];
  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return activeTab.categories;

    return activeTab.categories
      .map((category) => {
        const categoryMatches = category.name.toLowerCase().includes(normalizedQuery);
        return {
          ...category,
          items: categoryMatches
            ? category.items
            : category.items.filter((item) => item.toLowerCase().includes(normalizedQuery)),
        };
      })
      .filter((category) => category.name.toLowerCase().includes(normalizedQuery) || category.items.length > 0);
  }, [activeTab, query]);

  const itemCount = activeTab.categories.reduce((total, category) => total + category.items.length, 0);
  const premiumMenu = PREMIUM_MENUS[premiumMode];
  const selectedPremiumTier = selectedPremium
    ? PREMIUM_MENUS[selectedPremium.mode].tiers.find((tier) => tier.id === selectedPremium.tierId)
    : null;

  const toggleDish = (category: MenuCategory, item: string, index: number) => {
    const key = `${activeTab.id}:${category.name}:${index}`;
    setSelectedDishes((current) => {
      const alreadySelected = current.some((dish) => dish.key === key);
      if (alreadySelected) return current.filter((dish) => dish.key !== key);
      return [...current, { key, menuTitle: activeTab.title, category: category.name, item }];
    });
  };

  const isDishSelected = (category: MenuCategory, item: string, index: number) =>
    selectedDishes.some((dish) => dish.key === `${activeTab.id}:${category.name}:${index}` && dish.item === item);

  const whatsappMessage = useMemo(() => {
    const lines = [
      "Hello SA Caterers, I would like a quotation for my event.",
      "",
      "Selected menu items:",
    ];

    if (selectedDishes.length === 0) {
      lines.push("No individual dishes selected yet — please help me plan the menu.");
    } else {
      const grouped = selectedDishes.reduce<Record<string, SelectedDish[]>>((groups, dish) => {
        const groupKey = `${dish.menuTitle} — ${dish.category}`;
        groups[groupKey] = [...(groups[groupKey] ?? []), dish];
        return groups;
      }, {});

      Object.entries(grouped).forEach(([group, dishes]) => {
        lines.push(`${group}:`);
        dishes.forEach((dish) => lines.push(`- ${dish.item}`));
      });
    }

    if (selectedPremiumTier && selectedPremium) {
      lines.push("", `Premium service plan: ${selectedPremiumTier.name}`, `Menu type: ${selectedPremium.mode === "veg" ? "Vegetarian" : "Non-Vegetarian"}`);
    }

    lines.push("", "Please share the quotation and availability. Thank you.");
    return lines.join("\n");
  }, [selectedDishes, selectedPremium, selectedPremiumTier]);

  const whatsappUrl = createWhatsAppUrl(whatsappMessage);

  const selectTab = (id: string) => {
    setActiveTabId(id);
    setQuery("");
    setExpandedCategories({});
  };

  return (
    <section id="menu" className="relative overflow-hidden bg-[#F5EDE0] px-6 py-20 md:px-10 md:py-28">
      <div className="absolute inset-0 opacity-40 paisley-tile pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">The Sumukha Menu Collection</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-[#2C1A0E] md:text-6xl">
            Menus made for <span className="text-[#7B1E1E] italic">memorable</span> gatherings
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#6B5040] md:text-base">
            Explore the complete catering menus from the Sumukha Catererscollection. From breakfast counters to royal wedding spreads,
            every dish is listed exactly as curated for your celebration.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <div className="flex gap-2 overflow-x-auto border-b border-[#D8C2AA] pb-3 [scrollbar-width:none]">
            {MENU_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => selectTab(tab.id)}
                className={`shrink-0 border px-4 py-3 text-left transition-all ${activeTab.id === tab.id
                    ? "border-[#7B1E1E] bg-[#7B1E1E] text-white shadow-md"
                    : "border-[#D8C2AA] bg-[#FAF7F2] text-[#6B5040] hover:border-[#C9A96E] hover:text-[#7B1E1E]"
                  }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] opacity-75">
                  {tab.id.includes("below") ? "Under 200 guests" : tab.id === "breakfast-station" ? "Morning service" : "Signature spread"}
                </span>
                <span className="mt-1 block font-display text-lg font-semibold">{tab.title}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-3xl font-bold text-[#2C1A0E] md:text-4xl">{activeTab.title}</h3>
                <span className="border border-[#C9A96E] bg-[#FAF7F2] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7B4A2A]">
                  {activeTab.categories.length} categories
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6B5040]">{activeTab.description}</p>
            </div>
            <label className="relative block w-full lg:w-72">
              <span className="sr-only">Search this menu</span>
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9B7B5A]">⌕</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search dishes..."
                className="w-full border border-[#D8C2AA] bg-[#FAF7F2] py-3 pl-10 pr-4 text-sm text-[#2C1A0E] outline-none transition-colors placeholder:text-[#B0977E] focus:border-[#7B1E1E]"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#7B4A2A]">
            <span className="border border-[#D8C2AA] bg-[#FAF7F2] px-3 py-2">{itemCount} dishes and services</span>
            <span className="border border-[#D8C2AA] bg-[#FAF7F2] px-3 py-2">Custom requests welcome</span>
            {query && <span className="border border-[#C9A96E] bg-[#C9A96E20] px-3 py-2">{filteredCategories.length} matching categories</span>}
          </div>

          {filteredCategories.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {filteredCategories.map((category, index) => {
                const categoryKey = `${activeTab.id}-${index}`;
                return (
                  <MenuCategoryCard
                    key={categoryKey}
                    category={category}
                    categoryKey={categoryKey}
                    query={query}
                    expanded={Boolean(expandedCategories[categoryKey])}
                    isItemSelected={(item, itemIndex) => isDishSelected(category, item, itemIndex)}
                    onToggleItem={(item, itemIndex) => toggleDish(category, item, itemIndex)}
                    onToggle={() => setExpandedCategories((current) => ({ ...current, [categoryKey]: !current[categoryKey] }))}
                  />
                );
              })}
            </div>
          ) : (
            <div className="mt-8 border border-dashed border-[#C9A96E] bg-[#FAF7F2] px-6 py-12 text-center">
              <p className="font-display text-2xl font-semibold text-[#7B1E1E]">No dishes found</p>
              <p className="mt-2 text-sm text-[#6B5040]">Try another dish name or clear the search to browse the full menu.</p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 border border-[#C9A96E] bg-[#7B1E1E] p-5 text-white md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5C842]">Your WhatsApp quotation list</p>
              <p className="mt-1 text-sm text-white/80">
                {selectedDishes.length} {selectedDishes.length === 1 ? "dish" : "dishes"} selected
                {selectedPremiumTier ? ` · ${selectedPremiumTier.name.split(" — ")[0]} plan selected` : ""}
              </p>
              <p className="mt-2 text-xs text-white/60">Select dishes above, choose a premium plan below, then send everything to SA Caterers.</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              {(selectedDishes.length > 0 || selectedPremium) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDishes([]);
                    setSelectedPremium(null);
                  }}
                  className="border border-white/30 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  Clear
                </button>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#123B20] transition-colors hover:bg-[#8AF0AC]"
              >
                <span aria-hidden="true">◉</span> Send on WhatsApp →
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border border-[#D8C2AA] bg-[#FAF7F2] p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Plan your event with us</p>
              <p className="mt-1 text-sm text-[#6B5040]">{activeTab.disclaimer}</p>
            </div>
            {activeTab.cta ? (
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-maroon inline-flex shrink-0 items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-[0.16em]">
                Get Price Quotation →
              </a>
            ) : (
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-outline-maroon inline-flex shrink-0 items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-[0.16em]">
                Request this menu →
              </a>
            )}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-6xl border-t border-[#D8C2AA] pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">Premium service tiers</p>
            <h3 className="font-display text-4xl font-bold text-[#2C1A0E] md:text-5xl">
              Choose your level of <span className="text-[#7B1E1E] italic">service</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#6B5040]">{premiumMenu.description}</p>
          </div>

          <div className="mx-auto mt-7 flex w-fit rounded-full border border-[#C9A96E] bg-[#FAF7F2] p-1">
            {(["veg", "nonVeg"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setPremiumMode(mode)}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-all ${premiumMode === mode ? "bg-[#7B1E1E] text-white shadow-sm" : "text-[#7B4A2A] hover:text-[#7B1E1E]"
                  }`}
              >
                {mode === "veg" ? "Vegetarian" : "Non-Vegetarian"}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {premiumMenu.tiers.map((tier) => {
              const tierKey = `${premiumMode}-${tier.id}`;
              const expanded = expandedTier === tierKey;
              const visibleItems = expanded ? tier.items : tier.items.slice(0, 10);
              return (
                <article
                  key={tierKey}
                  className={`relative flex flex-col border p-5 ${tier.badge ? "border-[#C9A96E] bg-[#7B1E1E] text-white shadow-[0_25px_60px_-35px_rgba(123,30,30,0.8)]" : "border-[#D8C2AA] bg-[#FAF7F2] text-[#2C1A0E]"
                    }`}
                >
                  {tier.badge && (
                    <span className="absolute right-4 top-4 bg-[#F5C842] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#5C3D2E]">
                      {tier.badge}
                    </span>
                  )}
                  <h4 className={`pr-14 font-display text-2xl font-semibold ${tier.badge ? "text-white" : "text-[#7B1E1E]"}`}>{tier.name.split(" — ")[0]}</h4>
                  <p className={`mt-1 text-xs ${tier.badge ? "text-white/70" : "text-[#9B7B5A]"}`}>{tier.name.split(" — ")[1]}</p>
                  <div className={`my-5 h-px ${tier.badge ? "bg-white/15" : "bg-[#D8C2AA]"}`} />
                  <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${tier.badge ? "text-[#F5C842]" : "text-[#C9A96E]"}`}>Service highlights</p>
                  <ul className="mt-3 space-y-2">
                    {tier.highlights.map((highlight) => (
                      <li key={highlight} className={`flex gap-2 text-xs leading-relaxed ${tier.badge ? "text-white/80" : "text-[#6B5040]"}`}>
                        <span className={tier.badge ? "text-[#F5C842]" : "text-[#C9A96E]"}>✦</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-5 text-[10px] font-bold uppercase tracking-[0.18em] ${tier.badge ? "text-[#F5C842]" : "text-[#C9A96E]"}`}>Menu inclusions</p>
                  <ul className="mt-3 flex-1 space-y-2">
                    {visibleItems.map((item) => (
                      <li key={item} className={`flex gap-2 text-xs leading-relaxed ${tier.badge ? "text-white/80" : "text-[#6B5040]"}`}>
                        <span className={tier.badge ? "text-[#F5C842]" : "text-[#C9A96E]"}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {tier.items.length > 10 && (
                    <button
                      type="button"
                      onClick={() => setExpandedTier(expanded ? null : tierKey)}
                      className={`mt-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] ${tier.badge ? "text-[#F5C842]" : "text-[#7B1E1E]"}`}
                    >
                      {expanded ? "Show less ↑" : `View all ${tier.items.length} inclusions →`}
                    </button>
                  )}
                  <a
                    href={selectedPremium?.mode === premiumMode && selectedPremium.tierId === tier.id ? whatsappUrl : undefined}
                    onClick={(event) => {
                      if (selectedPremium?.mode !== premiumMode || selectedPremium.tierId !== tier.id) {
                        event.preventDefault();
                        setSelectedPremium({ mode: premiumMode, tierId: tier.id });
                      }
                    }}
                    className={`mt-5 inline-flex justify-center border px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${tier.badge ? "border-white/40 text-white hover:bg-white hover:text-[#7B1E1E]" : "border-[#7B1E1E] text-[#7B1E1E] hover:bg-[#7B1E1E] hover:text-white"
                      }`}
                  >
                    {selectedPremium?.mode === premiumMode && selectedPremium.tierId === tier.id ? "Send plan on WhatsApp →" : "Choose this plan →"}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}