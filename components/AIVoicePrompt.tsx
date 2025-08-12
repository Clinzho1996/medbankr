"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import EarlyAccessForm from "./EarlyAccessForm";
import Modal from "./Modal";

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
			{/* Chat bubble */}
			<motion.div
				initial={{ opacity: 0, y: 20, scale: 0.9 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ type: "spring", damping: 20 }}
				className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-sm relative">
				{/* Chat bubble pointer */}
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

			{/* AI Chat icon */}
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
	const { speak, cancel } = useSpeechSynthesis();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		speak({ text: response });
	}, [response, speak]);

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
					setOpen(false);
					onClose();
				}}>
				<EarlyAccessForm />
			</Modal>{" "}
		</>
	);
};

export const AIVoicePrompt = () => {
	const [showPrompt, setShowPrompt] = useState(false);
	const [selectedMood, setSelectedMood] = useState<string | null>(null);
	const { speak, speaking, cancel } = useSpeechSynthesis();
	const hasSpoken = useRef(false);
	const scrollTriggered = useRef(false);

	const responses = {
		"Feeling great":
			"That's wonderful to hear! Keep it up, and remember, prevention is better than cure.",
		"A bit off":
			"Thanks for sharing. Sometimes, it helps to track how you feel over time — we're working on something to help with that.",
		"Not feeling well":
			"I'm sorry you're feeling that way. I'd love to help, but I'm still learning. I'll be here for you when we launch!",
		"Confused about my symptoms":
			"It can be overwhelming sometimes. But you're not alone. I'll be ready soon to help you make sense of your symptoms.",
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300 && !scrollTriggered.current) {
				scrollTriggered.current = true;
				setShowPrompt(true);

				// Cancel any existing speech and speak only if not already spoken
				cancel();
				if (!hasSpoken.current) {
					speak({ text: "Hi there! How are you feeling today?" });
					hasSpoken.current = true;
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			cancel(); // Clean up speech on unmount
		};
	}, [speak, cancel]);

	const handleMoodSelect = (mood: string) => {
		setSelectedMood(mood);
		setShowPrompt(false);
		cancel(); // Cancel any ongoing speech
	};

	const handleClose = () => {
		setShowPrompt(false);
		setSelectedMood(null);
		cancel(); // Cancel any ongoing speech
	};

	{
		speaking && (
			<div className="absolute top-2 right-2 animate-pulse">
				<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
					<path
						fillRule="evenodd"
						d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
		);
	}

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
		</AnimatePresence>
	);
};
