"use client";
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
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
			<div className="bg-white rounded-2xl py-6 w-full max-w-md shadow-lg relative">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
					✕
				</button>
				{children}
			</div>
		</div>
	);
}
