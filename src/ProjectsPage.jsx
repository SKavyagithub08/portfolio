import React, { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const projects = [
	{
		name: "KryptoGiffy",
		description:
			"This platform allows you to perform transactions via Blockchain by using Ethereum mainnet. Prerequisite: Web3.0 Wallet.",
		image: "/project1.png",
		github: "https://github.com/yourusername/kryptogiffy",
		tags: ["#Ropsten", "#Goerli", "#Ethereum", "#Web 3.0"],
		visit: "https://yourproject1.com",
	},
	{
		name: "Graphical Password Authentication",
		description:
			"Users can set passwords using images and their sequence using this project, which implements the same concept for password authentication as recaptcha (checks for Human). I have presented the Live Demo for Smart India Hackathon",
		image: "/project2.jpg",
		github: "https://github.com/yourusername/graphical-password",
		tags: [],
		visit: "https://yourproject2.com",
	},
	{
		name: "Breach Checker",
		description:
			"This website checks if your passwords or critical information has been leaked anywhere in the internet or not. This website is completely free, secure and not vulnerable to attacks like SQL Injection, XSS, etc.",
		image: "/project3.jpg",
		github: "https://github.com/yourusername/breach-checker",
		tags: [],
		visit: "https://yourproject3.com",
	},
	{
		name: "Crypto King",
		description: "Crypto king is a web app that shows Top 100 cryptocurrencies as well as detailed info.",
		image: "/project4.jpg",
		github: "https://github.com/yourusername/crypto-king",
		tags: [],
		visit: "https://yourproject4.com",
	},
    {
		name: "Crypto King",
		description: "Crypto king is a web app that shows Top 100 cryptocurrencies as well as detailed info.",
		image: "/project4.jpg",
		github: "https://github.com/yourusername/crypto-king",
		tags: [],
		visit: "https://yourproject4.com",
	},
    {
		name: "Crypto King",
		description: "Crypto king is a web app that shows Top 100 cryptocurrencies as well as detailed info.",
		image: "/project4.jpg",
		github: "https://github.com/yourusername/crypto-king",
		tags: [],
		visit: "https://yourproject4.com",
	},
    {
		name: "Crypto King",
		description: "Crypto king is a web app that shows Top 100 cryptocurrencies as well as detailed info.",
		image: "/project4.jpg",
		github: "https://github.com/yourusername/crypto-king",
		tags: [],
		visit: "https://yourproject4.com",
	},
];

const socials = [
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/s-kavya-6424b3258/", label: "LinkedIn" },
  { icon: <FaGithub />, url: "https://github.com/SKavyagithub08", label: "GitHub" },
  { icon: <FaEnvelope />, url: "mailto:kavyasri2330@gmail.com", label: "Email" },
];

function ProjectCard({ project }) {
	const [flipped, setFlipped] = useState(false);

	// Touch support for mobile
	const handleTouch = () => setFlipped((f) => !f);

	// Diagonal cut at the top right (not bottom)
	const clipPath = "polygon(0 0, 90% 0, 100% 12%, 100% 100%, 0% 100%)";

	return (
		<div
			className="flex-shrink-0 w-[280px] min-h-[350px] perspective scroll-snap-align-start"
			style={{ perspective: "1200px", scrollSnapAlign: "start" }}
			onTouchStart={handleTouch}
		>
			<div
				className={`relative w-full min-h-[350px] h-full transition-transform duration-500 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`}
				style={{ transformStyle: "preserve-3d" }}
				onMouseEnter={() => setFlipped(true)}
				onMouseLeave={() => setFlipped(false)}
			>
				{/* Front */}
				<div
					className="absolute w-full min-h-[350px] h-full bg-[#faf7f6] flex flex-col items-center justify-start shadow-2xl px-7 pt-7 pb-5 text-center cursor-pointer border border-white transition-transform duration-200 hover:scale-105 hover:-translate-y-1"
					style={{
						backfaceVisibility: "hidden",
						clipPath,
						boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
					}}
				>
					<h2 className="text-xl md:text-2xl font-bold mb-3 mt-0">{project.name}</h2>
					<p className="text-sm md:text-base text-black font-normal flex-1">{project.description}</p>
				</div>
				{/* Back */}
				<div
					className="absolute w-full min-h-[350px] h-full bg-black flex flex-col items-center justify-between shadow-2xl px-5 pt-7 pb-5 text-center rotate-y-180 border border-white transition-transform duration-200 hover:scale-105 hover:-translate-y-1"
					style={{
						backfaceVisibility: "hidden",
						color: "#fff",
						clipPath,
						boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
					}}
				>
					<img
						src={project.image}
						alt={project.name}
						className="w-full h-32 object-cover rounded-xl mb-3 border border-gray-800"
					/>
					<div className="flex items-center justify-between w-full px-2 mt-2">
						<a
							href={project.visit}
							target="_blank"
							rel="noopener noreferrer"
							className="flex-1 bg-[#faf7f6] text-black rounded-full px-4 py-2 font-semibold text-base shadow hover:bg-gray-200 transition text-center"
						>
							Visit
						</a>
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							className="ml-3 text-white hover:text-gray-300 text-2xl"
							aria-label="GitHub"
						>
							<FaGithub />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function ProjectsPage() {
	const scrollRef = useRef(null);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const scrollLeft = useRef(0);

	// Mouse/touch drag-to-scroll handlers
	const handleMouseDown = (e) => {
		isDragging.current = true;
		startX.current = e.pageX - scrollRef.current.offsetLeft;
		scrollLeft.current = scrollRef.current.scrollLeft;
		scrollRef.current.classList.add("cursor-grabbing");
	};
	const handleMouseLeave = () => {
		isDragging.current = false;
		scrollRef.current.classList.remove("cursor-grabbing");
	};
	const handleMouseUp = () => {
		isDragging.current = false;
		scrollRef.current.classList.remove("cursor-grabbing");
	};
	const handleMouseMove = (e) => {
		if (!isDragging.current) return;
		e.preventDefault();
		const x = e.pageX - scrollRef.current.offsetLeft;
		const walk = (x - startX.current) * 1.2;
		scrollRef.current.scrollLeft = scrollLeft.current - walk;
	};

	// Touch drag
	const handleTouchStart = (e) => {
		isDragging.current = true;
		startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
		scrollLeft.current = scrollRef.current.scrollLeft;
	};
	const handleTouchEnd = () => {
		isDragging.current = false;
	};
	const handleTouchMove = (e) => {
		if (!isDragging.current) return;
		const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
		const walk = (x - startX.current) * 1.2;
		scrollRef.current.scrollLeft = scrollLeft.current - walk;
	};

	return (
		<div className="relative min-h-screen bg-black flex flex-col">
			{/* Projects horizontal carousel */}
			<div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
				<h1 className="text-[8vw] md:text-[5vw] font-extrabold text-white opacity-50 absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0" style={{ letterSpacing: "-0.05em" }}>
					MY WORK
				</h1>
				<div className="relative z-10 w-full max-w-7xl mt-24">
					<div
						ref={scrollRef}
						className="flex gap-x-6 overflow-x-auto pb-4 px-2"
						style={{
							scrollSnapType: "x mandatory",
							WebkitOverflowScrolling: "touch",
							scrollbarWidth: "none",
							msOverflowStyle: "none",
						}}
						onMouseDown={handleMouseDown}
						onMouseLeave={handleMouseLeave}
						onMouseUp={handleMouseUp}
						onMouseMove={handleMouseMove}
						onTouchStart={handleTouchStart}
						onTouchEnd={handleTouchEnd}
						onTouchMove={handleTouchMove}
					>
						{projects.map((project, idx) => (
							<ProjectCard key={project.name + idx} project={project} />
						))}
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
			<style>{`
        .scrollbar-thin::-webkit-scrollbar { display: none; }
        .cursor-grabbing { cursor: grabbing !important; }
        .perspective { perspective: 1200px; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .scroll-snap-align-start { scroll-snap-align: start; }
      `}</style>
		</div>
	);
}
