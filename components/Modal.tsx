"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export default function Modal({
	isOpen,
	onClose,
	children,
}: {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}>
					<motion.div
						className="bg-white rounded-2xl py-6 w-full max-w-md shadow-lg relative"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.25 }}>
						<button
							onClick={onClose}
							className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
							✕
						</button>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
