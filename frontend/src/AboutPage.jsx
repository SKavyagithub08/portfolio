import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Socials array (same as LandingSection)
const socials = [
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/s-kavya-6424b3258/", label: "LinkedIn" },
  { icon: <FaGithub />, url: "https://github.com/SKavyagithub08", label: "GitHub" },
  { icon: <FaEnvelope />, url: "mailto:kavyasri2330@gmail.com", label: "Email" },
];

// --- High-speed molecular animated background using HTML canvas (same as LandingSection) ---
function FastMolecularBg() {
  const canvasRef = React.useRef(null);
  const animationRef = React.useRef();
  const mouse = React.useRef({ x: null, y: null });
  const PARTICLE_COUNT = 15;
  const SPEED = 2;
  const SENSITIVITY = 0.32;
  const LINE_DIST = 0;
  const PARTICLE_RADIUS = 1.5;

  const createParticles = React.useCallback((w, h) => {
    return Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
    }));
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    let w = parent ? parent.offsetWidth : window.innerWidth;
    let h = parent ? parent.offsetHeight : window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    let particles = createParticles(w, h);

    function resize() {
      w = parent ? parent.offsetWidth : window.innerWidth;
      h = parent ? parent.offsetHeight : window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      particles = createParticles(w, h);
    }

    window.addEventListener("resize", resize);

    function animate() {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, w, h);

      // Draw lines first (so particles are on top)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(255,255,255," + (1 - dist / LINE_DIST) * 0.7 + ")";
            ctx.lineWidth = 1.2;
            ctx.globalAlpha = 0.7;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Move and draw particles
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        // Mouse ripple effect
        if (mouse.current.x !== null && mouse.current.y !== null) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120 * SENSITIVITY * 18;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Friction to prevent runaway
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));

        // Draw particle (draw after lines for visibility)
        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(185, 182, 182, 0.8)";
        ctx.shadowColor = "rgb(255, 255, 255)";
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    // Attach mouse events to the window (not canvas) so mouse position is tracked even when content overlays the canvas
    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      mouse.current.x = null;
      mouse.current.y = null;
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ background: "#000" }}
      aria-hidden="true"
    />
  );
}

export default function AboutPage() {
  return (
    <AnimatePresence>
      <motion.div
        key="about-page"
        initial={{ opacity: 0, y: 0 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        exit={{
          opacity: 0,
          y: 0,
          transition: { duration: 0.3, ease: "easeIn" }
        }}
        className="min-h-screen w-full bg-[black] flex items-center justify-center relative overflow-hidden px-4 py-12"
      >
        {/* Molecular animation background */}
        <FastMolecularBg />
        {/* Background lines right */}
        <div className="absolute right-0 top-0 h-full w-2/3 pointer-events-none z-0">
          <svg width="100%" height="100%" viewBox="0 0 700 700" fill="none" className="absolute right-0 top-0">
            {[...Array(10)].map((_, i) => (
              <rect
                key={i}
                x={40 + i * 12}
                y={40 + i * 12}
                width={620 - i * 24}
                height={620 - i * 24}
                stroke="#333"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
              />
            ))}
          </svg>
        </div>
        <div className="flex flex-row items-center justify-center w-full max-w-6xl z-10">
          {/* Left: Layered image cards */}
          <div className="relative group flex-shrink-0" style={{ width: 340, height: 380 }}>
            {/* Layered effect */}
            {[4, 3, 2, 1].map((i) => (
              <div
                key={i}
                className={`absolute transition-transform duration-300`}
                style={{
                  left: i * 8,
                  top: i * 8,
                  width: 300,
                  height: 340,
                  border: "1px solid #232323",
                  borderRadius: "8px",
                  zIndex: i,
                  background: "transparent",
                }}
              />
            ))}
            {/* Main card */}
            <div
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl"
              style={{
                width: 300,
                height: 340,
                background: "#D8FF3E",
                zIndex: 10,
              }}
            >
              <img
                src="/kavya2.jpg"
                alt="Profile"
                className="w-full h-full object-cover object-center grayscale"
                draggable={false}
              />
            </div>
            {/* Socials row under the picture */}
            <div className="flex flex-row items-center gap-6 text-gray-200 text-2xl font-sans mt-20 justify-center">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          {/* Center dot */}
          <div className="mx-20 flex flex-col items-center">
            <span className="block w-8 h-8   border-lime-400 flex items-center justify-center">
              {/* <span className="block w-2 h-2 rounded-full bg-lime-400"></span> */}
            </span>
          </div>
          {/* Right: Text */}
          <div className="flex-1 flex flex-col justify-center items-start z-10 mb-25">
            <h1 className="text-3xl md:text-4xl font-light text-white mb-2">
              Hello, I'm <span className="font-semibold">Kavya</span>
            </h1>
            <h2 className="text-4xl md:text-5xl font-light mb-8" style={{ color: "#D8FF3E" }}>
              Full Satck Developer 
            </h2>
            <div className="w-10 border-t border-[#444] mb-2" />
            <p className="text-lg md:text-xl text-gray-400 font-sans max-w-xl leading-relaxed">
              I'm a Full Stack Developer with a passion for crafting intuitive, responsive, and scalable web applications. I love working across the stack—from designing clean, functional UIs to architecting robust backend systems. I’m always curious and constantly experimenting, whether it’s building smart IoT integrations, exploring Flutter + Firebase ecosystems, or diving deeper into DSA to sharpen my problem-solving edge.
              <br />
              <span style={{ display: "inline-block", marginTop: "0.9em" }}>
                I enjoy merging creativity with logic—blending code with thoughtful design to bring bold ideas to life. Outside of development, I’m drawn to innovation, product design, and the challenge of building solutions that actually make a difference.
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
