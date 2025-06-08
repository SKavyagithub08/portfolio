import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Socials array (same as LandingSection)
const socials = [
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/s-kavya-6424b3258/", label: "LinkedIn" },
  { icon: <FaGithub />, url: "https://github.com/SKavyagithub08", label: "GitHub" },
  { icon: <FaEnvelope />, url: "mailto:kavyasri2330@gmail.com", label: "Email" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-[black] flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Navbar is now global, remove local logo */}
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
          <div className="w-10 border-t border-[#444] mb-8" />
          <p className="text-lg md:text-xl text-gray-400 font-sans max-w-xl leading-relaxed">
            As an experienced product designer, I have spent the past seven years working my skills in the digital product design industry. <span className="text-white font-medium">Throughout my career, I have worked with a diverse range of clients, including big companies such as Preply and MantraDao, as well as established corporations, creating digital products that meet the needs of their end-users.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
