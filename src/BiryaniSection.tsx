import { useState } from "react";
import { createWhatsAppUrl } from "./whatsapp";

const BIRYANI_TYPES = [
  {
    name: "Chicken Biryani",
    emoji: "🍗",
    pricePerHead: 200,
    gradient: "from-[#B85C1E] via-[#8B3A0F] to-[#5C1A08]",
    desc: "Aromatic basmati rice layered with tender chicken, slow-cooked in traditional Hyderabadi dum style.",
    highlight: "Hyderabadi Dum Style",
  },
  {
    name: "Mutton Biryani",
    emoji: "🥩",
    pricePerHead: 300,
    gradient: "from-[#7B1E1E] via-[#5C1414] to-[#3A0A0A]",
    desc: "Premium goat meat biryani with saffron-infused rice, slow-cooked for hours.",
    highlight: "Premium Saffron Infused",
  },
];

const GUEST_STEPS = [5, 10, 15, 20, 25, 30, 40, 50];

export default function BiryaniSection() {
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [guestIndex, setGuestIndex] = useState(0);

  const selectedBiryani = BIRYANI_TYPES[selectedTypeIndex];
  const guestCount = GUEST_STEPS[guestIndex];
  const totalPrice = selectedBiryani.pricePerHead * guestCount;

  const buildWhatsAppMessage = () => {
    return `Hello Sumukha Caterers! 🍛\n\nI'd like to order:\n• ${selectedBiryani.name} for ${guestCount} people\n• Total: ₹${totalPrice.toLocaleString("en-IN")}\n\nPlease confirm availability and delivery details.`;
  };

  return (
    <section className="relative py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 overflow-hidden bg-[#1A0F08]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 25% 25%, #C9A96E 1px, transparent 1px), radial-gradient(circle at 75% 75%, #C9A96E 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E40] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E40] to-transparent" />

      {/* Floating mandala accents — hidden on small screens */}
      <svg className="absolute top-12 right-8 opacity-[0.06] pointer-events-none hidden md:block" width="200" height="200" viewBox="0 0 120 120" fill="none">
        {[50, 40, 30, 20].map((r, i) => (
          <circle key={i} cx="60" cy="60" r={r} stroke="#C9A96E" strokeWidth="0.5" />
        ))}
      </svg>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C9A96E15] border border-[#C9A96E30] px-4 sm:px-5 py-1.5 sm:py-2 mb-4 sm:mb-5">
            <span className="text-[#F5C842] text-[10px] sm:text-xs">✦</span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] sm:tracking-[0.3em] text-[#C9A96E] uppercase">Signature Offering</span>
            <span className="text-[#F5C842] text-[10px] sm:text-xs">✦</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAF7F2] mb-2 sm:mb-3">
            Order Our <span className="text-[#F5C842] italic">Signature Biryani</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF7F2AA] max-w-xl mx-auto leading-relaxed px-2">
            Customize your bulk order in three simple steps.
          </p>
        </div>

        {/* Configuration Card */}
        <div className="bg-gradient-to-br from-[#2C1A0E] via-[#241308] to-[#1A0F08] border border-[#C9A96E20] rounded-2xl sm:rounded-[1.75rem] p-5 sm:p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
          
          {/* Step 1: Select Biryani */}
          <div className="mb-8">
            <h3 className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A96E] mb-4">
              1. Select Biryani
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BIRYANI_TYPES.map((biryani, idx) => (
                <button
                  key={biryani.name}
                  onClick={() => setSelectedTypeIndex(idx)}
                  className={`relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 border ${
                    selectedTypeIndex === idx 
                      ? "border-[#F5C842] bg-[#F5C84210] shadow-[0_0_20px_-5px_rgba(245,200,66,0.3)]" 
                      : "border-[#C9A96E20] bg-[#FAF7F205] hover:border-[#C9A96E50] hover:bg-[#FAF7F20A]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{biryani.emoji}</span>
                    <div>
                      <h4 className="font-display text-lg font-bold text-[#FAF7F2] leading-tight">{biryani.name}</h4>
                      <p className="text-[10px] text-[#FAF7F280]">₹{biryani.pricePerHead} per head</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#FAF7F260] leading-relaxed line-clamp-2">{biryani.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E20] to-transparent mb-8" />

          {/* Step 2: Select Quantity */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A96E]">
                2. Select Quantity
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#F5C842]">{guestCount}</span>
                <span className="text-[10px] sm:text-xs text-[#FAF7F280]">people</span>
              </div>
            </div>

            {/* Slider track */}
            <div className="relative mb-4 px-1">
              <input
                type="range"
                min={0}
                max={GUEST_STEPS.length - 1}
                step={1}
                value={guestIndex}
                onChange={(e) => setGuestIndex(Number(e.target.value))}
                className="biryani-slider w-full"
              />
            </div>

            {/* Step pill buttons */}
            <div className="flex justify-between gap-1 sm:gap-0 sm:px-1 overflow-x-auto scrollbar-hide pb-2">
              {GUEST_STEPS.map((step, i) => (
                <button
                  key={step}
                  onClick={() => setGuestIndex(i)}
                  className={`min-w-[32px] sm:min-w-0 py-1.5 sm:py-1 rounded-full text-[11px] sm:text-[10px] font-medium transition-all duration-200 shrink-0 ${
                    i === guestIndex
                      ? "bg-[#F5C84220] text-[#F5C842] ring-1 ring-[#F5C84250]"
                      : "text-[#FAF7F250] hover:text-[#FAF7F280] active:text-[#FAF7F2]"
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E20] to-transparent mb-8" />

          {/* Step 3: Checkout */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A96E] mb-4">
              3. Confirm & Order
            </h3>
            
            <div className="bg-[#FAF7F208] border border-[#C9A96E15] rounded-xl p-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-[#FAF7F280]">{selectedBiryani.name} × {guestCount}</span>
                <span className="text-xs sm:text-sm text-[#FAF7F280]">₹{selectedBiryani.pricePerHead} × {guestCount}</span>
              </div>
              <div className="h-px bg-[#C9A96E20] my-3" />
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-semibold text-[#FAF7F2]">Total Estimate</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#F5C842]">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <a
              href={createWhatsAppUrl(buildWhatsAppMessage())}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 sm:gap-2.5 w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] active:bg-[#1CAF50] text-white font-semibold text-sm sm:text-base tracking-wide transition-all duration-200 hover:shadow-[0_12px_35px_-10px_rgba(37,211,102,0.5)] active:scale-[0.98] touch-manipulation"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </a>
          </div>
        </div>
        
        {/* Bottom note */}
        <div className="text-center mt-6 sm:mt-8 px-2">
          <p className="text-[11px] sm:text-xs text-[#FAF7F260] leading-relaxed">
            <span className="text-[#C9A96E]">✦</span>
            {" "}Prices include packaging & delivery within Hyderabad{" "}
            <span className="text-[#C9A96E]">✦</span>
          </p>
        </div>
      </div>
    </section>
  );
}
