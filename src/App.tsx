import { useState } from "react";
import CustomerReviews from "./CustomerReviews";

const logoImg = "/images/logo.jpeg";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const CUISINES = [
  "Telangana Style Breakfast",
  "Tiffin Counters",
  "Live Dosa Counter",
  "Idli Vada Counter",
  "Pure Veg Menu",
  "Non Veg Specials",
  "Biryani Varieties",
  "Rice and Pulao Specials",
  "Indian Breads",
  "Curry Combinations",
  "Chaat Live Stall",
  "Sweets and Desserts",
  "Hot Jalebi Counter",
  "Beverages and Mocktails",
  "Pan and Ice Cream Counter",
];

const HERO_IMAGES = {
  main: "/images/hero/public.avif",
  top: "/images/hero/hero-2.webp",
  bottom: "/images/hero/about-1.png",
};

const HERO_BG_LOOP_IMAGES = [
  "/images/hero/public.avif",
  "/images/hero/hero-2.webp",
  "/images/hero/about-1.png",
];

const ABOUT_IMAGES = {
  chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&h=1100&fit=crop&auto=format",
  plating: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&h=900&fit=crop&auto=format",
};

const SERVICES = [
  {
    title: "Wedding Celebrations",
    desc: "From pre-wedding events to the reception, we build generous menus that keep guests well served.",
    icon: "💍",
    tag: "50 – 5,000 guests",
    image: "/images/services/wedding.jpg",
  },
  {
    title: "Vegetarian Catering",
    desc: "Traditional and modern vegetarian menus with live counters and full-service setup.",
    icon: "🪔",
    tag: "Any scale",
    image: "/images/services/veg.jpg",
  },
  {
    title: "Non-Veg Catering",
    desc: "Carefully curated non-veg menus featuring regional specialties and grilled selections.",
    icon: "🍗",
    tag: "50 – 2,000 guests",
    image: "/images/services/nonveg.jpg",
  },
  {
    title: "Birthday Parties",
    desc: "Kid-friendly and family-style catering for birthday celebrations at home or event venues.",
    icon: "🎂",
    tag: "25 – 800 guests",
    image: "/images/services/birthday.jpg",
  },
  {
    title: "Corporate Gatherings",
    desc: "Professional catering for conferences, product launches, and team celebrations.",
    icon: "🏛️",
    tag: "50 – 1,500 guests",
    image: "/images/services/corporate.jpg",
  },
  {
    title: "House Warming Functions",
    desc: "Neat and timely catering for griha pravesh events with breakfast, lunch, or dinner service.",
    icon: "🏠",
    tag: "30 – 1,000 guests",
    image: "/images/services/housewarming.jpg",
  },
];


// Small SVG mandala for section accents
function MandalaAccent({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className}>
      {[50, 40, 30, 20, 10].map((r, i) => (
        <circle key={i} cx="60" cy="60" r={r} stroke="#C9A96E" strokeWidth={i === 0 ? "0.8" : "0.5"} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line key={i}
            x1={60 + 12 * Math.cos(a)} y1={60 + 12 * Math.sin(a)}
            x2={60 + 50 * Math.cos(a)} y2={60 + 50 * Math.sin(a)}
            stroke="#C9A96E" strokeWidth="0.4"
          />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        const cx = 60 + 35 * Math.cos(a);
        const cy = 60 + 35 * Math.sin(a);
        return <ellipse key={i} cx={cx} cy={cy} rx="5" ry="9" stroke="#C9A96E" strokeWidth="0.5"
          transform={`rotate(${i * 45}, ${cx}, ${cy})`} />;
      })}
      <circle cx="60" cy="60" r="5" fill="#C9A96E40" stroke="#C9A96E" strokeWidth="0.6" />
      <circle cx="60" cy="60" r="2" fill="#C9A96E" />
    </svg>
  );
}

// Gold ornamental divider
function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="gold-divider w-16" />
      <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
        <path d="M16 2 Q22 2 26 9 Q22 16 16 16 Q10 16 6 9 Q10 2 16 2Z" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
        <circle cx="16" cy="9" r="3" fill="#C9A96E60" />
        <line x1="0" y1="9" x2="4" y2="9" stroke="#C9A96E" strokeWidth="0.8" />
        <line x1="28" y1="9" x2="32" y2="9" stroke="#C9A96E" strokeWidth="0.8" />
      </svg>
      <div className="gold-divider w-16" />
    </div>
  );
}

function SectionImage({ src, alt, className = "", caption }: { src: string; alt: string; className?: string; caption?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E80] via-transparent to-transparent" />
      {caption && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/92 backdrop-blur-sm border border-white/60 px-4 py-3 shadow-[0_16px_45px_-30px_rgba(44,26,14,0.6)]">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9B7B5A]">Featured</p>
            <p className="font-display text-lg font-semibold text-[#7B1E1E]">{caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-full bg-[#FAF7F2] text-[#2C1A0E] overflow-clip">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F2F5] backdrop-blur-sm border-b border-[#E0D0BC]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-3">
          <img src={logoImg} alt="Sumukha Caterers" className="h-12 w-auto object-contain" />
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href}
                  className="text-sm font-medium text-[#5C3D2E] hover:text-[#7B1E1E] transition-colors tracking-wider uppercase">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="btn-maroon hidden md:block px-6 py-2 text-sm font-semibold tracking-wider uppercase rounded-none">
            Book Now
          </button>
          <button className="md:hidden text-[#7B1E1E] text-xl" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#FAF7F2F8]">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href}
              className="font-display text-3xl text-[#7B1E1E] font-semibold"
              onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative pt-20 min-h-[calc(100svh-5rem)] md:min-h-screen flex items-center overflow-hidden mandala-tile">
        {/* Background slideshow */}
        <div className="absolute inset-0">
          {HERO_BG_LOOP_IMAGES.map((src, index) => (
            <img
              key={src}
              src={src}
              alt="Catering hero background"
              className="absolute inset-0 h-full w-full object-cover hero-bg-slide"
              style={{ animationDelay: `${index * 6}s` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F218] via-[#FAF7F208] to-[#F5EDE000] md:from-[#FAF7F2CC] md:via-[#FAF7F2B8] md:to-[#F5EDE099]" />
        </div>

        {/* Mandalas */}
        <div className="absolute top-24 right-8 hidden md:block gentle-rise pointer-events-none opacity-30">
          <MandalaAccent size={260} />
        </div>
        <div className="absolute bottom-16 left-4 hidden md:block gentle-rise pointer-events-none opacity-20" style={{ animationDelay: "2.5s" }}>
          <MandalaAccent size={180} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-12 items-center py-10 md:py-20">
          <div className="text-center md:text-left">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-[#F5EDE0] border border-[#C9A96E50] px-4 py-1.5 mb-5 md:mb-6">
              <span className="text-[#C9A96E] text-xs">✦</span>
              <span className="text-xs font-semibold tracking-[0.25em] text-[#7B4A2A] uppercase">Since 1999 · Hyderabad</span>
              <span className="text-[#C9A96E] text-xs">✦</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#2C1A0E] mb-4">
              Welcome to<br />
              <span className="text-[#7B1E1E] italic">Sumukha Caterers</span>
            </h1>

            <p className="text-[#5C3D2E] text-sm sm:text-base leading-relaxed mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
              Sumukha Caterers delivers reliable event catering for weddings, corporate functions, family gatherings, and special occasions.
            </p>

            <OrnamentDivider />

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-5 md:mt-6 justify-center md:justify-start">
              <a href="#menu-builder" className="btn-maroon px-8 py-3 text-sm font-semibold tracking-widest uppercase inline-flex items-center justify-center">
                Explore Menu
              </a>
              <a href="#contact" className="btn-outline-maroon px-8 py-3 text-sm font-semibold tracking-widest uppercase inline-flex items-center justify-center">
                Get a Quote
              </a>
            </div>
          </div>

          {/* Logo card */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-full max-w-[560px]">
              <div className="absolute -inset-4 border border-[#C9A96E20] rounded-[2rem]" />
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 relative z-10">
                <div className="col-span-1 sm:col-span-7 sm:row-span-2 rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-45px_rgba(44,26,14,0.8)] border border-white/60 bg-white">
                  <SectionImage
                    src={HERO_IMAGES.main}
                    alt="Grand catering spread"
                    className="h-[280px] sm:h-[520px]"
                    caption="Events that look as good as they taste"
                  />
                </div>
                <div className="col-span-1 sm:col-span-5 rounded-[1.5rem] overflow-hidden border border-white/60 shadow-[0_20px_60px_-35px_rgba(44,26,14,0.65)] h-[180px] sm:h-[250px]">
                  <SectionImage src={HERO_IMAGES.top} alt="Chef plating dishes" className="h-full" />
                </div>
                <div className="col-span-1 sm:col-span-5 rounded-[1.5rem] overflow-hidden border border-white/60 shadow-[0_20px_60px_-35px_rgba(44,26,14,0.65)] h-[180px] sm:h-[250px]">
                  <SectionImage src={HERO_IMAGES.bottom} alt="Elegant catering table" className="h-full" />
                </div>
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-left-2 bg-white/95 backdrop-blur-sm border border-[#E8DDD0] rounded-full px-4 sm:px-5 py-2.5 sm:py-3 shadow-[0_16px_40px_-30px_rgba(44,26,14,0.6)]">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#9B7B5A]">Trusted by</p>
                <p className="font-display text-xl font-semibold text-[#7B1E1E]">6,000+ Events</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUISINE MARQUEE */}
      <div className="bg-[#7B1E1E] py-4 overflow-hidden border-y border-[#9B7B5A55]">
        <div className="cuisine-marquee-track">
          {[...CUISINES, ...CUISINES].map((cuisine, index) => (
            <span key={`${cuisine}-${index}`} className="inline-flex items-center text-[#F5EDE0] text-sm md:text-base tracking-[0.12em] uppercase whitespace-nowrap">
              <span>{cuisine}</span>
              <span className="mx-5 text-[#F5C842]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-24 px-6 md:px-10 bg-[#FAF7F2] paisley-tile">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-[#C9A96E] font-semibold tracking-[0.3em] uppercase mb-3">What We Offer</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2C1A0E]">
              Services for Every <span className="text-[#7B1E1E] italic">Occasion</span>
            </h2>
            <OrnamentDivider />
          </div>
          <div className="flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto">
            {SERVICES.map((s, index) => (
              <div
                key={s.title}
                style={{ zIndex: index + 1, top: `calc(5.5rem + ${index * 1.5}rem)` }}
                className="card-light overflow-hidden group hover:shadow-[0_20px_70px_-45px_rgba(44,26,14,0.65)] transition-all duration-300 rounded-[1.5rem] sticky"
              >
                <div className="h-44 sm:h-40 md:h-44 overflow-hidden relative">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E90] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-3xl">{s.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-[#7B1E1E] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#6B5040] leading-relaxed mb-4">{s.desc}</p>
                  <span className="text-xs font-medium text-[#9B7B5A] border border-[#C9A96E50] px-3 py-1 inline-block">
                    {s.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATTERS */}
      <section className="py-16 md:py-20 px-6 md:px-10 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs text-[#C9A96E] font-semibold tracking-[0.3em] uppercase mb-3">Platters</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2C1A0E]">
              Simple pricing for <span className="text-[#7B1E1E] italic">every event</span>
            </h2>
            <OrnamentDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="relative overflow-hidden rounded-[1.75rem] bg-cover bg-center p-8 text-white shadow-[0_24px_70px_-30px_rgba(123,30,30,0.7)]"
              style={{ backgroundImage: "url('/images/services/veg-platter-bg.jpg')" }}
              role="img"
              aria-label="Traditional South Indian vegetarian banana leaf platter"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0Ef2] via-[#2C1A0Ea8] to-[#2C1A0E4d]" />
              <div className="absolute -top-16 -right-16 opacity-30 pointer-events-none">
                <MandalaAccent size={240} />
              </div>
              <div className="relative z-10">
                <p className="text-xs text-[#E0D0BC] font-semibold tracking-[0.3em] uppercase mb-3">Veg Platter</p>
                <h3 className="font-display text-4xl font-bold text-[#F5C842] mb-3">Starts from ₹199</h3>
                <p className="text-sm text-[#F5EDE0] opacity-90 leading-relaxed mb-5">
                  Ideal for vegetarian gatherings, tiffin service, and family celebrations.
                </p>
                <div className="flex items-center gap-2 text-sm text-[#FAF7F2]">
                  <span className="text-[#F5C842]">✦</span>
                  <span>Freshly prepared with balanced portions and clean presentation</span>
                </div>
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-[1.75rem] bg-cover bg-center p-8 text-white shadow-[0_24px_70px_-30px_rgba(123,30,30,0.7)]"
              style={{ backgroundImage: "url('/images/services/non-veg-platter-bg.jpg')" }}
              role="img"
              aria-label="Non-vegetarian thali with grilled chicken, curries, and biryani"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0Ef2] via-[#2C1A0Ea8] to-[#2C1A0E4d]" />
              <div className="absolute -bottom-16 -right-16 opacity-30 pointer-events-none">
                <MandalaAccent size={240} />
              </div>
              <div className="relative z-10">
                <p className="text-xs text-[#E0D0BC] font-semibold tracking-[0.3em] uppercase mb-3">Non-Veg Platter</p>
                <h3 className="font-display text-4xl font-bold text-[#F5C842] mb-3">Starts from ₹299</h3>
                <p className="text-sm text-[#F5EDE0] opacity-90 leading-relaxed mb-5">
                  Perfect for weddings, receptions, corporate dining, and premium guest menus.
                </p>
                <div className="flex items-center gap-2 text-sm text-[#FAF7F2]">
                  <span className="text-[#F5C842]">✦</span>
                  <span>Served with rich flavors and event-friendly presentation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <CustomerReviews />


      {/* FOOTER */}
      <footer className="py-14 px-6 md:px-10 bg-[#2C1A0E] border-t border-[#C9A96E20]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={logoImg} alt="Sumukha Caterers" className="h-14 object-contain" />
            <p className="text-xs text-[#FAF7F2AA] text-center md:text-left leading-relaxed">
              Serving events with dependable catering since 1999. Trusted by 6,000+ families across Hyderabad.
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C9A96E]">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-sm mt-0.5">📍</span>
                <p className="text-xs text-[#FAF7F2CC] leading-relaxed">14, Beeramguda 4th Block,<br />Hyderabad, Telangana — 500041</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sm mt-0.5">📞</span>
                <p className="text-xs text-[#FAF7F2CC] leading-relaxed">+91 77997 32345</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sm mt-0.5">✉️</span>
                <p className="text-xs text-[#FAF7F2CC] leading-relaxed">info@sumukhacaterers.in</p>
              </div>
            </div>
          </div>

          {/* Hours & Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C9A96E]">Hours</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-sm mt-0.5">⏰</span>
                <p className="text-xs text-[#FAF7F2CC] leading-relaxed">Monday – Sunday<br />8:00 AM – 9:00 PM</p>
              </div>
            </div>
            <div className="gold-divider w-full opacity-20 mt-2" />
            <div className="flex gap-4 mt-1">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className="text-[10px] uppercase tracking-widest text-[#FAF7F280] hover:text-[#C9A96E] transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[#C9A96E15] text-center">
          <p className="text-[10px] text-[#FAF7F260] tracking-wider">
            © 2026 Sumukha Caterers, Hyderabad. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
