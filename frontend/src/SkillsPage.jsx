import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Use the same socials as AboutPage
const socials = [
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/s-kavya-6424b3258/", label: "LinkedIn" },
  { icon: <FaGithub />, url: "https://github.com/SKavyagithub08", label: "GitHub" },
  { icon: <FaEnvelope />, url: "mailto:kavyasri2330@gmail.com", label: "Email" },
];

// --- Animated molecular background using SVG ---
// Add mouse parallax effect
function MolecularBg() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    function handleMouseMove(e) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setOffset({ x, y });
    }
    const node = containerRef.current;
    if (node) {
      node.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (node) node.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Parallax strength
  const strength = 30;
  const tx = offset.x * strength;
  const ty = offset.y * strength;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      style={{ minHeight: "100%", minWidth: "100%" }}
    >
      <svg
        width="100%"
        height="100%"
        className="w-full h-full"
        style={{ minHeight: "100%", minWidth: "100%" }}
      >
        <g
          style={{
            transform: `translate(${tx}px, ${ty}px)`,
            transition: "transform 0.18s cubic-bezier(.68,-0.55,.27,1.55)",
          }}
        >
          {/* Static lines and dots for molecular effect */}
          <g stroke="#888" strokeWidth="1" opacity="0.18">
            <line x1="60" y1="80" x2="200" y2="120" />
            <line x1="180" y1="200" x2="400" y2="80" />
            <line x1="600" y1="100" x2="700" y2="300" />
            <line x1="100" y1="400" x2="350" y2="350" />
            <line x1="500" y1="500" x2="700" y2="600" />
            <line x1="200" y1="600" x2="100" y2="700" />
            <line x1="900" y1="200" x2="1100" y2="300" />
            <line x1="800" y1="600" x2="900" y2="700" />
            <line x1="1000" y1="100" x2="1200" y2="200" />
          </g>
          <g fill="#888" opacity="0.18">
            <circle cx="60" cy="80" r="3" />
            <circle cx="200" cy="120" r="2" />
            <circle cx="180" cy="200" r="2.5" />
            <circle cx="400" cy="80" r="2" />
            <circle cx="600" cy="100" r="2.5" />
            <circle cx="700" cy="300" r="2" />
            <circle cx="100" cy="400" r="2.5" />
            <circle cx="350" cy="350" r="2" />
            <circle cx="500" cy="500" r="2.5" />
            <circle cx="700" cy="600" r="2" />
            <circle cx="200" cy="600" r="2.5" />
            <circle cx="100" cy="700" r="2" />
            <circle cx="900" cy="200" r="2.5" />
            <circle cx="1100" cy="300" r="2" />
            <circle cx="800" cy="600" r="2.5" />
            <circle cx="900" cy="700" r="2" />
            <circle cx="1000" cy="100" r="2.5" />
            <circle cx="1200" cy="200" r="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// High-speed molecular animated background using HTML canvas
function FastMolecularBg() {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const mouse = useRef({ x: null, y: null });
  const PARTICLE_COUNT = 70;
  const SPEED = 2;
  const SENSITIVITY = 0.32;
  const LINE_DIST = 140;
  const PARTICLE_RADIUS = 2.5; // Increased for better visibility

  // Generate initial particles
  const createParticles = useCallback((w, h) => {
    return Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    let particles = createParticles(w, h);

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
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
        ctx.fillStyle = "rgba(91, 90, 90, 0.8)";
        ctx.shadowColor = "rgba(82, 80, 80, 0.5)";
        ctx.shadowBlur = 10; // More blur for glow
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    function handleMouseMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
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
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: "#000" }}
      aria-hidden="true"
    />
  );
}

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState("all");

  // Animation variants for grid and cards
  const gridVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    exit: {},
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120 } },
    exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-2 py-16">
      {/* High-speed molecular animated background */}
      <FastMolecularBg />
      {/* "Skills" text at top */}
      <span
        className="z-10 text-[4rem] mt-7 font-extrabold text-[#ffff] opacity-50 select-none pointer-events-none absolute top-2 left-1/2 -translate-x-1/2"
        style={{
          fontFamily: "'Fira Mono', 'Consolas', monospace",
          letterSpacing: "-0.05em",
        }}
      >
        Skills
      </span>

      {/* Back button
      <button
        className="absolute top-8 left-8 z-10 w-10 h-10 rounded-full border border-black flex items-center justify-center bg-white hover:bg-gray-200 transition"
        onClick={() => window.history.back()}
        aria-label="Back"
      >
        <span className="text-2xl">&#8592;</span>
      </button> */}

      {/* Cards */}
      <div className="relative z-10 mt-22 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-16 mt-2 w-full px-2">
        {/* Backend Developer Card */}
        <div
          className="group bg-white border-2 border-black rounded-xl shadow-lg p-5 xs:p-6 md:p-8 w-full max-w-[340px] md:max-w-[430px] h-[420px] md:h-[520px] flex flex-col items-center transition duration-200 hover:bg-gray-200/70 hover:shadow-none"
          style={{
            fontFamily: "'Fira Mono', 'Consolas', monospace",
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl xs:text-4xl md:text-4xl">💻</span>
            <span className="text-lg xs:text-xl md:text-2xl font-bold" style={{ fontFamily: "inherit" }}>
              Backend Developer
            </span>
          </div>
          <p className="mb-4 text-base xs:text-lg md:text-lg text-center" style={{ fontFamily: "inherit" }}>
            I design the unseen to make everything seen work better.
          </p>
          <div className="mb-3 w-full">
            <span className="font-bold text-base xs:text-lg md:text-xl" style={{ fontFamily: "inherit" }}>
              I LIKE TO CODE IN
            </span>
            <pre className="mt-1 text-sm xs:text-base md:text-lg whitespace-pre-wrap" style={{ fontFamily: "inherit" }}>
  Java, Javascript, Node, Express
  MySQL, Spring, C, Rest API,
  MongoDB &amp; Dart
            </pre>
          </div>
          <div className="w-full">
            <span className="font-bold text-base xs:text-lg md:text-xl" style={{ fontFamily: "inherit" }}>
              TOOLS
            </span>
            <ul className="list-disc ml-6 mb-2 text-sm xs:text-base md:text-lg" style={{ fontFamily: "inherit" }}>
              <li>VS Code</li>
              <li>Android Studio</li>
              <li>Postman API</li>
              <li>Render</li>
              <li>MongoDB Atlas</li>
              <li>Firebase</li>
            </ul>
          </div>
        </div>

        {/* Frontend Developer Card */}
        <div
          className="group bg-white border-2 border-black rounded-xl shadow-lg p-5 xs:p-6 md:p-8 w-full max-w-[340px] md:max-w-[430px] h-[420px] md:h-[520px] flex flex-col items-center transition duration-200 hover:bg-gray-200/70 hover:shadow-none"
          style={{
            fontFamily: "'Fira Mono', 'Consolas', monospace",
            boxShadow: "0 2px 8px 0 rgba(10, 10, 10, 0.1)",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl xs:text-4xl md:text-4xl">🎨</span>
            <span className="text-lg xs:text-xl md:text-2xl font-bold" style={{ fontFamily: "inherit" }}>
              Frontend Developer
            </span>
          </div>
          <p className="mb-4 text-base xs:text-lg md:text-lg text-center" style={{ fontFamily: "inherit" }}>
            I code the canvas<br />your users interact with.
          </p>
          <div className="mb-3 w-full">
            <span className="font-bold text-base xs:text-lg md:text-xl" style={{ fontFamily: "inherit" }}>
              SKILLS
            </span>
            <pre className="mt-1 text-sm xs:text-base md:text-lg whitespace-pre-wrap" style={{ fontFamily: "inherit" }}>
  Html, Css, Js, React,
  Redux, Bootstrap, Tailwind CSS, Firebase, Flutter
            </pre>
          </div>
          <div className="w-full">
            <span className="font-bold text-base xs:text-lg md:text-xl" style={{ fontFamily: "inherit" }}>
              TOOLS
            </span>
            <pre className="mt-1 text-sm xs:text-base md:text-lg whitespace-pre-wrap" style={{ fontFamily: "inherit" }}>
  VScode, Figma, Github, Vercel.
            </pre>
          </div>
        </div>
      </div>

      {/* Socials horizontal bar at center bottom */}
      <div className="absolute left-1/2 bottom-5 transform -translate-x-1/2 flex flex-row items-center gap-8 text-gray-200 text-2xl font-sans z-20">
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
  );
}