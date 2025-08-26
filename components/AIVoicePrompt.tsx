"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import EarlyAccessForm from "./EarlyAccessForm";
import Modal from "./Modal";

// ✅ Custom hook for native speech synthesis with natural voice
function useSpeechSynthesisNative() {
	const synthRef = useRef<SpeechSynthesis | null>(null);
	const [speaking, setSpeaking] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined" && "speechSynthesis" in window) {
			synthRef.current = window.speechSynthesis;
		}
	}, []);

	const speak = useCallback((text: string) => {
		if (!synthRef.current) return;

		synthRef.current.cancel();

		const utterance = new SpeechSynthesisUtterance(text);

		// Try different voices and settings
		const voices = synthRef.current.getVoices();
		const preferredVoice = voices.find(
			(voice) =>
				voice.name.includes("Google") ||
				voice.name.includes("Samantha") ||
				voice.name.includes("Karen") ||
				voice.lang.includes("en-GB")
		);

		if (preferredVoice) {
			utterance.voice = preferredVoice;
		}

		utterance.rate = 0.85; // Slower for more natural sound
		utterance.pitch = 1.1; // Slightly higher pitch
		utterance.volume = 0.8;

		utterance.onstart = () => setSpeaking(true);
		utterance.onend = () => setSpeaking(false);
		utterance.onerror = () => setSpeaking(false);

		setTimeout(() => {
			if (synthRef.current) {
				synthRef.current.speak(utterance);
			}
		}, 100);
	}, []);

	const cancel = useCallback(() => {
		if (synthRef.current) {
			synthRef.current.cancel();
			setSpeaking(false);
		}
	}, []);

	return { speak, cancel, speaking };
}

const MoodSelector = ({
	onSelect,
	onClose,
}: {
	onSelect: (mood: string) => void;
	onClose: () => void;
}) => {
	const moods = [
		{ emoji: "😊", label: "Feeling great" },
		{ emoji: "😕", label: "A bit off" },
		{ emoji: "🤒", label: "Not feeling well" },
		{ emoji: "😵", label: "Confused about my symptoms" },
	];

	return (
		<div className="fixed bottom-8 right-8 flex flex-col items-end gap-2 z-50">
			<motion.div
				initial={{ opacity: 0, y: 20, scale: 0.9 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ type: "spring", damping: 20 }}
				className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-sm relative">
				<div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-medium">How are you feeling today?</h3>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700">
						✕
					</button>
				</div>
				<div className="grid grid-cols-2 gap-3">
					{moods.map((mood) => (
						<motion.button
							key={mood.label}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => onSelect(mood.label)}
							className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
							<span className="text-3xl mb-1">{mood.emoji}</span>
							<span className="text-sm">{mood.label}</span>
						</motion.button>
					))}
				</div>
			</motion.div>

			<motion.div
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				className="w-12 h-12 bg-[#38E1AC] rounded-full flex items-center justify-center shadow-md cursor-pointer">
				<Image
					src="/images/aichat.png"
					alt="AI Assistant"
					width={50}
					height={50}
					className="object-contain"
				/>
			</motion.div>
		</div>
	);
};

const AIResponse = ({
	response,
	onClose,
}: {
	response: string;
	onClose: () => void;
}) => {
	const { speak, cancel } = useSpeechSynthesisNative();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		speak(response);
		return () => cancel();
	}, [response, speak, cancel]);

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0 }}
				className="fixed bottom-8 right-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200 z-50 max-w-sm">
				<div className="mb-4">
					<p className="text-gray-700">{response}</p>
				</div>
				<button
					onClick={() => {
						cancel();
						setOpen(true);
					}}
					className="w-full bg-[#38E1AC] text-black py-2 px-4 rounded-lg hover:bg-[#2ec99c] transition-colors">
					Get Early Access
				</button>
			</motion.div>
			<Modal
				isOpen={open}
				onClose={() => {
					cancel();
					setOpen(false);
					onClose();
				}}>
				<EarlyAccessForm />
			</Modal>
		</>
	);
};

export const AIVoicePrompt = () => {
	const [showPrompt, setShowPrompt] = useState(false);
	const [selectedMood, setSelectedMood] = useState<string | null>(null);
	const [userInteracted, setUserInteracted] = useState(false);
	const { speak, speaking, cancel } = useSpeechSynthesisNative();
	const hasSpoken = useRef(false);
	const scrollTriggered = useRef(false);

	const responses = {
		"Feeling great":
			"That's wonderful to hear! Keep it up, and remember — prevention is better than cure.",
		"A bit off":
			"Thanks for sharing. Sometimes, it helps to track how you feel over time. We're working on something to help with that.",
		"Not feeling well":
			"I'm sorry you're feeling that way. I'd love to help, but I'm still learning. I'll be here for you when we launch!",
		"Confused about my symptoms":
			"It can be overwhelming sometimes. But you're not alone. I'll be ready soon to help you make sense of your symptoms.",
	};

	// Add user interaction detection
	useEffect(() => {
		const handleUserInteraction = () => {
			setUserInteracted(true);
			window.removeEventListener("click", handleUserInteraction);
			window.removeEventListener("touchstart", handleUserInteraction);
			window.removeEventListener("keydown", handleUserInteraction);
		};

		window.addEventListener("click", handleUserInteraction);
		window.addEventListener("touchstart", handleUserInteraction);
		window.addEventListener("keydown", handleUserInteraction);

		return () => {
			window.removeEventListener("click", handleUserInteraction);
			window.removeEventListener("touchstart", handleUserInteraction);
			window.removeEventListener("keydown", handleUserInteraction);
		};
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300 && !scrollTriggered.current) {
				scrollTriggered.current = true;
				setShowPrompt(true);

				cancel();
				if (!hasSpoken.current && userInteracted) {
					speak("Hi there! How are you feeling today?");
					hasSpoken.current = true;
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			cancel();
		};
	}, [speak, cancel, userInteracted]);

	const handleMoodSelect = (mood: string) => {
		setSelectedMood(mood);
		setShowPrompt(false);
		cancel();
	};

	const handleClose = () => {
		setShowPrompt(false);
		setSelectedMood(null);
		cancel();
	};

	return (
		<AnimatePresence>
			{showPrompt && !selectedMood && (
				<MoodSelector onSelect={handleMoodSelect} onClose={handleClose} />
			)}
			{selectedMood && (
				<AIResponse
					response={responses[selectedMood as keyof typeof responses]}
					onClose={handleClose}
				/>
			)}
			{speaking && (
				<div className="fixed top-4 right-4 w-6 h-6 bg-[#38E1AC] rounded-full flex items-center justify-center animate-pulse z-50">
					<svg
						className="w-3 h-3 text-white"
						fill="currentColor"
						viewBox="0 0 20 20">
						<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
						<path
							fillRule="evenodd"
							d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			)}
		</AnimatePresence>
	);
};
