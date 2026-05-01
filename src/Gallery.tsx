import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SplashCursor from "./SplashCursor";

export default function Service() {
  return (
    <div className="min-h-screen relative font-sans text-base leading-relaxed selection:bg-white/20 selection:text-white bg-[#0A0A0A]">
      <SplashCursor />
      <div className="noise-overlay"></div>

      <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-24 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#EDEDED] transition-colors mb-16 text-sm font-medium tracking-wide uppercase">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-[#EDEDED] mb-4 tracking-tight">Services</h1>
            <p className="max-w-3xl text-[#A1A1AA] text-base leading-8">Professional Web Designing and Graphic Designing services to help you build a strong digital presence and a memorable brand identity.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-[#121212] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <span className="text-sm uppercase tracking-[0.3em] text-[#71717A]">Web Designing</span>
              <h2 className="mt-4 text-3xl font-serif text-[#EDEDED]">Web Designing</h2>
              <p className="mt-4 text-[#A1A1AA] leading-7">Crafting responsive, modern websites with clean layouts, strong UX, and visual polish for desktop and mobile users.</p>
              <ul className="mt-6 space-y-3 text-[#D6D6D8] list-disc list-inside">
                <li>Responsive website design</li>
                <li>Portfolio and business pages</li>
                <li>Brand-focused digital experiences</li>
              </ul>
            </article>

            <article className="rounded-3xl border border-white/10 bg-[#121212] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <span className="text-sm uppercase tracking-[0.3em] text-[#71717A]">Graphic Designing</span>
              <h2 className="mt-4 text-3xl font-serif text-[#EDEDED]">Graphic Designing</h2>
              <p className="mt-4 text-[#A1A1AA] leading-7">Creating visual content for branding, social media, and print that makes your message clear and memorable.</p>
              <ul className="mt-6 space-y-3 text-[#D6D6D8] list-disc list-inside">
                <li>Logo and brand identity</li>
                <li>Social media creatives</li>
                <li>Posters, flyers, and digital graphics</li>
              </ul>
            </article>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
