import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import AboutPage from "./AboutPage";
import SkillsPage from "./SkillsPage";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Add socials array at the top
const socials = [
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/s-kavya-6424b3258/", label: "LinkedIn" },
  { icon: <FaGithub />, url: "https://github.com/SKavyagithub08", label: "GitHub" },
  { icon: <FaEnvelope />, url: "mailto:kavyasri2330@gmail.com", label: "Email" },
];

export default function LandingSection() {
  const name = "kavya";
  const [visibleCount, setVisibleCount] = useState(0);
  const [dimProjects, setDimProjects] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const navigate = useNavigate();

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
      <section className="min-h-[85vh] h-[85vh] bg-black text-white flex flex-col relative">
        {/* Top bar */}
        {/* REMOVE: duplicate nav, handled by Navbar */}
        {/* Main identity row at bottom */}
        <div className="flex items-end justify-between w-full px-8 pb-[10vh] flex-1">
          <div>
            <h1 className="text-[10vw] md:text-[7vw] font-bold uppercase tracking-tight leading-none flex">
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
              className="text-xl text-gray-400 font-sans mt-1 block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
            >
              Full Stack Developer & Designer
            </motion.span>
          </div>
          <motion.a
            href="#contact"
            className="flex items-center text-white text-s font-normal transition-colors duration-200 hover:text-gray-300"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
          >
            Start a project
            <svg
              className="ml-1 w-4 h-4 mt-1.5"
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
          </motion.a>
        </div>
        {/* Scroll icon/visual in the middle bottom */}
        <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none select-none">
          <span
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 shadow-lg transition-all duration-500"
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
        <div className="relative w-full h-[48vh] max-h-[480px] flex items-center justify-center overflow-hidden group cursor-pointer">
          <img
            src="/project1.png"
            alt="Project 1"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center w-full h-full">
            <span className="text-4xl md:text-5xl font-light text-white mb-2">
              Paperlane
            </span>
            <span className="text-lg md:text-xl text-white font-normal">
              Brand Design
            </span>
          </div>
        </div>
        {/* Project 2 */}
        <div className="relative w-full h-[48vh] max-h-[480px] flex items-center justify-center overflow-hidden group cursor-pointer">
          <img
            src="/project2.jpg"
            alt="Project 2"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center w-full h-full">
            <span className="text-4xl md:text-5xl font-light text-white mb-2">
              Portfolio Website
            </span>
            <span className="text-lg md:text-xl text-white font-normal">
              Frontend Dev
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
        className="w-full flex flex-row items-center justify-between bg-black border-t border-gray-700 py-16 px-8 min-h-[60vh]"
        style={{ minHeight: "60vh" }}
      >
        {/* Left: Text */}
        <div className="flex-1 flex flex-col justify-center max-w-[60%]">
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
        {/* Right: Image and Socials */}
        <div className="flex flex-col items-center min-w-[260px]">
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
            <span className="block text-base text-gray-300 font-sans mb-6">
              Contact
            </span>
            <h2 className="text-[2.5rem] md:text-[3rem] font-light text-white mb-8 leading-tight font-sans">
              I&apos;d love to work together.
            </h2>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:hi@cedrikstephen.com"
                className="text-lg md:text-xl text-gray-100 font-sans mb-1 flex items-center gap-1 hover:underline underline-offset-4 w-fit"
                target="_blank"
                rel="noopener noreferrer"
              >
                hi@cedrikstephen.com
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
              <span className="text-lg md:text-xl text-gray-100 font-sans">
                +31 6 1415 2550
              </span>
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