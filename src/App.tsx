import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ArrowUpRight,
  Code2,
  Figma,
  Terminal,
  Database,
  Layout,
  Cpu,
  Layers,
  X,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  LayoutGrid,
  Trash2,
  Eraser
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import SplashCursor from "./SplashCursor";
import HeroBackground from "./HeroBackground";

const PROJECTS = [
  {
    id: "smart-rover",
    title: "Smart Agriculture Rover",
    category: "IoT Prototype & Web Interface",
    tags: ["React", "IoT", "UI/UX"],
    label: "Prototype Built",
    shortDesc: "A responsive dashboard and working prototype for an IoT-based agriculture rover system.",
    problem: "Traditional farming methods lack real-time data monitoring, leading to inefficient resource management and delayed responses to crop health issues.",
    solution: "Developed an IoT-enabled rover that autonomously captures soil and environmental data, paired with a responsive web dashboard for farmers to monitor metrics and control the rover in real-time.",
    techStack: ["React", "Node.js", "IoT Sensors", "Tailwind CSS", "Figma"],
    link: "https://github.com/harshika-14/Smart_Gardening/tree/main",
    linkLabel: "GitHub Repo",
    image: "/agrirover.png"
  },
  {
    id: "t-logistics",
    title: "T Logistics Platform",
    category: "Web Application UI",
    tags: ["React", "Dashboard", "Data Viz"],
    label: "UI/UX",
    shortDesc: "A comprehensive logistics platform interface to manage shipments, tracking, and daily operations.",
    problem: "Logistics managers struggled with scattered shipment data, making it difficult to track deliveries and make quick operational decisions.",
    solution: "Designed a centralized, high-contrast dark mode dashboard featuring clear data visualization, seamless shipment tracking, and streamlined workflows to reduce cognitive load.",
    techStack: ["React", "Tailwind CSS", "Recharts", "UX Research"],
    link: "https://github.com/harshika-14/t.logistics",
    linkLabel: "GitHub Repo",
    image: "/t logistic.png"
  }
];

const EXPERIENCE = [
  {
    role: "Graphic Design Intern",
    company: "Inamigos Foundation",
    duration: "2023 - Present",
    desc: "Designed creative graphics and visual assets aligned with brand identity. Collaborated closely with the marketing team to deliver engaging social media creatives and campaigns."
  },
  {
    role: "Technical Lead",
    company: "Hackblitz",
    duration: "2024",
    desc: "Spearheaded technical execution for the hackathon platform. Managed overall branding, UI designs, and organized large-scale college events with 500+ attendees."
  }
];

const LEADERSHIP_ACTIVITIES = [
  {
    title: "Technical Lead",
    org: "Hackblitz",
    duration: "2024",
    desc: "Led technical planning, coordinated team execution, and managed delivery for a college-scale hackathon experience.",
  },
  {
    title: "Event & Design Coordinator",
    org: "Campus Communities",
    duration: "2023 - Present",
    desc: "Owned visual communication and activity workflows for student initiatives, from concept to on-ground execution.",
  },
  {
    title: "Community Contributor",
    org: "Design + Dev Programs",
    duration: "Ongoing",
    desc: "Actively contribute to peer learning sessions, mentorship circles, and collaborative build activities.",
  },
];

const TECH_STACK = [
  { name: "React", icon: Code2 },
  { name: "TypeScript", icon: FileType },
  { name: "JavaScript", icon: FileType },
  { name: "Node.js", icon: Terminal },
  { name: "Python", icon: Terminal },
  { name: "Tailwind CSS", icon: Layout },
  { name: "Figma", icon: Figma },
  { name: "SQL", icon: Database },
  { name: "C++", icon: Cpu },
  { name: "IoT Integration", icon: Cpu },
  { name: "Git", icon: Github },
];

function FileType(props: any) {
  return <Code2 {...props} />;
}

type CellValue = 'white' | 'blue' | 'green' | 'rainbow' | null;

const COLOR_MAP = {
  'white': { tailwind: 'bg-white/90', css: '#EDEDED' },
  'blue': { tailwind: 'bg-blue-500', css: '#3b82f6' },
  'green': { tailwind: 'bg-emerald-500', css: '#10b981' },
  'rainbow': { tailwind: 'bg-gradient-to-tr from-pink-500 via-yellow-500 to-cyan-500', css: 'linear-gradient(to top right, #ec4899, #eab308, #06b6d4)' }
};

const InteractiveGrid = () => {
  const ROWS = 8;
  const COLS = 12;
  const [grid, setGrid] = useState<CellValue[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushMode, setBrushMode] = useState<CellValue>('white');
  const [codeMode, setCodeMode] = useState<'css' | 'tailwind'>('tailwind');
  const [copied, setCopied] = useState(false);

  const handleMouseDown = (r: number, c: number) => {
    setIsDrawing(true);
    const newValue = grid[r][c] === brushMode && brushMode !== null ? null : brushMode;
    updateCell(r, c, newValue);
  };

  const handleMouseEnter = (r: number, c: number) => {
    if (isDrawing) {
      updateCell(r, c, brushMode);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const updateCell = (r: number, c: number, value: CellValue) => {
    setGrid(prev => {
      const newGrid = [...prev];
      newGrid[r] = [...newGrid[r]];
      newGrid[r][c] = value;
      return newGrid;
    });
  };

  const clearGrid = () => {
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  };

  let minR = ROWS, maxR = -1, minC = COLS, maxC = -1;
  let activeCount = 0;

  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell !== null) {
        minR = Math.min(minR, r);
        maxR = Math.max(maxR, r);
        minC = Math.min(minC, c);
        maxC = Math.max(maxC, c);
        activeCount++;
      }
    });
  });

  const hasActive = activeCount > 0;
  const gridRows = hasActive ? maxR - minR + 1 : 0;
  const gridCols = hasActive ? maxC - minC + 1 : 0;
  const isPerfectRect = hasActive && activeCount === gridRows * gridCols;
  const isHorizontalLine = hasActive && gridRows === 1 && gridCols > 2;
  const isVerticalLine = hasActive && gridCols === 1 && gridRows > 2;

  let patternDetected = "Custom Grid";
  if (!hasActive) patternDetected = "Draw to generate";
  else if (isHorizontalLine) patternDetected = "Navbar Layout";
  else if (isVerticalLine) patternDetected = "Sidebar Layout";
  else if (isPerfectRect) patternDetected = "Card Layout";

  const activeItems: { row: number, col: number, color: CellValue }[] = [];
  if (hasActive) {
    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) {
        if (grid[r][c] !== null) {
          activeItems.push({
            row: r - minR + 1,
            col: c - minC + 1,
            color: grid[r][c]
          });
        }
      }
    }
  }

  let generatedCode = "";
  if (!hasActive) {
    generatedCode = "/* Select cells to generate code */";
  } else if (codeMode === 'tailwind') {
    generatedCode = `<div className="grid grid-cols-${gridCols} grid-rows-${gridRows} gap-4">\n`;
    activeItems.forEach((item) => {
      const colorClass = item.color ? COLOR_MAP[item.color].tailwind : 'bg-white/10';
      generatedCode += `  <div className="col-start-${item.col} row-start-${item.row} ${colorClass} rounded-md"></div>\n`;
    });
    generatedCode += `</div>`;
  } else {
    generatedCode = `<div class="grid-container">\n`;
    activeItems.forEach((item, i) => {
      generatedCode += `  <div class="item-${i + 1}"></div>\n`;
    });
    generatedCode += `</div>\n\n`;
    generatedCode += `/* CSS */\n`;
    generatedCode += `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${gridCols}, 1fr);\n  grid-template-rows: repeat(${gridRows}, 1fr);\n  gap: 1rem;\n}\n`;
    activeItems.forEach((item, i) => {
      const colorCss = item.color ? COLOR_MAP[item.color].css : '#ffffff1a';
      generatedCode += `.item-${i + 1} {\n  grid-column: ${item.col};\n  grid-row: ${item.row};\n  background: ${colorCss};\n}\n`;
    });
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full my-6">
      <div className="flex-1 bg-[#111] border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col min-h-[350px]">
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>

        <div className="flex justify-between items-start mb-6 z-10">
          <div>
            <h3 className="text-sm font-medium text-[#EDEDED] flex items-center gap-2">
              <LayoutGrid size={16} className="text-[#A1A1AA]" />
              Canvas
            </h3>
            <p className="text-xs text-[#71717A] mt-1">{patternDetected}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-full border border-white/10">
              <button
                onClick={() => setBrushMode('white')}
                className={`p-1.5 rounded-full transition-all ${brushMode === 'white' ? 'bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'hover:bg-white/10'}`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-white/90"></div>
              </button>
              <button
                onClick={() => setBrushMode('blue')}
                className={`p-1.5 rounded-full transition-all ${brushMode === 'blue' ? 'bg-white/20 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'hover:bg-white/10'}`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500"></div>
              </button>
              <button
                onClick={() => setBrushMode('green')}
                className={`p-1.5 rounded-full transition-all ${brushMode === 'green' ? 'bg-white/20 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'hover:bg-white/10'}`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
              </button>
              <button
                onClick={() => setBrushMode('rainbow')}
                className={`p-1.5 rounded-full transition-all ${brushMode === 'rainbow' ? 'bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'hover:bg-white/10'}`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-pink-500 via-yellow-500 to-cyan-500"></div>
              </button>
              <div className="w-px h-3 bg-white/20 mx-0.5"></div>
              <button
                onClick={() => setBrushMode(null)}
                className={`p-1.5 rounded-full transition-all text-[#A1A1AA] ${brushMode === null ? 'bg-white/20 text-[#EDEDED] shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'hover:bg-white/10 hover:text-[#EDEDED]'}`}
                title="Eraser"
              >
                <Eraser size={14} />
              </button>
            </div>

            <button
              onClick={clearGrid}
              className="text-[11px] font-medium text-[#A1A1AA] hover:text-red-400 transition-colors bg-white/5 hover:bg-red-500/10 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5"
            >
              <Trash2 size={12} /> Clear
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center z-10 w-full overflow-x-auto scrollbar-hide py-4">
          <div
            className="inline-grid gap-[3px] sm:gap-[4px] touch-none select-none cursor-crosshair p-3 sm:p-4 bg-[#0A0A0A] rounded-2xl border border-white/5 shadow-inner"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            onTouchCancel={handleMouseUp}
          >
            {grid.map((row, r) =>
              row.map((cellValue, c) => {
                const isActive = cellValue !== null;
                const colorClass = isActive ? COLOR_MAP[cellValue].tailwind : 'bg-white/5 hover:bg-white/10';
                const shadowClass = isActive ? (cellValue === 'blue' ? 'shadow-[0_0_12px_rgba(59,130,246,0.5)]' : cellValue === 'green' ? 'shadow-[0_0_12px_rgba(16,185,129,0.5)]' : cellValue === 'rainbow' ? 'shadow-[0_0_12px_rgba(236,72,153,0.5)]' : 'shadow-[0_0_12px_rgba(255,255,255,0.5)]') : '';

                return (
                  <div
                    key={`${r}-${c}`}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                    onTouchStart={() => handleMouseDown(r, c)}
                    className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-sm transition-all duration-200 ease-out hover:scale-110 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] ${colorClass} ${isActive ? `scale-110 z-10 ${shadowClass}` : ''}`}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 flex justify-center z-10">
          <span className="text-[10px] uppercase tracking-wider font-medium text-[#71717A] bg-white/5 px-3 py-1 rounded-full border border-white/5">
            {hasActive ? `${gridCols} \u00D7 ${gridRows} Layout` : "8 \u00D7 12 Grid"}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 z-10 min-w-0">

        <div className="flex-1 bg-[#0D0D0D] border border-white/10 rounded-3xl overflow-hidden flex flex-col relative group shadow-2xl min-h-[250px]">
          <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex gap-2">
              <button
                onClick={() => setCodeMode('tailwind')}
                className={`text-[11px] px-3 py-1.5 rounded-md transition-all font-medium ${codeMode === 'tailwind' ? 'bg-white/10 text-[#EDEDED] shadow-sm' : 'text-[#71717A] hover:text-[#EDEDED] hover:bg-white/5'}`}
              >
                Tailwind
              </button>
              <button
                onClick={() => setCodeMode('css')}
                className={`text-[11px] px-3 py-1.5 rounded-md transition-all font-medium ${codeMode === 'css' ? 'bg-white/10 text-[#EDEDED] shadow-sm' : 'text-[#71717A] hover:text-[#EDEDED] hover:bg-white/5'}`}
              >
                HTML + CSS
              </button>
            </div>
            <button
              onClick={handleCopy}
              className="text-[#A1A1AA] hover:text-[#EDEDED] transition-colors p-1.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/5"
              title="Copy Code"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>
          </div>
          <div className="p-4 overflow-auto text-[12px] font-mono leading-relaxed text-[#A1A1AA] flex-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <pre className="whitespace-pre-wrap">
              {generatedCode.split('\n').map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell text-right pr-4 text-white/20 select-none">{i + 1}</span>
                  <span className="table-cell text-emerald-300 break-all">{line}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-6 shadow-lg min-h-[140px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-4 left-4 text-[10px] text-[#71717A] uppercase tracking-widest font-medium flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Live Output
          </div>

          <div className="mt-4 flex justify-center items-center w-full h-full">
            {hasActive ? (
              <div
                className="grid gap-2 w-full max-w-[200px]"
                style={{
                  gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`
                }}
              >
                {activeItems.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    key={i}
                    className={`rounded border border-white/10 w-full min-h-[20px] backdrop-blur-sm ${item.color ? COLOR_MAP[item.color].tailwind : 'bg-white/20'}`}
                    style={{
                      gridColumnStart: item.col,
                      gridRowStart: item.row
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#555] italic">Select cells to see preview</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<any>(null);

  useEffect(() => {
    if (activeCaseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeCaseStudy]);

  return (
    <div className="min-h-screen relative font-sans text-base leading-relaxed selection:bg-white/20 selection:text-white">
      <SplashCursor />
      <HeroBackground />
      <div className="noise-overlay"></div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 md:py-24 relative z-10">

        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-16 md:mb-32 sticky top-3 sm:top-6 z-40 bg-[#0A0A0A]/80 backdrop-blur-md py-3 sm:py-4 px-4 sm:px-6 rounded-2xl border border-white/5 shadow-lg"
        >
          <span className="font-serif italic text-2xl text-[#EDEDED] font-medium tracking-tight">H.</span>
          <nav className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4 sm:gap-8 text-[11px] sm:text-[13px] font-medium text-[#A1A1AA] tracking-wide uppercase">
            <a href="#about" className="hover:text-[#EDEDED] transition-colors">About</a>
            <a href="#work" className="hover:text-[#EDEDED] transition-colors">Work</a>
            <Link to="/service" className="hover:text-[#EDEDED] transition-colors">Services</Link>
            <a href="#contact" className="hover:text-[#EDEDED] transition-colors">Contact</a>
          </nav>
        </motion.header>

        <section className="mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"]
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-28 h-28 overflow-hidden mb-8 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] bg-[#0A0A0A]"
          >
            <img
              src="/harshika.jpeg"
              alt="Harshika Bighane"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
              }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#EDEDED] mb-6 leading-[1.1] tracking-tight font-medium"
          >
            Harshika Bighane <br />
            <span className="text-[#71717A] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-light block mt-3">
              Frontend Engineer <span className="italic font-serif text-[#555]">&</span> UI Designer
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10"
          >
            <a href="#work" className="w-full sm:w-auto text-center px-6 py-3 bg-[#EDEDED] text-[#0A0A0A] font-medium text-sm rounded-full hover:scale-105 hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              View Work
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center px-6 py-3 bg-white/5 border border-white/10 text-[#EDEDED] font-medium text-sm rounded-full hover:bg-white/10 transition-all">
              Resume
            </a>
            <a href="#contact" className="w-full sm:w-auto text-center px-6 py-3 text-[#A1A1AA] hover:text-[#EDEDED] font-medium text-sm rounded-full transition-all">
              Contact
            </a>
          </motion.div>
        </section>

        <div className="w-full h-px dashed-line my-20 opacity-30"></div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          id="about"
          className="mb-24"
        >
          <div className="text-[#A1A1AA] space-y-6 max-w-2xl text-[16px] leading-relaxed font-light">
            <p>
              Hi, I'm Harshika. I'm an engineer who cares deeply about <span className="text-[#EDEDED] font-medium">user experience, interaction design, and scalable frontend architectures.</span>
            </p>
            <p>
              People call me a developer, I just call it being obsessed with the craft. From the first wireframe to the final deployment, I focus on building <span className="text-[#EDEDED] font-medium">intuitive, robust, and performant web applications</span> that solve complex real-world problems.
            </p>
            <p>
              Currently, I'm shipping scalable solutions and exploring the intersections of <span className="text-[#EDEDED] font-medium">Agentic AI, UI/UX, and IoT</span>.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 bg-[#111] border border-white/5 p-6 md:p-8 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#EDEDED] to-transparent opacity-50"></div>
          <h2 className="text-[13px] font-medium text-[#71717A] uppercase tracking-widest mb-6">Currently Building</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#EDEDED] animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
              <div>
                <p className="text-[15px] font-medium text-[#EDEDED]">AI-based UI Analyzer</p>
                <p className="text-sm text-[#A1A1AA] mt-1">An agentic tool to audit and improve UI patterns.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#71717A]"></div>
              <div>
                <p className="text-[15px] font-medium text-[#EDEDED]">IoT + Web Integration</p>
                <p className="text-sm text-[#A1A1AA] mt-1">Bridging hardware sensors with seamless web dashboards.</p>
              </div>
            </li>
          </ul>
        </motion.section>





        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <h2 className="text-[13px] font-medium text-[#71717A] uppercase tracking-widest mb-10">Professional Experience</h2>

          <div className="relative border-l border-white/10 ml-2 space-y-12 pb-4">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="relative pl-8 group">
                <div className="absolute w-3 h-3 bg-[#0A0A0A] border-2 border-[#555] rounded-full -left-[6.5px] top-1.5 group-hover:border-[#EDEDED] group-hover:scale-125 transition-all"></div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
                  <h3 className="text-[16px] font-medium text-[#EDEDED]">
                    {exp.role} <span className="text-[#555] mx-2 font-light">at</span> <span className="text-[#A1A1AA]">{exp.company}</span>
                  </h3>
                  <span className="text-xs text-[#71717A] mt-1 sm:mt-0 font-mono bg-white/5 px-2 py-1 rounded-md">{exp.duration}</span>
                </div>
                <p className="text-[15px] text-[#A1A1AA] leading-relaxed font-light">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <h2 className="text-[13px] font-medium text-[#71717A] uppercase tracking-widest mb-10">Leadership & Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEADERSHIP_ACTIVITIES.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-[16px] font-medium text-[#EDEDED]">{item.title}</h3>
                  <span className="text-[11px] text-[#71717A] bg-white/5 border border-white/10 rounded-full px-3 py-1 whitespace-nowrap">
                    {item.duration}
                  </span>
                </div>
                <p className="text-sm text-[#A1A1AA] mb-3">{item.org}</p>
                <p className="text-[14px] text-[#A1A1AA] leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          id="work"
          className="mb-32"
        >
          <h2 className="text-[13px] font-medium text-[#71717A] uppercase tracking-widest mb-10">Selected Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                onClick={() => setActiveCaseStudy(project)}
                className="group cursor-pointer bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)] transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-[4/3] bg-[#0A0A0A] relative overflow-hidden border-b border-white/5 p-6 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 to-transparent group-hover:opacity-40 transition-opacity"></div>

                  <div className="relative z-10 flex justify-between items-start">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-medium text-[#EDEDED] uppercase tracking-widest border border-white/10">
                      {project.label}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight size={16} className="text-[#EDEDED]" />
                    </div>
                  </div>

                  <div className="relative z-10 w-full h-32 bg-[#161616] rounded-t-xl border-t border-x border-white/10 shadow-2xl p-4 translate-y-6 group-hover:translate-y-2 transition-transform duration-500 flex flex-col gap-3">
                    <div className="w-1/3 h-2 bg-white/10 rounded-full"></div>
                    <div className="flex gap-2">
                      <div className="w-1/2 h-16 bg-white/5 rounded-md border border-white/5"></div>
                      <div className="w-1/2 h-16 bg-white/5 rounded-md border border-white/5"></div>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-[18px] font-medium text-[#EDEDED] mb-2">{project.title}</h3>
                  <p className="text-[14px] text-[#A1A1AA] leading-relaxed mb-6 font-light flex-1">{project.shortDesc}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[11px] text-[#71717A] bg-[#0A0A0A] border border-white/5 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <h2 className="text-[13px] font-medium text-[#71717A] uppercase tracking-widest mb-10">Technical Arsenal</h2>
          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#111] border border-white/5 rounded-xl text-[14px] text-[#A1A1AA] hover:text-[#EDEDED] hover:bg-[#161616] hover:border-white/20 transition-colors shadow-sm cursor-default"
              >
                <tech.icon size={16} className="text-[#71717A] group-hover:text-[#EDEDED]" />
                {tech.name}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="w-full h-px dashed-line my-20 opacity-30"></div>


        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
            <h2 className="text-[13px] font-medium text-[#71717A] uppercase tracking-widest">Interactive Playground</h2>
            <span className="text-sm font-serif italic text-[#A1A1AA]">Try drawing something</span>
          </div>
          <InteractiveGrid />
        </motion.section>



        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          id="contact"
          className="mb-24 pt-20 border-t border-white/10"
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-[#EDEDED] mb-6 tracking-tight">Let's build something impactful.</h2>
            <p className="text-[#A1A1AA] max-w-md mx-auto font-light text-[15px]">
              Currently open for new opportunities. Drop a message below and I'll get back to you as soon as possible.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-[#111] p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#555] to-transparent opacity-20"></div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[12px] font-medium text-[#71717A] tracking-widest uppercase ml-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-3.5 text-[15px] text-[#EDEDED] placeholder-[#555] focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[12px] font-medium text-[#71717A] tracking-widest uppercase ml-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email@gmail.com"
                    className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-3.5 text-[15px] text-[#EDEDED] placeholder-[#555] focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-[12px] font-medium text-[#71717A] tracking-widest uppercase ml-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-3.5 text-[15px] text-[#EDEDED] placeholder-[#555] focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#EDEDED] text-[#0A0A0A] font-medium text-[15px] rounded-xl py-3.5 hover:scale-[1.02] hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] mt-4"
              >
                Send Message <ArrowUpRight size={18} />
              </button>
            </form>
          </div>
        </motion.section>

        <footer className="pb-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[13px] text-[#71717A]">
          <p>© {new Date().getFullYear()} Harshika Bighane.</p>
          <div className="flex gap-6">
            <a href="https://github.com/harshika-14" target="_blank" rel="noopener noreferrer" className="hover:text-[#EDEDED] transition-colors flex items-center gap-1.5">
              <Github size={14} /> GitHub
            </a>
            <a href="https://linkedin.com/in/harshika-bighane" target="_blank" rel="noopener noreferrer" className="hover:text-[#EDEDED] transition-colors flex items-center gap-1.5">
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>
        </footer>

      </div>

      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-[#0A0A0A]/90 backdrop-blur-md"
            onClick={() => setActiveCaseStudy(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-3xl max-h-[92vh] bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5">
                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-medium text-[#A1A1AA] uppercase tracking-widest border border-white/5">
                  Case Study
                </span>
                <button
                  onClick={() => setActiveCaseStudy(null)}
                  className="p-2 text-[#71717A] hover:text-[#EDEDED] hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto p-4 sm:p-6 md:p-10 scrollbar-hide flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#EDEDED] mb-4">{activeCaseStudy.title}</h2>
                <p className="text-[#A1A1AA] text-base sm:text-lg font-light mb-8 sm:mb-10">{activeCaseStudy.shortDesc}</p>

                <div className="aspect-video w-full bg-[#1A1A1A] rounded-xl border border-white/5 mb-12 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#555] to-transparent"></div>

                  {activeCaseStudy.image ? (
                    <img
                      src={activeCaseStudy.image}
                      alt={activeCaseStudy.title}
                      className="w-full h-full object-cover relative z-10"
                    />
                  ) : (
                    <div className="w-3/4 h-3/4 bg-[#111] rounded-lg border border-white/10 shadow-2xl flex flex-col relative z-10">
                      <div className="h-6 border-b border-white/10 flex items-center px-3 gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#333]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#333]"></div>
                      </div>
                      <div className="flex-1 p-4 flex gap-4">
                        <div className="w-1/4 h-full bg-white/5 rounded-md"></div>
                        <div className="w-3/4 flex flex-col gap-4">
                          <div className="h-1/3 bg-white/5 rounded-md"></div>
                          <div className="h-2/3 flex gap-4">
                            <div className="w-1/2 h-full bg-white/5 rounded-md"></div>
                            <div className="w-1/2 h-full bg-white/5 rounded-md"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-10 sm:mb-12">
                  <div>
                    <h3 className="text-sm font-medium text-[#EDEDED] uppercase tracking-widest mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div> Problem
                    </h3>
                    <p className="text-[#A1A1AA] font-light leading-relaxed text-[15px]">{activeCaseStudy.problem}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#EDEDED] uppercase tracking-widest mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div> Solution
                    </h3>
                    <p className="text-[#A1A1AA] font-light leading-relaxed text-[15px]">{activeCaseStudy.solution}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-[#EDEDED] uppercase tracking-widest mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeCaseStudy.techStack.map((tech: string) => (
                      <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[13px] text-[#A1A1AA]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-white/5 flex justify-end">
                <a
                  href={activeCaseStudy.link}
                  target={activeCaseStudy.link !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto justify-center px-6 py-2.5 bg-[#EDEDED] text-[#0A0A0A] font-medium text-sm rounded-full hover:scale-105 transition-transform flex items-center gap-2"
                >
                  {activeCaseStudy.linkLabel || "Live Preview"} <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
