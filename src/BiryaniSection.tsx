import { useState } from "react";
import { createWhatsAppUrl } from "./whatsapp";

const BIRYANI_TYPES = [
  {
    name: "Chicken Biryani",
    emoji: "🍗",
    pricePerHead: 200,
    desc: "Aromatic basmati rice layered with tender chicken, slow-cooked in traditional Hyderabadi dum style.",
    highlight: "Hyderabadi Dum Style",
  },
  {
    name: "Mutton Biryani",
    emoji: "🥩",
    pricePerHead: 300,
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
    <section id="biryani" className="relative py-16 md:py-24 px-6 md:px-10 bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-xs text-[#C9A96E] font-semibold tracking-[0.3em] uppercase mb-3">Signature Offering</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-4">
            Order Our <span className="text-[#7B1E1E] italic">Signature Biryani</span>
          </h2>
          <p className="text-[#5C3D2E] text-sm max-w-lg mx-auto leading-relaxed">
            Customize your bulk order in three simple steps. Freshly prepared, authentically Hyderabadi.
          </p>
          
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A96E60]" />
            <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
              <path d="M16 2 Q22 2 26 9 Q22 16 16 16 Q10 16 6 9 Q10 2 16 2Z" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
              <circle cx="16" cy="9" r="3" fill="#C9A96E60" />
            </svg>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A96E60]" />
          </div>
        </div>

        {/* Configuration Card */}
        <div className="card-light rounded-2xl md:rounded-[2rem] p-6 md:p-10 shadow-[0_20px_50px_-20px_rgba(44,26,14,0.15)] relative overflow-hidden">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-5 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="50" stroke="#7B1E1E" strokeWidth="1" />
              <circle cx="60" cy="60" r="40" stroke="#7B1E1E" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Step 1: Select Biryani */}
          <div className="mb-8 relative z-10">
            <h3 className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#7B1E1E] mb-5">
              1. Select Biryani
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BIRYANI_TYPES.map((biryani, idx) => (
                <button
                  key={biryani.name}
                  onClick={() => setSelectedTypeIndex(idx)}
                  className={`text-left rounded-xl p-4 md:p-5 transition-all duration-300 border ${
                    selectedTypeIndex === idx 
                      ? "border-[#7B1E1E] bg-[#7B1E1E08] shadow-[0_4px_15px_-5px_rgba(123,30,30,0.15)]" 
                      : "border-[#E8DDD0] bg-white hover:border-[#C9A96E] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl md:text-3xl">{biryani.emoji}</span>
                    <div>
                      <h4 className="font-display text-lg md:text-xl font-bold text-[#2C1A0E] leading-tight">{biryani.name}</h4>
                      <p className="text-[10px] md:text-xs text-[#6B5040] font-medium mt-0.5">₹{biryani.pricePerHead} / person</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#5C3D2E] leading-relaxed mt-3">{biryani.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#E8DDD0] mb-8" />

          {/* Step 2: Select Quantity */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#7B1E1E]">
                2. Select Quantity
              </h3>
              <div className="flex items-baseline gap-1 text-[#2C1A0E]">
                <span className="font-display text-2xl md:text-3xl font-bold">{guestCount}</span>
                <span className="text-xs text-[#6B5040]">people</span>
              </div>
            </div>

            {/* Slider track */}
            <div className="relative mb-6 px-1">
              <input
                type="range"
                min={0}
                max={GUEST_STEPS.length - 1}
                step={1}
                value={guestIndex}
                onChange={(e) => setGuestIndex(Number(e.target.value))}
                className="biryani-slider-light w-full"
              />
            </div>

            {/* Step pill buttons */}
            <div className="flex justify-between gap-2 overflow-x-auto scrollbar-hide pb-2">
              {GUEST_STEPS.map((step, i) => (
                <button
                  key={step}
                  onClick={() => setGuestIndex(i)}
                  className={`min-w-[40px] md:min-w-[48px] py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-medium transition-all duration-200 shrink-0 ${
                    i === guestIndex
                      ? "bg-[#7B1E1E] text-white shadow-md"
                      : "bg-[#F5EDE0] text-[#5C3D2E] hover:bg-[#E8DDD0]"
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#E8DDD0] mb-8" />

          {/* Step 3: Checkout */}
          <div>
            <h3 className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#7B1E1E] mb-5">
              3. Confirm & Order
            </h3>
            
            <div className="bg-[#FAF7F2] border border-[#E8DDD0] rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#5C3D2E]">{selectedBiryani.name}</span>
                <span className="text-sm text-[#5C3D2E]">₹{selectedBiryani.pricePerHead} × {guestCount}</span>
              </div>
              <div className="h-px bg-[#E8DDD0] my-3" />
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-[#2C1A0E]">Total Estimate</span>
                <span className="font-display text-2xl md:text-3xl font-bold text-[#7B1E1E]">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <a
              href={createWhatsAppUrl(buildWhatsAppMessage())}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 md:gap-3 w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] active:bg-[#1CAF50] text-white font-semibold text-sm md:text-base tracking-wide transition-all duration-200 hover:shadow-[0_12px_25px_-10px_rgba(37,211,102,0.5)] active:scale-[0.98]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </a>
          </div>
        </div>
        
        {/* Bottom note */}
        <div className="text-center mt-6 md:mt-8">
          <p className="text-xs text-[#5C3D2E] leading-relaxed">
            <span className="text-[#C9A96E]">✦</span>
            {" "}Prices include packaging & delivery within Hyderabad{" "}
            <span className="text-[#C9A96E]">✦</span>
          </p>
        </div>
      </div>
    </section>
  );
}
