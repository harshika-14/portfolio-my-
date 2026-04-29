import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SplashCursor from "./SplashCursor";

const imageItems = Array.from({ length: 21 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    src: `/arsenal/img_${id}.jpeg`,
    alt: `Archive Memory ${id}`,
  };
});

export default function Gallery() {
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);
  const visibleImages = imageItems.filter((item) => !hiddenIds.includes(item.id));

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
            <h1 className="text-4xl md:text-5xl font-serif text-[#EDEDED] mb-4 tracking-tight">Visual Archive</h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visibleImages.map((item) => (
              <article
                key={item.id}
                className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-[0_14px_40px_rgba(0,0,0,0.5)]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  onError={() =>
                    setHiddenIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]))
                  }
                  className="h-full w-full object-cover grayscale-[25%] opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
              </article>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
