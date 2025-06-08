import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Categorized skills data
const skillCategories = [
    {
        key: "all",
        label: "All",
        skills: [
            // All skills (flattened)
            { name: "Java", logo: "/public/java.svg", category: "Programming Languages" },
            { name: "JavaScript", logo: "/public/js.svg", category: "Programming Languages" },
            { name: "C", logo: "/public/c.svg", category: "Programming Languages" },
            { name: "React.js", logo: "/public/react.svg", category: "Frameworks" },
            { name: "Express.js", logo: "/public/express.svg", category: "Frameworks" },
            { name: "Flutter", logo: "/public/flutter.svg", category: "Frameworks" },
            { name: "HTML", logo: "/public/html5.svg", category: "Technologies" },
            { name: "CSS", logo: "/public/css3.svg", category: "Technologies" },
            { name: "Bootstrap", logo: "/public/bootstrap.svg", category: "Technologies" },
            { name: "Tailwind", logo: "/public/tailwind.svg", category: "Technologies" },
            { name: "Redux", logo: "/public/redux.svg", category: "Technologies" },
            { name: "Node.js", logo: "/public/nodejs.svg", category: "Technologies" },
            { name: "Rest API", logo: "/public/api.svg", category: "Technologies" },
            { name: "Git", logo: "/public/git.svg", category: "Technologies" },
            { name: "SpringBoot", logo: "/public/spring.svg", category: "Technologies" },
            { name: "MySQL", logo: "/public/mysql.svg", category: "Database" },
            { name: "MongoDB", logo: "/public/mongodb.svg", category: "Database" },
            { name: "GitHub", logo: "/public/github.svg", category: "Developer Tools" },
            { name: "VS Code", logo: "/public/vscode.svg", category: "Developer Tools" },
            { name: "Android Studio", logo: "/public/androidstudio.svg", category: "Developer Tools" },
            { name: "Postman API", logo: "/public/postman.svg", category: "Developer Tools" },
            { name: "Vercel", logo: "/public/vercel.svg", category: "Developer Tools" },
            { name: "Render", logo: "/public/render.svg", category: "Developer Tools" },
            // { name: "MongoDB Compass", logo: "/public/compass.svg", category: "Developer Tools" },
            { name: "Firebase", logo: "/public/firebase.svg", category: "Developer Tools" },
        ],
    },
    {
        key: "programming",
        label: "Programming Languages",
        skills: [
            { name: "Java", logo: "/public/java.svg" },
            { name: "JavaScript", logo: "/public/js.svg" },
            { name: "C", logo: "/public/c.svg" },
        ],
    },
    {
        key: "frameworks",
        label: "Frameworks",
        skills: [
            { name: "React.js", logo: "/public/react.svg" },
            { name: "Express.js", logo: "/public/express.svg" },
            { name: "Flutter", logo: "/public/flutter.svg" },
        ],
    },
    {
        key: "technologies",
        label: "Technologies",
        skills: [
            { name: "HTML", logo: "/public/html5.svg" },
            { name: "CSS", logo: "/public/css3.svg" },
            { name: "Bootstrap", logo: "/public/bootstrap.svg" },
            { name: "Tailwind", logo: "/public/tailwind.svg" },
            { name: "Redux", logo: "/public/redux.svg" },
            { name: "Node.js", logo: "/public/nodejs.svg" },
            { name: "Rest API", logo: "/public/api.svg" },
            { name: "Git", logo: "/public/git.svg" },
            { name: "SpringBoot", logo: "/public/springboot.svg" },
        ],
    },
    {
        key: "database",
        label: "Database",
        skills: [
            { name: "MySQL", logo: "/public/mysql.svg" },
            { name: "MongoDB", logo: "/public/mongodb.svg" },
        ],
    },
    {
        key: "tools",
        label: "Developer Tools",
        skills: [
            { name: "GitHub", logo: "/public/github.svg" },
            { name: "VS Code", logo: "/public/vscode.svg" },
            { name: "Android Studio", logo: "/public/androidstudio.svg" },
            { name: "Postman API", logo: "/public/postman.svg" },
            { name: "Vercel", logo: "/public/vercel.svg" },
            { name: "Render", logo: "/public/render.svg" },
            { name: "MongoDB Compass", logo: "/public/compass.svg" },
            { name: "Firebase", logo: "/public/firebase.svg" },
        ],
    },
];

const tabOrder = [
  { key: "all", label: "ALL" },
  { key: "programming", label: "PROGRAMMING" },
  { key: "frameworks", label: "FRAMEWORKS" },
  { key: "technologies", label: "TECHNOLOGIES" },
  { key: "database", label: "DATABASE" },
  { key: "tools", label: "TOOLS" },
];

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

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const currentCategory = skillCategories.find((cat) => cat.key === activeTab);

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
    <div className="relative min-h-screen w-full bg-[black] flex flex-col items-center justify-center overflow-hidden px-2 py-16">
      {/* Animated molecular background */}
      <MolecularBg />

      {/* "Skills" text at top */}
      <span
        className="z-10 text-[5rem] font-extrabold text-[#ffff] opacity-50 select-none pointer-events-none"
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
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-16 mt-2">
        {/* Software Developer Card */}
        <div
          className="group bg-white border-2 border-black rounded-md shadow-lg p-8 w-[430px] h-[520px] flex flex-col transition duration-200 hover:bg-gray-200/40 hover:shadow-none"
          style={{
            fontFamily: "'Fira Mono', 'Consolas', monospace",
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">💻</span>
            <span className="text-2xl font-bold" style={{ fontFamily: "inherit" }}>
              Software Developer
            </span>
          </div>
          <p className="mb-6 text-xl" style={{ fontFamily: "inherit" }}>
            I enjoy writing clean code and<br />
            creating useful products.
          </p>
          <div className="mb-4">
            <span className="font-bold text-xl" style={{ fontFamily: "inherit" }}>
              I LIKE TO CODE IN
            </span>
            <pre className="mt-1 text-lg whitespace-pre-wrap" style={{ fontFamily: "inherit" }}>
  Python, Java, Javascript, Node,
  MySQL, GraphQL, Spring, C, C++,
  MongoDB &amp; Dart
            </pre>
          </div>
          <div>
            <span className="font-bold text-xl" style={{ fontFamily: "inherit" }}>
              TOOLS
            </span>
            <ul className="list-disc ml-8 mt-1 text-lg" style={{ fontFamily: "inherit" }}>
              <li>Anaconda</li>
              <li>Eclipse</li>
              <li>Jupyter</li>
              <li>Pycharm</li>
            </ul>
          </div>
        </div>

        {/* Frontend Developer Card */}
        <div
          className="group bg-white border-2 border-black rounded-md shadow-lg p-8 w-[430px] h-[520px] flex flex-col transition duration-200 hover:bg-gray-200/40 hover:shadow-none"
          style={{
            fontFamily: "'Fira Mono', 'Consolas', monospace",
            boxShadow: "0 2px 8px 0 rgba(10, 10, 10, 0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🎨</span>
            <span className="text-2xl font-bold" style={{ fontFamily: "inherit" }}>
              Frontend Developer
            </span>
          </div>
          <p className="mb-6 text-xl" style={{ fontFamily: "inherit" }}>
            It's fun for me to bring new concepts<br />
            to life. I consider myself fortunate<br />
            to be a Fullstack developer because my<br />
            work has a direct impact on the user's life.
          </p>
          <div className="mb-4">
            <span className="font-bold text-xl" style={{ fontFamily: "inherit" }}>
              SKILLS
            </span>
            <pre className="mt-1 text-lg whitespace-pre-wrap" style={{ fontFamily: "inherit" }}>
  Html, Css, Js, Handlebars, React,
  Redux, Sass, Bootstrap, Firebase
            </pre>
          </div>
          <div>
            <span className="font-bold text-xl" style={{ fontFamily: "inherit" }}>
              TOOLS
            </span>
            <pre className="mt-1 text-lg whitespace-pre-wrap" style={{ fontFamily: "inherit" }}>
  VScode, Figma, Github, AdobeXD etc.
            </pre>
          </div>
        </div>
      </div>

      {/* Socials horizontal bar at center bottom */}
      <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 flex flex-row items-center gap-8 text-gray-200 text-2xl font-sans z-20">
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