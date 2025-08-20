"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export default function Modal({
	isOpen,
	onClose,
	children,
	maxHeight = "90vh", // Default max height
}: {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	maxHeight?: string;
}) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					onClick={onClose}>
					<motion.div
						className="bg-white rounded-2xl w-full max-w-md shadow-lg relative flex flex-col mx-4" // Added flex-col
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.25 }}
						onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
						style={{ maxHeight: maxHeight }} // Set max height
					>
						{/* Close button */}
						<button
							onClick={onClose}
							className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
							aria-label="Close modal">
							✕
						</button>

						{/* Scrollable content area */}
						<div className="overflow-y-auto flex-1 p-6">{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
