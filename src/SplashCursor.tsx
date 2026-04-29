import { useEffect, useRef } from 'react';

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let particles: { x: number; y: number; r: number; a: number; color: string; vx: number; vy: number; decay: number }[] = [];
    let lastMoveTime = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const colors = ['16, 185, 129', '59, 130, 246', '236, 72, 153', '139, 92, 246'];

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveTime < 16) return;
      lastMoveTime = now;

      const x = e.clientX;
      const y = e.clientY;
      
      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const numParticles = Math.min(Math.floor(distance / 8) + 1, 4);
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 3,
          y: y + (Math.random() - 0.5) * 3,
          r: Math.random() * 12 + 8,
          a: 0.12,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: dx * 0.008 + (Math.random() - 0.5) * 0.15,
          vy: dy * 0.008 + (Math.random() - 0.5) * 0.15,
          decay: Math.random() * 0.006 + 0.008
        });
      }
      if (particles.length > 120) particles = particles.slice(-120);

      lastX = x;
      lastY = y;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        gradient.addColorStop(0, `rgba(${p.color}, ${p.a})`);
        gradient.addColorStop(1, `rgba(${p.color}, 0)`);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        p.x += p.vx;
        p.y += p.vy;
        p.a -= p.decay;
        p.r += 0.2;
      }
      particles = particles.filter(p => p.a > 0);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-20" 
    />
  );
}
