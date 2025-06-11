import React, { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
	{
		name: "Hydrax",
		description:
			"A smart water bottle powered by Flutter, Firebase, and ESP32 BLE, featuring Peltier-based real-time temperature control, ambient-aware auto-adjustments, and personalized hydration tracking. It redefines a daily-use item with IoT and AI-enhanced logic",
		image: "/project1.jpg",
		github: "https://github.com/sivaprakasam-07/hydrax_new",
		tags: ["#Flutter widgets", "#Dart", "#Adroid Studio", "#GetX", "#ESP32", "#Firebase"],
		visit: "https://github.com/sivaprakasam-07/hydrax_new",
	},
	{
		name: "Tech Cart",
description:
	"Built a secure e-commerce app with Firebase, Stripe, and Bcrypt. Designed a responsive UI using Tailwind + Headless UI, implemented auth, privacy, and cookie handling, real-time alerts via React Toastify, and backend modeling with Mongoose.",
		image: "/project2.jpg",
		github: "https://github.com/SKavyagithub08/fullstack-projects/tree/main/TECH%20CART/FullStack%20projects/NextJS-TechCart-24",
		tags: ["#React", "#Tailwind CSS", "#bycrpt","#toastify","#JavaScript", "#Node.js", "#Express", "#MongoDB"],
		visit: "https://github.com/SKavyagithub08/fullstack-projects/tree/main/TECH%20CART/FullStack%20projects/NextJS-TechCart-24",
	},
	{
		name: "E-axion'24",
		description:
			"A dynamic and responsive frontend website built for the E-Axion'24 Technical Symposium, designed to streamline event registrations, provide event details, and showcase the symposium's theme and schedule. The site delivers an engaging user experience for students, staff, and event coordinators alike.",
		image: "/project3.png",
		github: "https://github.com/SKavyagithub08/fullstack-projects/tree/main/ECE%20sympo-main",
		tags: ["#html", "#css", "#JavaScript", "#Bootstrap",],
		visit: "https://e--axion24.web.app/",
	},
	{
		name: "Event Scheduler",
		description: "A full-stack MERN application designed to streamline college event management. It supports dual logins (admin/user), event creation, ticketing, planning, and real-time updates. It replaces chaotic manual systems with an intuitive, centralized platform bridging tech with real student needs.",
		image: "/project4.png",
		github: "https://github.com/sivaprakasam-07/Event-Tracker",
		tags: ["#React", "#Tailwind CSS", "#JavaScript", "#Node.js", "#Express", "#MongoDB"],
		visit: "https://github.com/sivaprakasam-07/Event-Tracker",
	},
    {
		name: "SaferouteX",
		description: "Developing a next-gen women’s safety app that fuses AI threat prediction, real-time emergency response, and community intelligence — empowering women to move freely while fostering a culture of proactive protection.",
		image: "/project5.jpg",
		github: "https://github.com/Joanfestina/saferouteX",
		tags: ["#Flutter widgets", "#Dart", "#Adroid Studio", "#Firebase"],
		visit: "https://github.com/Joanfestina/saferouteX",
	},
    {
		name: "Dynamic Form",
		description: "A responsive and customizable dynamic form where users can add, edit, or remove input fields in real-time. Perfect for surveys, registrations, or any use case needing flexible user-driven forms. Built for scalability and smooth user experience",
		image: "/project6.png",
		github: "https://github.com/SKavyagithub08/dynamic-form",
		tags: ["#React", "#Tailwind CSS", "#JavaScript", "#Node.js", "#Express", "#MongoDB"],
		visit: "https://dynamic-form-frontend.onrender.com/",
	},
    {
		name: "Netflix Clone",
		description: "A sleek, responsive Netflix clone built with HTML, CSS, and JavaScript. Features a modern UI, interactive movie sections, hover animations, and a static preview of Netflix’s homepage experience. Designed purely for frontend practice and UI/UX enhancement.",
		image: "/project7.png",
		github: "https://github.com/SKavyagithub08/front-end/tree/main/NetFlix",
		tags: ["#Html", "#CSS", "#JavaScript"],
		visit: "https://github.com/SKavyagithub08/front-end/tree/main/NetFlix",
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
			className="flex-shrink-0 mb-9 w-[300px] min-h-[390px] md:w-[240px] md:min-h-[340px] perspective scroll-snap-align-start"
			style={{ perspective: "1200px", scrollSnapAlign: "start" }}
			onTouchStart={handleTouch}
		>
			<div
				className={`relative w-full min-h-[390px] md:min-h-[340px] h-full transition-transform duration-500 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`}
				style={{ transformStyle: "preserve-3d" }}
				onMouseEnter={() => setFlipped(true)}
				onMouseLeave={() => setFlipped(false)}
			>
				{/* Front */}
				<div
					className="absolute w-full min-h-[390px] md:min-h-[340px] h-full bg-[#faf7f6] flex flex-col items-center justify-start shadow-2xl px-6 pt-7 pb-5 text-center cursor-pointer border border-white transition-transform duration-200 hover:scale-105 hover:-translate-y-1"
					style={{
						backfaceVisibility: "hidden",
						clipPath,
						boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
					}}
				>
					<h2 className="text-xl md:text-xl font-bold mb-5 mt-0">{project.name}</h2>
					<p className="text-[16px] md:text-sm text-black font-normal flex-1">{project.description}</p>
				</div>
				{/* Back */}
				<div
					className="absolute w-full min-h-[390px] md:min-h-[340px] h-full bg-black flex flex-col items-center justify-between shadow-2xl px-5 pt-7 pb-5 text-center rotate-y-180 border border-white transition-transform duration-200 hover:scale-105 hover:-translate-y-1"
					style={{
						backfaceVisibility: "hidden",
						color: "#fff",
						clipPath,
						boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
					}}
				>
					{/* Image */}
					<img
						src={project.image}
						alt={project.name}
						className="w-full h-32 object-cover rounded-xl mb-3 border border-gray-800"
					/>
					{/* Horizontal line */}
					<hr className="w-full border-t border-white opacity-80 my-2" />
					{/* Tags area */}
					<div className="flex flex-wrap gap-x-2 gap-y-1 justify-start w-full mb-2 px-1 min-h-[28px]">
						{(project.tags && project.tags.length > 0
							? project.tags
							: ["#Tag"])
							.map((tag, idx) => (
								<span key={idx} className="text-white text-m font-light">{tag}</span>
							))}
					</div>
					{/* Visit and GitHub row */}
					<div className="flex items-center justify-between w-full px-1 mt-auto">
						<a
							href={project.visit}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center bg-[#faf7f6] text-black text-base font-normal px-6 py-2 rounded-l-full rounded-tr-[0.5rem] rounded-br-[0.5rem] shadow hover:bg-gray-200 transition min-w-[90px] justify-center"
							style={{
								borderTopRightRadius: "0.5rem",
								borderBottomRightRadius: "0.5rem",
								borderTopLeftRadius: "2rem",
								borderBottomLeftRadius: "2rem",
							}}
						>
							Visit
						</a>
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							className="ml-3 flex items-center justify-center w-9 h-9 rounded-full bg-white text-black shadow border border-white hover:bg-gray-100 transition"
							aria-label="GitHub"
						>
							<FaGithub size={22} />
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
		<AnimatePresence>
			<motion.div
				key="projects-page"
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
				className="relative min-h-screen bg-black flex flex-col"
			>
				{/* Projects horizontal carousel */}
				<div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
					<h1 className="text-[10vw] md:text-[5vw] font-extrabold text-white opacity-50 absolute left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 top-37 md:top-8" style={{ letterSpacing: "-0.05em" }}>
						MY WORK
					</h1>
					<div className="relative z-10 w-full max-w-7xl mt-24">
						<div
							ref={scrollRef}
							className="flex gap-x-20 ml-10 overflow-x-auto pb-4 px-2"
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
			</motion.div>
		</AnimatePresence>
	);
}
