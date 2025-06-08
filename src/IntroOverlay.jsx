import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
	{ text: "Hola!", lang: "es" },
	{ text: "Bonjour!", lang: "fr" },
	{ text: "नमस्ते!", lang: "hi" },
	{ text: "こんにちは!", lang: "ja" },
	{ text: "Ciao!", lang: "it" },
	{ text: "Olá!", lang: "pt" },
];

const hello = "Hello!";

export default function IntroOverlay({ onFinish }) {
	const [step, setStep] = useState(0); // 0: typing, 1: greetings, 2: slide up
	const [typedCount, setTypedCount] = useState(0);
	const [greetIndex, setGreetIndex] = useState(0);
	const [showOverlay, setShowOverlay] = useState(true);

	// Step 1: Typing animation for "Hello!"
	useEffect(() => {
		if (step === 0 && typedCount < hello.length) {
			const timer = setTimeout(() => setTypedCount((c) => c + 1), 50);
			return () => clearTimeout(timer);
		}
		if (step === 0 && typedCount === hello.length) {
			const timer = setTimeout(() => setStep(1), 1000); // Gap after "Hello!"
			return () => clearTimeout(timer);
		}
	}, [step, typedCount]);

	// Step 2: Cycle through greetings
	useEffect(() => {
		if (step === 1 && greetIndex < greetings.length) {
			const timer = setTimeout(() => setGreetIndex((i) => i + 1), 180); // Fast transition
			return () => clearTimeout(timer);
		}
		if (step === 1 && greetIndex === greetings.length) {
			const timer = setTimeout(() => setStep(2), 100);
			return () => clearTimeout(timer);
		}
	}, [step, greetIndex]);

	// Step 3: Slide up and fade out overlay
	useEffect(() => {
		if (step === 2) {
			const timer = setTimeout(() => setShowOverlay(false), 800); // Match slide duration
			return () => clearTimeout(timer);
		}
	}, [step]);

	useEffect(() => {
		if (!showOverlay && onFinish) onFinish();
	}, [showOverlay, onFinish]);

	return (
		<AnimatePresence>
			{showOverlay && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black"
					initial={{ opacity: 1, y: 0 }}
					animate={
						step === 2
							? { opacity: 0, y: "-100vh", transition: { duration: 0.8, ease: "easeInOut" } }
							: { opacity: 1, y: 0 }
					}
					exit={{ opacity: 0, y: "-100vh", transition: { duration: 0.8, ease: "easeInOut" } }}
					style={{ willChange: "opacity, transform" }}
				>
					{/* Step 1: Typing "Hello!" */}
					{step === 0 && (
						<div className="flex space-x-1 text-white text-5xl md:text-7xl font-light">
							{hello.split("").map((char, i) => (
								<motion.span
									key={i}
									initial={{ opacity: 0, y: 10 }}
									animate={
										i < typedCount
											? { opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.13 } }
											: { opacity: 0, y: 10 }
									}
								>
									{char}
								</motion.span>
							))}
						</div>
					)}

					{/* Step 2: Quick greetings */}
					<AnimatePresence>
						{step === 1 && greetIndex < greetings.length && (
							<motion.span
								key={greetings[greetIndex].lang}
								className="absolute text-white text-5xl md:text-7xl font-light"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0, transition: { duration: 0.09 } }}
								exit={{ opacity: 0, y: -10, transition: { duration: 0.09 } }}
							>
								{greetings[greetIndex].text}
							</motion.span>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</AnimatePresence>
	);
}