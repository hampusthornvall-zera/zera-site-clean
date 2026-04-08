"use client";

import { useMemo, useRef, useState } from "react";

type Direction = "left" | "right";

type JourneyItem = {
  num: string;
  eye: string;
  title: string;
  desc: string;
  tags: string[];
  dark?: boolean;
};

type PackageItem = {
  tag: string;
  name: string;
  collabs: string;
  price: string;
  per: string;
  dark?: boolean;
  extras: string[];
};

type Recommendation = {
  stage: string;
  title: string;
  desc: string;
  services: { name: string; detail: string }[];
  note: string;
};

const journey: JourneyItem[] = [
  {
    num: "01",
    eye: "Starting out",
    title: "Gifted program",
    desc: "The lowest-risk way to start. We find creators who fit your brand, send them your products, coach them on content quality, and handle everything end to end.",
    tags: ["No influencer budget", "New to influencer marketing", "Testing the format"],
  },
  {
    num: "02",
    eye: "Growing",
    title: "Gifted + Paid",
    desc: "Once you have seen gifted results, we layer in paid creators for reach and awareness. Gifted builds volume and organic content. Paid amplifies it.",
    tags: ["€5,000–€30,000 budget", "Expanding to new markets", "Scaling what works"],
  },
  {
    num: "03",
    eye: "Full program",
    title: "Always-on",
    desc: "Paid campaigns across markets, gifted running continuously, and usage rights on the best content. Full budget managed by us.",
    tags: ["€30,000+ budget", "Multiple markets", "Full outsourcing"],
    dark: true,
  },
];

const packages: PackageItem[] = [
  {
    tag: "01 · Starter",
    name: "Starter",
    collabs: "5 collaborations",
    price: "€850",
    per: "€170 per collab",
    extras: [],
  },
  {
    tag: "02 · Growth",
    name: "Growth",
    collabs: "10 collaborations",
    price: "€1,500",
    per: "€150 per collab · most popular",
    extras: ["Monthly progress report", "Meta ads rights available"],
  },
  {
    tag: "03 · Scale",
    name: "Scale",
    collabs: "20 collaborations",
    price: "€2,800",
    per: "€140 per collab",
    extras: ["Monthly progress report", "Meta ads rights available", "Quarterly strategy call", "Bi-weekly progress reports"],
    dark: true,
  },
];

const included = [
  "Creator scouting & outreach",
  "30 min creator coaching",
  "Gifting logistics",
  "Content editing",
  "Scheduling & coordination",
  "Results report",
  "Social media usage rights",
];

const campaignCards = [
  { title: "Selected work", brand: "Brand name", metric: "Replace with result" },
  { title: "Selected work", brand: "Brand name", metric: "Replace with result" },
  { title: "Selected work", brand: "Brand name", metric: "Replace with result" },
  { title: "Selected work", brand: "Brand name", metric: "Replace with result" },
  { title: "Selected work", brand: "Brand name", metric: "Replace with result" },
];

const testimonials = [
  {
    quote: "Placeholder for a strong quote about results, communication, and content quality.",
    name: "Name Surname",
    role: "Marketing Executive · Brand",
  },
  {
    quote: "Placeholder for a strong quote about creator fit, performance, and how smooth the process felt.",
    name: "Name Surname",
    role: "CEO · Brand",
  },
  {
    quote: "Placeholder for a strong quote about strategic thinking, speed, and performance-driven content.",
    name: "Name Surname",
    role: "Head of Marketing · Brand",
  },
];

const menuItems = [
  ["About", "#about"],
  ["Trusted By", "#trusted-by"],
  ["Case Studies", "#case-studies"],
  ["Journey", "#roadmap"],
  ["Gifted", "#services"],
  ["Paid", "#products"],
  ["Project Cards", "#project-cards"],
  ["Budget Tool", "#quote"],
  ["Contact", "#contact"],
] as const;

function formatBudget(value: number) {
  if (value >= 15000) return "€15,000+";
  return `€${value.toLocaleString()}`;
}

function getRecommendation(budget: number): Recommendation {
  if (budget === 0) {
    return {
      stage: "Stage 01 — Gifted only",
      title: "Start with gifted.",
      desc: "You do not need a paid budget to start. Our gifted program delivers fully managed creator collaborations using your products as the only currency.",
      services: [
        { name: "Starter package", detail: "5 collabs · €850" },
        { name: "Creator coaching", detail: "Included" },
        { name: "Content editing", detail: "Included" },
        { name: "Results report", detail: "Included" },
      ],
      note: "Most brands we work with start here and see results that rival paid campaigns.",
    };
  }

  if (budget <= 1500) {
    return {
      stage: "Stage 01 — Gifted",
      title: "Gifted Starter package.",
      desc: "At this budget, gifted collaborations are your best investment. Run 5 fully managed gifted collabs that are coached, edited, and optimised to perform.",
      services: [
        { name: "Gifted Starter", detail: "5 collabs · €850" },
        { name: "Meta ads rights", detail: "€100 per free collab" },
        { name: "Content editing", detail: "Included" },
        { name: "Remaining budget", detail: "Boost best content" },
      ],
      note: "Use remaining budget to amplify your best performing gifted content as ads.",
    };
  }

  if (budget <= 4000) {
    return {
      stage: "Stage 01 — Gifted",
      title: "Gifted Growth package.",
      desc: "10 fully managed collaborations, monthly progress reports, and usage-rights negotiation on every collaboration.",
      services: [
        { name: "Gifted Growth", detail: "10 collabs · €1,500" },
        { name: "Meta ads rights", detail: "Negotiated on all collabs" },
        { name: "Monthly report", detail: "Included" },
        { name: "Remaining budget", detail: "Ad spend on proven content" },
      ],
      note: "Securing usage rights turns your gifted content into a paid media library.",
    };
  }

  if (budget <= 8000) {
    return {
      stage: "Stage 01-02 — Gifted + first paid creators",
      title: "Gifted program + 1–2 paid creators.",
      desc: "At this level we run a full gifted program alongside 1–2 paid creator collaborations, combining content volume and targeted reach.",
      services: [
        { name: "Gifted Growth", detail: "10 collabs · €1,500" },
        { name: "Paid longlist", detail: "Free" },
        { name: "Paid setup fee", detail: "8% of paid budget" },
        { name: "Paid management", detail: "15% of creator fees" },
      ],
      note: "We recommend starting with 1–2 paid creators to test before scaling.",
    };
  }

  return {
    stage: "Stage 02 — Gifted + Paid",
    title: "Full gifted + paid program.",
    desc: "Gifted and paid working together at full strength. A continuous gifted program builds organic content while paid creators drive reach and sales.",
    services: [
      { name: "Gifted Scale", detail: "20 collabs · €2,800" },
      { name: "Paid setup", detail: "8% of paid budget" },
      { name: "Paid management", detail: "15% of creator fees" },
      { name: "Usage rights", detail: "All collabs negotiated" },
    ],
    note: "Total fee: approximately 23% of paid budget plus the gifted package.",
  };
}

function MenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className="flex h-[34px] w-[34px] flex-col items-center justify-center gap-[5px]"
    >
      <span className={`block h-[1.5px] w-8 bg-black transition-transform duration-200 ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
      <span className={`block h-[1.5px] w-8 bg-black transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`} />
      <span className={`block h-[1.5px] w-8 bg-black transition-transform duration-200 ${isOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
    </button>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 30 C40 25, 70 20, 90 25" stroke="#000" strokeWidth="6" strokeLinecap="round" />
      <path d="M45 25 C42 50, 40 70, 38 90" stroke="#000" strokeWidth="6" strokeLinecap="round" />
      <path d="M55 65 C60 60, 70 60, 72 75 C74 90, 60 95, 50 85" stroke="#000" strokeWidth="6" strokeLinecap="round" />
      <circle cx="70" cy="55" r="4" fill="#000" />
    </svg>
  );
}

export default function ServicesLandingPage() {
  const [budget, setBudget] = useState(2500);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const campaignSliderRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollLeftRef = useRef(0);

  const recommendation = useMemo(() => getRecommendation(budget), [budget]);

  const scrollCampaigns = (direction: Direction) => {
    const el = campaignSliderRef.current;
    if (!el) return;
    const amount = 340;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const handleCampaignPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = campaignSliderRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragScrollLeftRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const handleCampaignPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = campaignSliderRef.current;
    if (!el || !isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    el.scrollLeft = dragScrollLeftRef.current - delta;
  };

  const handleCampaignPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = campaignSliderRef.current;
    if (!el) return;
    isDraggingRef.current = false;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const closeMenuAndScroll = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f2] p-4 text-[#111111]">
      <div className="mx-auto max-w-[1220px] overflow-hidden rounded-[6px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <header className="grid items-center gap-8 px-7 py-6 md:grid-cols-[110px_1fr]">
          <div className="grid place-items-start">
            <div className="h-[34px] w-[34px]">
              <LogoMark />
            </div>
          </div>

          <div className="relative ml-auto z-[60]">
            <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((prev) => !prev)} />
          </div>
        </header>

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setIsMenuOpen(false)}>
            <div
              className="absolute right-6 top-20 min-w-[260px] overflow-hidden rounded-sm border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col">
                {menuItems.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={closeMenuAndScroll(href)}
                    className="border-b border-black/5 px-5 py-4 text-[12px] uppercase tracking-[0.18em] text-black/75 transition hover:bg-black hover:text-white last:border-b-0"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

        <section className="relative m-4 overflow-hidden bg-[#EDEBE6] px-12 py-24 max-md:px-6">
          <div className="max-w-[900px]">
            <div className="mb-6 text-[11px] uppercase tracking-[0.25em] text-black/40">Influencer Marketing · Home Improvement</div>
            <h1 className="font-serif text-[clamp(38px,5.5vw,72px)] leading-[1.05] tracking-[-0.03em] text-black">
              We find the right
              <br />
              creators.
              <span className="text-black/40 italic"> You grow.</span>
            </h1>
            <p className="mt-8 max-w-[520px] text-[15px] leading-[1.9] text-black/70">
              Precision influencer marketing for home decor and home improvement brands. From gifted collaborations to full paid campaigns — fully managed, end to end.
            </p>
          </div>

          <div className="mt-20 flex justify-end">
            <a href="#contact" className="border-b border-black/30 pb-1 text-[12px] font-medium uppercase tracking-[0.2em] text-black">
              Start a conversation →
            </a>
          </div>
        </section>

        <section id="about" className="bg-[#0b0b0d] px-12 py-24 text-white max-md:px-6 max-md:py-16">
          <div className="mb-14 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50 after:h-px after:flex-1 after:bg-white/10 after:content-['']">
            About
          </div>
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-[clamp(38px,5vw,60px)] leading-[1.05] tracking-[-0.015em]">
                Not just an agency.
                <br />
                <em className="text-white/50">A content machine.</em>
              </h2>
              <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/15 pt-10">
                {[
                  ["1M+", "Creator community followers"],
                  ["400+", "Creators in our network"],
                  ["100%", "Home decor focus"],
                  ["7+", "Years of experience"],
                ].map(([num, label]) => (
                  <div key={String(num) + String(label)}>
                    <div className="font-serif text-[44px] leading-none">{num}</div>
                    <div className="mt-1 text-[12px] text-white/50">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5 text-sm text-white/75">
              <p>Most agencies send a product and hope for the best. We coach every creator before they film, edit the content professionally, and optimise every detail for the algorithm before anything goes live.</p>
              <p>We have done hundreds of collaborations. We know what will perform before it is posted. That is the difference between gifted content that disappears and gifted content that drives real results.</p>
              <p>We work exclusively with home decor and home improvement brands. That focus means we know your market, your aesthetic, and the creators your audience trusts.</p>
            </div>
          </div>
        </section>

        <section id="trusted-by" className="bg-white px-12 py-24 max-md:px-6 max-md:py-16">
          <div className="mb-14 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40 after:h-px after:flex-1 after:bg-black/10 after:content-['']">
            Trusted By
          </div>
          <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="grid h-[92px] place-items-center bg-[#f7f6f2] text-[13px] uppercase tracking-[0.22em] text-black/30">
                Brand logo
              </div>
            ))}
          </div>
        </section>

        <section id="case-studies" className="bg-white px-12 pb-24 max-md:px-6 max-md:pb-16">
          <div className="mb-10 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <div className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">Case Studies</div>
              <h2 className="font-serif text-[clamp(38px,5vw,60px)] leading-[1.02] tracking-[-0.02em] text-black">
                We turn content into
                <br />
                measurable growth.
              </h2>
            </div>
            <div className="md:justify-self-end">
              <p className="max-w-[620px] text-[15px] leading-[1.9] text-black/65">
                Add your real Instagram campaign screenshots here. Every card uses the same 9:16 ratio and sits inside a clean horizontal slider.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous campaigns"
                  onClick={() => scrollCampaigns("left")}
                  className="grid h-11 w-11 place-items-center rounded-full border border-black/10 text-black transition hover:bg-black hover:text-white"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next campaigns"
                  onClick={() => scrollCampaigns("right")}
                  className="grid h-11 w-11 place-items-center rounded-full border border-black/10 text-black transition hover:bg-black hover:text-white"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div
            ref={campaignSliderRef}
            onPointerDown={handleCampaignPointerDown}
            onPointerMove={handleCampaignPointerMove}
            onPointerUp={handleCampaignPointerUp}
            onPointerLeave={handleCampaignPointerUp}
            className="overflow-x-auto scroll-smooth cursor-grab select-none pb-4 active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex min-w-max gap-5">
              {campaignCards.map((item, idx) => (
                <article key={idx} className="group w-[320px] shrink-0 snap-start">
                  <div className="mb-3 aspect-[9/16] overflow-hidden bg-[#e9e7e1]">
                    <div className="grid h-full place-items-center text-center text-[12px] uppercase tracking-[0.2em] text-black/30">
                      Instagram campaign image
                    </div>
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/35">{item.title}</div>
                  <div className="mt-1 font-serif text-[22px] leading-none text-black">{item.brand}</div>
                  <div className="mt-2 text-[13px] leading-[1.7] text-black/55">{item.metric}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b0b0d] px-12 py-24 text-white max-md:px-6 max-md:py-16">
          <div className="mb-14 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40 after:h-px after:flex-1 after:bg-white/10 after:content-['']">
            Testimonials
          </div>
          <div className="mb-10 grid gap-10 md:grid-cols-2 md:items-end">
            <h2 className="font-serif text-[clamp(38px,5vw,60px)] leading-[1.02] tracking-[-0.02em] text-white">
              What brand teams say
              <br />
              after working with us.
            </h2>
            <p className="max-w-[560px] text-[15px] leading-[1.9] text-white/65 md:justify-self-end">
              Add 4–6 testimonials here from marketing executives, founders, or CEOs. Short, specific quotes will make this section far more powerful than generic praise.
            </p>
          </div>

          <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            {testimonials.map((item, idx) => (
              <article key={idx} className="bg-[#0b0b0d] p-8">
                <div className="mb-8 text-[28px] leading-none text-white/20">“</div>
                <p className="min-h-[120px] text-[15px] leading-[1.9] text-white/78">{item.quote}</p>
                <div className="mt-10 border-t border-white/10 pt-5">
                  <div className="text-[12px] font-medium text-white">{item.name}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/40">{item.role}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="roadmap" className="bg-[#E2E2E0] px-12 py-24 max-md:px-6 max-md:py-16">
          <div className="mb-14 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/50 after:h-px after:flex-1 after:bg-black/10 after:content-['']">
            The Journey
          </div>
          <h2 className="font-serif text-[clamp(38px,5vw,60px)] leading-[1.05] tracking-[-0.015em]">
            We meet you where you are.
            <br />
            <em className="text-[#a3a3a3]">And take you further.</em>
          </h2>
          <p className="mt-4 max-w-[560px] text-sm leading-[1.9] text-black/70">
            Whether you have never worked with a creator or are running campaigns across multiple markets, we build the right program for your brand today and grow it from there.
          </p>

          <div className="mt-12 grid gap-0 md:grid-cols-[1fr_44px_1fr_44px_1fr]">
            {journey.map((item, idx) => (
              <div key={item.num} className="contents">
                <div className={`border p-9 ${item.dark ? "border-white/15 bg-[#111214] text-white" : "border-black/15 bg-[#E2E2E0]"}`}>
                  <div className={`font-serif text-[52px] leading-none ${item.dark ? "text-white" : "text-[#a3a3a3]"}`}>{item.num}</div>
                  <div className={`mb-3 mt-4 text-[9px] font-semibold uppercase tracking-[0.2em] ${item.dark ? "text-white/50" : "text-black/50"}`}>{item.eye}</div>
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className={`mb-6 mt-4 text-[13px] ${item.dark ? "text-white/70" : "text-black/70"}`}>{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className={`border px-3 py-1 text-[10px] ${item.dark ? "border-white/15 text-white/50" : "border-black/15 text-black/50"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {idx < journey.length - 1 && <div className="grid place-items-center text-[22px] text-black/30 max-md:rotate-90 max-md:py-4">→</div>}
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="bg-[#E2E2E0] px-12 py-24 max-md:px-6 max-md:py-16">
          <div className="mb-14 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/50 after:h-px after:flex-1 after:bg-black/10 after:content-['']">
            Gifted Program
          </div>
          <div className="mb-12 grid items-end gap-16 md:grid-cols-2">
            <h2 className="font-serif text-[clamp(38px,5vw,60px)] leading-[1.05] tracking-[-0.015em]">Fully managed gifted collaborations.</h2>
            <p className="max-w-[560px] text-sm leading-[1.9] text-black/70">We handle everything — creator scouting, outreach, coaching, editing and scheduling. You approve creators, content, and ship the products.</p>
          </div>

          <div className="grid gap-px border border-black/15 bg-black/10 md:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`${pkg.dark ? "bg-[#0f1012] text-white" : "bg-[#E2E2E0]"} p-10`}>
                <div className={`mb-5 text-[9px] font-semibold uppercase tracking-[0.2em] ${pkg.dark ? "text-white/50" : "text-black/50"}`}>{pkg.tag}</div>
                <div className="font-serif text-3xl">{pkg.name}</div>
                <div className={`mt-1 text-[12px] ${pkg.dark ? "text-white/50" : "text-black/50"}`}>{pkg.collabs}</div>
                <div className="mt-6 font-serif text-[46px] leading-none">{pkg.price}</div>
                <div className={`mt-1 text-[12px] ${pkg.dark ? "text-white/50" : "text-black/50"}`}>{pkg.per}</div>
                <div className={`my-7 h-px ${pkg.dark ? "bg-white/10" : "bg-black/10"}`} />
                <div className={`mb-4 text-[9px] font-semibold uppercase tracking-[0.2em] ${pkg.dark ? "text-white/50" : "text-black/50"}`}>What's included</div>
                {included.map((item) => (
                  <div key={item} className={`flex gap-3 border-b py-2 text-xs ${pkg.dark ? "border-white/15 text-white/70" : "border-black/5 text-black/70"}`}>
                    <span className={`relative mt-0.5 h-[14px] w-[14px] shrink-0 rounded-full border ${pkg.dark ? "border-white/20" : "border-black/20"} after:absolute after:inset-0 after:m-auto after:h-1 after:w-1 after:rounded-full after:bg-[#a3a3a3]`} />
                    {item}
                  </div>
                ))}
                {pkg.extras.map((extra) => (
                  <div key={extra} className="flex gap-3 py-2 text-xs font-semibold text-[#a3a3a3]">
                    <span className={`relative mt-0.5 h-[14px] w-[14px] shrink-0 rounded-full border ${pkg.dark ? "border-white/20" : "border-black/20"} after:absolute after:inset-0 after:m-auto after:h-1 after:w-1 after:rounded-full after:bg-[#a3a3a3]`} />
                    {extra}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="border-x border-b border-black/15 bg-[#E2E2E0] px-10 py-10 max-md:px-6">
            <div className="grid gap-10 md:grid-cols-[220px_1fr_1fr] md:items-start">
              <div className="pt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/35">
                Meta Ads Usage Rights
                <br />
                Optional Add-On
              </div>

              <div>
                <h3 className="font-serif text-[22px] leading-none text-black">Creator charges no fee</h3>
                <p className="mt-4 max-w-[420px] text-[13px] leading-[1.8] text-black/45">
                  We handle the negotiation, agreement and documentation on your behalf — before content goes live.
                </p>
                <div className="mt-10 font-serif text-[30px] leading-none text-black">€100 per collab</div>
              </div>

              <div>
                <h3 className="font-serif text-[22px] leading-none text-black">Creator charges a fee</h3>
                <p className="mt-4 max-w-[420px] text-[13px] leading-[1.8] text-black/45">
                  You pay the creator's usage fee directly. We negotiate the best rate and manage the process end to end.
                </p>
                <div className="mt-10 font-serif text-[30px] leading-none text-black">8% of creator's fee</div>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="bg-[#050505] px-12 py-24 text-white max-md:px-6 max-md:py-16">
          <div className="mb-14 flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.34em] text-white/40 after:h-px after:flex-1 after:bg-white/[0.08] after:content-['']">
            Paid Influencer Marketing
          </div>

          <div className="mb-14 grid items-end gap-16 md:grid-cols-[1.08fr_0.92fr]">
            <h2 className="font-serif text-[clamp(36px,4.5vw,60px)] font-normal leading-[1.06] tracking-[-0.03em] text-white">
              Precision creator matching
              <br />
              for brands entering new
              <br />
              markets.
            </h2>
            <p className="max-w-[620px] text-[15px] leading-[1.9] text-white/70 md:justify-self-end">
              We find the right creators, manage everything from outreach to reporting, and handle all payments. You pay one invoice.
            </p>
          </div>

          <div className="grid gap-px border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
            <div className="bg-[#050505] p-10">
              <div className="mb-8 text-[10px] font-medium uppercase tracking-[0.24em] text-white/38">01</div>
              <div className="font-serif text-[34px] leading-none text-white">Longlist</div>
              <div className="mt-2 text-[12px] text-white/50">Always first — no commitment</div>
              <div className="mt-14 font-serif text-[42px] leading-none text-white">Free</div>
              <div className="mt-2 text-[12px] text-white/50">Included from day one</div>
              <div className="my-10 h-px bg-white/[0.08]" />
              <div className="mb-6 text-[10px] font-medium uppercase tracking-[0.24em] text-white/38">What you get</div>
              {[
                "8–10 creators for your brand & market",
                "Name, handle & follower count",
                "Instagram link for each creator",
                "Our recommendation on each",
              ].map((item) => (
                <div key={item} className="flex gap-3 border-b border-white/[0.06] py-3 text-[13px] text-white/78">
                  <span className="relative mt-0.5 h-[16px] w-[16px] shrink-0 rounded-full border border-white/15 after:absolute after:inset-0 after:m-auto after:h-[5px] after:w-[5px] after:rounded-full after:bg-[#a3a3a3]" />
                  {item}
                </div>
              ))}
              <div className="mt-10 text-[12px] italic text-white/42">This is how every relationship starts.</div>
            </div>

            <div className="bg-[#E2E2E0] p-10 text-black">
              <div className="mb-8 text-[10px] font-medium uppercase tracking-[0.24em] text-black/26">02</div>
              <div className="font-serif text-[34px] leading-none">Campaign setup</div>
              <div className="mt-2 text-[12px] text-black/42">One-time per campaign</div>
              <div className="mt-14 font-serif text-[42px] leading-none">8%</div>
              <div className="mt-2 text-[12px] text-black/42">of budget · minimum €850</div>
              <div className="my-10 h-px bg-black/10" />
              <div className="mb-6 text-[10px] font-medium uppercase tracking-[0.24em] text-black/26">What you get</div>
              {[
                "50–75 creator profiles vetted",
                "Project cards for approved creators",
                "Campaign document if needed",
                "Outreach & rate negotiation",
              ].map((item) => (
                <div key={item} className="flex gap-3 border-b border-black/[0.06] py-3 text-[13px] text-black/72">
                  <span className="relative mt-0.5 h-[16px] w-[16px] shrink-0 rounded-full border border-black/15 after:absolute after:inset-0 after:m-auto after:h-[5px] after:w-[5px] after:rounded-full after:bg-[#a3a3a3]" />
                  {item}
                </div>
              ))}
              <div className="mt-10 text-[12px] italic text-black/40">Charged once you decide to move forward.</div>
            </div>

            <div className="bg-[#050505] p-10">
              <div className="mb-8 text-[10px] font-medium uppercase tracking-[0.24em] text-white/38">03</div>
              <div className="font-serif text-[34px] leading-none text-white">Management</div>
              <div className="mt-2 text-[12px] text-white/50">Ongoing per campaign</div>
              <div className="mt-14 font-serif text-[42px] leading-none text-white">15%</div>
              <div className="mt-2 text-[12px] text-white/50">of creator fees · on top of setup</div>
              <div className="my-10 h-px bg-white/[0.08]" />
              <div className="mb-6 text-[10px] font-medium uppercase tracking-[0.24em] text-white/38">What you get</div>
              {[
                "Creator briefing & coordination",
                "Content & scheduling approvals",
                "Single invoice to brand",
                "We pay all creators directly",
                "Full performance report",
              ].map((item) => (
                <div key={item} className="flex gap-3 border-b border-white/[0.06] py-3 text-[13px] text-white/78">
                  <span className="relative mt-0.5 h-[16px] w-[16px] shrink-0 rounded-full border border-white/15 after:absolute after:inset-0 after:m-auto after:h-[5px] after:w-[5px] after:rounded-full after:bg-[#a3a3a3]" />
                  {item}
                </div>
              ))}
              <div className="mt-10 text-[12px] italic text-white/42">Total Zera fee: approximately 23% of campaign budget.</div>
            </div>
          </div>
        </section>

        <section id="project-cards" className="bg-[#0b0b0d] px-12 py-24 text-white max-md:px-6 max-md:py-16">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-6 text-[10px] uppercase tracking-[0.3em] text-white/40">Project Cards</div>
              <h2 className="font-serif text-[clamp(42px,5vw,64px)] leading-[1.1] tracking-[-0.02em]">
                Every creator comes with
                <br />
                <em className="text-white/40">a full recommendation.</em>
              </h2>
              <p className="mt-6 max-w-[520px] text-sm leading-[1.9] text-white/70">
                Before you approve a single creator, you receive a detailed project card for each one we recommend. Audience data, our professional assessment, content proposals, product selections, and a clear ROI rating — so you make decisions based on insight, not guesswork.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  ["Audience breakdown", "Top countries, cities, and demographics — so you know exactly who will see the content."],
                  ["Our professional assessment", "Why we recommend this creator, what makes their content work, and our honest ROI rating."],
                  ["Content proposals", "The creator’s own ideas for how to feature your products — specific, considered, and aligned."],
                  ["Rate range & product costs", "Clear fee expectations and gifted product values upfront — no surprises."],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#a3a3a3]" />
                    <div>
                      <div className="text-sm font-medium">{title}</div>
                      <div className="mt-1 text-xs text-white/50">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-sm bg-[#E2E2E0] text-black shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <div className="h-[200px] w-full bg-black/10" />
              <div className="relative px-6">
                <div className="absolute -top-12 left-6 h-24 w-24 rounded-full border-2 border-[#E2E2E0] bg-white" />
              </div>

              <div className="flex items-start justify-between border-b border-black/10 px-6 pb-6 pt-14">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-black/40">Creator Profile</div>
                  <div className="mt-1 font-serif text-xl">Sophie Laurent</div>
                  <div className="text-xs text-black/50">@sophielaurent</div>
                </div>
                <div className="text-right">
                  <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-black/40">ROI</div>
                  <div className="bg-black px-3 py-1 text-xs text-white">Medium — High</div>
                </div>
              </div>

              <div className="grid grid-cols-3 border-b border-black/10 text-center">
                {[
                  ["Followers", "240K"],
                  ["Top Market", "France 92%"],
                  ["Rate", "€4,300–4,800"],
                ].map(([label, value]) => (
                  <div key={label} className="border-r border-black/10 p-4 last:border-r-0">
                    <div className="mb-1 text-xs text-black/40">{label}</div>
                    <div className="font-serif text-sm">{value}</div>
                  </div>
                ))}
              </div>

              <div className="border-b border-black/10 p-6 text-xs leading-[1.8] text-black/70">
                DIY content performs very well on her page. She films in natural daylight, maintains high production quality, and creates visually satisfying installation content that keeps viewers engaged.
              </div>

              <div className="border-b border-black/10 p-6">
                <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-black/40">Project 1</div>
                <div className="mb-2 font-serif text-lg">Kitchen Lighting</div>
                <p className="text-xs leading-[1.8] text-black/70">Integrating silver lighting with DIY wall shelving for a coffee corner setup.</p>
                <div className="mt-3 text-[11px] text-black/50">Gifted value: €58</div>
              </div>

              <div className="border-b border-black/10 p-6">
                <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-black/40">Project 2</div>
                <div className="mb-2 font-serif text-lg">Outdoor Patio</div>
                <p className="text-xs leading-[1.8] text-black/70">Renovating an outdoor patio with lighting to create a warm, inviting evening space.</p>
                <div className="mt-3 text-[11px] text-black/50">Gifted value: €212</div>
              </div>

              <div className="border-t border-black/10 p-6 text-center text-xs uppercase tracking-[0.2em] text-black/60">Get your creator cards →</div>
            </div>
          </div>
        </section>

        <section id="quote" className="bg-[#0b0b0d] px-12 py-24 text-white max-md:px-6 max-md:py-16">
          <div className="mb-14 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50 after:h-px after:flex-1 after:bg-white/10 after:content-['']">
            Find Your Starting Point
          </div>
          <h2 className="font-serif text-[clamp(38px,5vw,60px)] leading-[1.05] tracking-[-0.015em]">
            What is your monthly budget
            <br />
            <em className="text-white/50">for influencer marketing?</em>
          </h2>
          <p className="mt-4 max-w-[560px] text-sm leading-[1.9] text-white/75">
            Move the slider and we will show you exactly what we would recommend for your brand right now.
          </p>
          <div className="mt-12">
            <div className="flex justify-between text-xs text-white/50">
              <span>€0</span>
              <span>€15,000+</span>
            </div>
            <div className="my-5 text-center font-serif text-[56px] text-white">{formatBudget(budget)}</div>
            <input
              type="range"
              min="0"
              max="15000"
              value={budget}
              step="100"
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-[1px] [&::-webkit-slider-runnable-track]:bg-white/80 [&::-webkit-slider-runnable-track]:rounded-full [&::-moz-range-track]:h-[1px] [&::-moz-range-track]:bg-white/80 [&::-moz-range-track]:rounded-full [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white"
            />
            <div className="mt-10 border border-white/15 bg-white/[0.02] p-9">
              <div className="mb-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">{recommendation.stage}</div>
              <h3 className="font-serif text-3xl text-white">{recommendation.title}</h3>
              <p className="mt-3 max-w-[620px] text-sm text-white/70">{recommendation.desc}</p>
              <div className="my-8 grid gap-px bg-white/10 md:grid-cols-4">
                {recommendation.services.map((item) => (
                  <div key={item.name} className="bg-[#101114] p-5">
                    <div className="text-[12px] font-semibold text-white">{item.name}</div>
                    <div className="mt-1 text-[12px] text-white/50">{item.detail}</div>
                  </div>
                ))}
              </div>
              <div className="text-[12px] italic text-white/45">{recommendation.note}</div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white px-12 py-24 max-md:px-6 max-md:py-16">
          <div className="mb-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">Contact</div>
          <h2 className="font-serif text-[clamp(38px,5vw,60px)] leading-[1.02] tracking-[-0.02em] text-black">
            Start the conversation.
          </h2>
          <p className="mt-4 max-w-[560px] text-[15px] leading-[1.9] text-black/65">
            Add your real contact details, booking link, or inquiry form here when you are ready to launch.
          </p>
        </section>
      </div>
    </div>
  );
}
