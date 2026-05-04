import { motion } from "motion/react";
import { ArrowLeft, Layout, PenTool, Cpu, Code2, Search, Zap, Layers, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import SplashCursor from "./SplashCursor";

const SERVICES = [
  {
    id: "web-design",
    icon: Layout,
    category: "Digital Design",
    title: "Web Designing",
    desc: "Crafting responsive, modern websites with clean layouts, strong UX, and visual polish for desktop and mobile users.",
    features: ["Responsive website design", "Portfolio and business pages", "Brand-focused digital experiences"]
  },
  {
    id: "graphic-design",
    icon: PenTool,
    category: "Visual Identity",
    title: "Graphic Designing",
    desc: "Creating visual content for branding, social media, and print that makes your message clear and memorable.",
    features: ["Logo and brand identity", "Social media creatives", "Posters, flyers, and digital graphics"]
  },
  {
    id: "ui-ux",
    icon: Layers,
    category: "Product Design",
    title: "UI/UX Strategy",
    desc: "Designing intuitive user flows and interactive prototypes that bridge the gap between user needs and business goals.",
    features: ["User Research & Personas", "Wireframing & Prototyping", "Interaction Design"]
  },
  {
    id: "iot-integration",
    icon: Cpu,
    category: "Advanced Tech",
    title: "IoT Dashboards",
    desc: "Developing seamless web interfaces for hardware systems, transforming raw sensor data into actionable insights.",
    features: ["Real-time Data Visualization", "Hardware-to-Web Bridging", "Custom Control Panels"]
  }
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "Understanding goals, audience, and technical constraints.", icon: Search },
  { step: "02", title: "Strategy", desc: "Defining the user journey and information architecture.", icon: Zap },
  { step: "03", title: "Execution", desc: "Crafting high-fidelity designs and robust code.", icon: Code2 },
  { step: "04", title: "Refinement", desc: "Iterating based on feedback and performance testing.", icon: MessageSquare },
];

export default function Service() {
  return (
    <div className="min-h-screen relative font-sans text-base leading-relaxed selection:bg-white/20 selection:text-white bg-[#0A0A0A]">
      <SplashCursor />
      <div className="noise-overlay"></div>

      <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-24 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#EDEDED] transition-colors mb-16 text-sm font-medium tracking-wide uppercase group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-[#EDEDED] mb-6 tracking-tight leading-tight">
            Design <span className="italic text-[#555]">&</span> Engineering <br /> Services
          </h1>
          <p className="max-w-2xl text-[#A1A1AA] text-lg font-light leading-relaxed">
            I help startups and businesses build premium digital experiences through a blend of aesthetic precision and technical excellence.
          </p>
        </motion.header>

        <section className="mb-32">
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((service, i) => (
              <motion.article 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-white/5 bg-[#111] p-8 md:p-10 hover:border-white/20 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <service.icon size={120} />
                </div>
                
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#71717A] font-bold mb-4 block">
                  {service.category}
                </span>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EDEDED]">
                    <service.icon size={20} />
                  </div>
                  <h2 className="text-2xl font-serif text-[#EDEDED]">{service.title}</h2>
                </div>

                <p className="text-[#A1A1AA] leading-relaxed mb-8 font-light">
                  {service.desc}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-[#D6D6D8] font-light">
                      <div className="w-1 h-1 rounded-full bg-[#555]"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mb-32 pt-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="md:w-1/3">
              <h2 className="text-[13px] font-medium text-[#71717A] uppercase tracking-widest mb-6">The Workflow</h2>
              <h3 className="text-3xl font-serif text-[#EDEDED] leading-snug">How I bring ideas <br /> to life.</h3>
              <p className="mt-6 text-[#A1A1AA] font-light text-sm leading-relaxed">
                A structured process ensures every project is delivered with high quality and hits the intended goals.
              </p>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {PROCESS.map((p, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#555]">{p.step}</span>
                    <div className="h-px flex-1 bg-white/5"></div>
                    <p.icon size={16} className="text-[#71717A]" />
                  </div>
                  <h4 className="text-[16px] font-medium text-[#EDEDED]">{p.title}</h4>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed font-light">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="text-center py-20 bg-gradient-to-b from-[#111] to-transparent rounded-[3rem] border border-white/5 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#EDEDED] mb-8 relative z-10">Have a project in mind?</h2>
          <Link 
            to="/#contact" 
            className="inline-block px-10 py-4 bg-[#EDEDED] text-[#0A0A0A] font-medium text-sm rounded-full hover:scale-105 transition-all relative z-10"
          >
            Get in Touch
          </Link>
        </section>
      </div>
    </div>
  );
}

