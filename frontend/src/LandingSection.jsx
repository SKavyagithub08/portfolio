import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import AboutPage from "./AboutPage";
import SkillsPage from "./SkillsPage";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Add socials array at the top
const socials = [
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/s-kavya-6424b3258/", label: "LinkedIn" },
  { icon: <FaGithub />, url: "https://github.com/SKavyagithub08", label: "GitHub" },
  { icon: <FaEnvelope />, url: "mailto:kavyasri2330@gmail.com", label: "Email" },
];

// --- High-speed molecular animated background using HTML canvas (copied from SkillsPage) ---
function FastMolecularBg() {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const mouse = useRef({ x: null, y: null });
  const PARTICLE_COUNT = 40;
  const SPEED = 2;
  const SENSITIVITY = 0.32;
  const LINE_DIST = 0;
  const PARTICLE_RADIUS = 2.5;

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
    // Use parent section size instead of window size for correct coverage
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
        ctx.fillStyle = "rgba(91, 90, 90, 0.8)";
        ctx.shadowColor = "rgba(82, 80, 80, 0.5)";
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    // animate();

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

export default function LandingSection() {
  const name = "kavya";
  const [visibleCount, setVisibleCount] = useState(0);
  const [dimProjects, setDimProjects] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);

  // Animate the main "kavya" letter by letter
  useEffect(() => {
    if (visibleCount < name.length) {
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), 20);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, name.length]);

  // Dim projects when about section is in view
  useEffect(() => {
    function handleScroll() {
      if (!aboutRef.current || !projectsRef.current) return;
      const aboutTop = aboutRef.current.getBoundingClientRect().top;
      const projectsBottom = projectsRef.current.getBoundingClientRect().bottom;
      setDimProjects(aboutTop < window.innerHeight * 0.6 && projectsBottom > 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (showAbout) {
    return <AboutPage />;
  }

  if (showSkills) return <SkillsPage />;

  return (
    <>
      {/* Landing Section: Half viewport height */}
      <section className="min-h-[85vh] h-[85vh] bg-black text-white flex flex-col relative overflow-hidden">
        {/* High-speed molecular animated background (same as SkillsPage) */}
        <FastMolecularBg />
        {/* Main identity row */}
        <div
          className="
            flex flex-col items-center justify-center
            md:flex-row md:items-end md:justify-between
            w-full px-4 md:px-8
            pb-0 md:pb-[10vh]
            flex-1 z-10
            text-center md:text-left
          "
          style={{ minHeight: "0" }}
        >
          <div>
            <h1 className="text-[10vw] md:text-[7vw] font-bold uppercase tracking-tight leading-none flex justify-center md:justify-start">
              {name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    i < visibleCount
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ delay: i * 0.1, duration: 0.18 }}
                  className={char === " " ? "inline-block w-4" : "inline-block"}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
            <motion.span
              className="text-xl text-gray-400 font-sans mt-1 ml-0 md:ml-2 block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
            >
              Full Stack Developer & Designer
            </motion.span>
          </div>
          {/* Desktop (md+) inline button */}
          <NavLink
            to="/contact"
            className="hidden md:flex items-center text-white text-s font-normal transition-colors duration-200 hover:text-gray-300 cursor-pointer bg-transparent border-none outline-none pointer-events-auto mt-6 md:mt-0"
            style={{ padding: 0, background: "none" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
              className="mr-1"
            >
              Start a project
            </motion.span>
            <svg
              className="w-4 h-4 mt-1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 30 30"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 19L19 5M19 5v8m0-8h-8"
              />
            </svg>
          </NavLink>
        </div>
        {/* Scroll icon/visual in the middle bottom */}
        <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 z-30 flex flex-col items-center select-none">
          <span
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 shadow-lg transition-all duration-500 pointer-events-none"
            style={{
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
              backdropFilter: "blur(1px)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-300 animate-bounce-slow"
              style={{ transition: "color 0.5s" }}
            >
              <circle
                cx="12"
                cy="12"
                r="11"
                stroke="currentColor"
                strokeWidth="1.2"
                opacity="0.3"
              />
              <path
                d="M12 8v6m0 0-2.5-2.5M12 14l2.5-2.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </section>
      {/* Projects Section: Appears after scroll */}
      <section
        id="projects"
        ref={projectsRef}
        className="w-full flex flex-col items-center gap-0 bg-black relative"
      >
        {/* Dimming overlay with smooth transition */}
        <div
          className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-500`}
          style={{
            background: "rgba(0,0,0,0.6)",
            opacity: dimProjects ? 1 : 0,
          }}
        />
        {/* Project 1 */}
        <div className="relative w-full h-[28vh] md:h-[48vh] max-h-[240px] md:max-h-[480px] flex items-center justify-center overflow-hidden group cursor-pointer">
          <img
            src="/project2.jpg"
            alt="Project 2"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              maxHeight: "100%",
            }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center w-full h-full">
            <span className="text-4xl md:text-5xl font-light text-white mb-2">
              Tech Cart
            </span>
            <span className="text-lg md:text-xl text-white font-normal">
              Clothing E-commerce
            </span>
          </div>
        </div>
        {/* Project 2 */}
        <div className="relative w-full h-[28vh] md:h-[48vh] max-h-[240px] md:max-h-[480px] flex items-center justify-center overflow-hidden group cursor-pointer">
          <img
            src="/project3.png"
            alt="Project 1"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              maxHeight: "100%",
            }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center w-full h-full">
            <span className="text-4xl md:text-5xl font-light text-white mb-2">
              E-axion'24
            </span>
            <span className="text-lg md:text-xl text-white font-normal">
              Symposium Website
            </span>
          </div>
        </div>
        
        
        {/* View all projects link */}
        <div className="w-full flex justify-end px-8 py-6">
          <NavLink
            to="/projects"
            className="flex items-center text-white text-base font-light hover:text-gray-300 transition-colors group"
          >
            View all projects
            <svg
              className="ml-0 w-4 h-4 mt-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-4-4 4 4-4 4"
              />
            </svg>
          </NavLink>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="w-full bg-black border-t border-gray-700 py-8 md:py-12 px-3 md:px-8 min-h-[40vh] flex flex-col md:flex-row items-center md:items-center justify-between"
        style={{ minHeight: "40vh" }}
      >
        {/* Mobile view: Centered circular image, text, button, socials */}
        <div className="flex flex-col items-center w-full md:hidden">
          {/* Image Centered - Circular */}
          <div className="w-[110px] h-[110px] bg-gray-800 rounded-full overflow-hidden flex items-center justify-center mb-2 mx-auto">
            <img
              src="/kavya2.jpg"
              alt="kavya"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Text Centered */}
          <span className="text-xl font-semibold text-gray-300 font-sans mb-2 text-center">
            Hello, I'm Kavya
          </span>
          <span
            className="text-base font-light text-white leading-tight mb-4 text-center"
            style={{ lineHeight: 1.2, wordBreak: "keep-all", whiteSpace: "normal" }}
          >
            "Helping businesses showcase their value to the world through strategic and timeless design."
          </span>
          <NavLink
            to="/about"
            className="mx-auto text-base text-gray-200 font-sans hover:text-white transition-colors flex items-center gap-1 w-fit justify-center bg-gray-800 rounded-full px-5 py-1.5"
          >
            Learn more
            <svg
              className="w-4 h-4 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-4-4 4 4-4 4"
              />
            </svg>
          </NavLink>
          {/* Social Icons Centered */}
          <div className="flex flex-row items-center gap-5 text-gray-200 text-2xl md:text-2xl font-sans mt-5 justify-center">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label={s.label}
                style={{
                  fontSize: "1.5rem", // slightly larger for mobile
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {/* Desktop view: original layout */}
        <div className="hidden md:flex flex-1 flex-col justify-center max-w-[60%]">
          <span className="text-2xl font-semibold text-gray-300 font-sans mb-4">
            Hello, I'm Kavya
          </span>
          <span
            className="text-[2.5rem] md:text-[2.8rem] font-light text-white leading-tight mb-8"
            style={{ lineHeight: 1.1 }}
          >
            "Helping businesses showcase
            <br />
            their value to the world through
            <br />
            strategic and timeless design."
          </span>
          <NavLink
            to="/about"
            className="text-base text-gray-200 font-sans hover:text-white transition-colors flex items-center gap-1 w-fit"
          >
            Learn more
            <svg
              className="w-4 h-4 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-4-4 4 4-4 4"
              />
            </svg>
          </NavLink>
        </div>
        <div className="hidden md:flex flex-col items-center min-w-[260px]">
          <div className="w-[270px] h-[340px] bg-gray-800 rounded-sm overflow-hidden mb-6 flex items-center justify-center">
            <img
              src="/kavya2.jpg"
              alt="kavya"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Socials row */}
          <div className="flex flex-row items-center gap-6 text-gray-200 text-2xl font-sans mt-2">
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
      </section>

      {/* Line divider after About Section */}
      <div className="w-full border-t border-gray-700" />

      {/* Contact Section */}
      <section
        id="contact"
        className="w-full border-t border-gray-700 bg-black px-3 pt-16 pb-12"
      >
        <div className="max-w-[1100px] flex justify-start ml-0 pl-5">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <span className="block text-lg text-gray-300 font-sans mb-6">
              CONTACT
            </span>
            <h2 className="text-xl md:text-[2.5rem] lg:text-[3rem] font-light text-white mb-5 leading-tight font-sans">
              I&apos;d love to work together!
            </h2>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:hi@cedrikstephen.com"
                className="text-lg md:text-xl text-gray-100 font-sans mb-1 flex items-center gap-1 hover:underline underline-offset-4 w-fit"
                target="_blank"
                rel="noopener noreferrer"
              >
                kavyasri2330@gmail.com
                <svg
                  className="w-4 h-4 inline-block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 13l6-6m0 0H8m5-1v5"
                  />
                </svg>
              </a>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* Add this to your global CSS (e.g., index.css) for a smoother bounce:
//
// @keyframes bounce-slow {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(12px); }
// }
// .animate-bounce-slow {
//   animation: bounce-slow 1.6s cubic-bezier(.68,-0.55,.27,1.55) infinite;
// }
*/