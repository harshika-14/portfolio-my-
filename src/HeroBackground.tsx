import { motion } from "motion/react";

export default function HeroBackground() {
  const images = Array.from({ length: 18 }, (_, i) => `/arsenal/img_${i + 1}.jpeg`);

  const col1 = [...images.slice(0, 5)];
  const col2 = [...images.slice(5, 9)];
  const col3 = [...images.slice(9, 14)];
  const col4 = [...images.slice(14, 18)];

  return (
    <div className="absolute top-0 left-0 w-full h-[120vh] overflow-hidden -z-10 pointer-events-none select-none">
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_60%)]"></div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]"></div>
      <div className="absolute inset-0 flex justify-center gap-4 md:gap-6 opacity-[0.16] blur-[2px] transform scale-[1.08] -rotate-3 md:rotate-[-3deg]">
        <Column images={col1} speed={52} reverse={false} offset={-50} />
        <Column images={col2} speed={60} reverse={true} offset={0} />
        <Column images={col3} speed={56} reverse={false} offset={-120} />
        <Column images={col4} speed={68} reverse={true} offset={-90} className="hidden md:flex" />
      </div>
    </div>
  );
}

function Column({ images, speed, reverse, offset, className = "" }: { images: string[], speed: number, reverse: boolean, offset: number, className?: string }) {
  const duplicatedImages = [...images, ...images];

  return (
    <div 
      className={`flex flex-col gap-4 md:gap-6 w-32 md:w-56 ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      <motion.div 
        animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="flex flex-col gap-4 md:gap-6"
      >
        {duplicatedImages.map((src, i) => (
          <div key={i} className="w-full h-40 md:h-64 flex-shrink-0 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.02)] border border-white/5 bg-[#161616]">
            <img src={src} alt="bg-tile" className="w-full h-full object-cover grayscale opacity-60" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
