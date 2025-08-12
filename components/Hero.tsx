import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import EarlyAccessForm from "./EarlyAccessForm";
import Modal from "./Modal";

const container: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.4,
		},
	},
};

const item: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.16, 0.5, 0.4, 0.5],
		},
	},
};

const Hero: React.FC<{ openModal?: () => void }> = ({ openModal }) => {
	const [open, setOpen] = useState(false);

	return (
		<motion.div
			initial="hidden"
			animate="show"
			variants={container}
			className="pt-20 md:pt-32 pb-12 md:pb-20 text-center bg-transparent w-full px-4 md:w-[77%] mx-auto">
			<Modal isOpen={open} onClose={() => setOpen(false)}>
				<EarlyAccessForm />
			</Modal>

			{/* Waiting users badge */}
			<motion.div
				variants={item}
				className="flex flex-row items-center justify-center gap-2 md:gap-3 border border-[#59E6BA] rounded-full w-fit p-1 md:p-2 mx-auto bg-[#FAFAFA]">
				<Image
					src="/images/avatar.png"
					alt="Hero Image"
					width={100}
					height={40}
					className="rounded-full w-18 h-8 md:w-20 md:h-10"
				/>
				<p className="text-xs md:text-base">5,247 Nigerians already waiting</p>
			</motion.div>

			{/* Main heading */}
			<motion.h1
				variants={item}
				className="text-4xl md:text-[68px] font-bold text-gray-900 mb-4 font-sequel leading-[48px] md:leading-[80px] mt-6 md:mt-0">
				Your AI Health Companion – Smarter Care, Fewer Worries
			</motion.h1>

			{/* Subheading */}
			<motion.p
				variants={item}
				className="mb-8 font-sequel font-normal text-[#6C7278] w-full text-sm md:text-base px-2 sm:w-[90%] md:w-[60%] mx-auto">
				Nigeria&apos;s first AI-powered health vault that stores your records,
				checks symptoms, tracks meds, and connects you to top specialists – all
				in one place
			</motion.p>

			{/* Buttons row */}
			<motion.div
				variants={item}
				className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 sm:space-x-4 px-4">
				{/* App stores badge */}
				<motion.div
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="flex flex-row justify-center items-center h-[50px] gap-2 md:gap-3 bg-[#303030] rounded-full shadow-inner shadow-[#13131612] w-fit sm:w-auto">
					<p className="text-white text-xs md:text-sm font-sequel font-normal pl-4 md:pl-6">
						Coming Soon on
					</p>
					<div className="flex bg-white p-1 rounded-full m-1 md:m-2 items-center justify-center gap-1 md:gap-2">
						<Image
							src="/images/ios.png"
							alt="Apple Store"
							width={30}
							height={30}
							className="w-6 h-6 md:w-8 md:h-8"
						/>
						|{" "}
						<Image
							src="/images/android.png"
							alt="Google Play"
							width={30}
							height={30}
							className="w-6 h-6 md:w-8 md:h-8"
						/>
					</div>
				</motion.div>

				{/* Early access button */}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="bg-[#38E1AC] font-normal font-sequel text-black py-3 h-[50px] px-6 rounded-full hover:bg-gray-200 transition-colors shadow-inner shadow-[#38E1AC33] w-fit sm:w-auto text-sm md:text-base"
					onClick={() => setOpen(true)}>
					Get Early Access
				</motion.button>
			</motion.div>

			{/* Hero image */}
			<motion.div
				variants={item}
				whileHover={{ scale: 1.01 }}
				className="mt-8 md:mt-12 flex justify-center px-2">
				<Image
					src="/images/chatbot.png"
					alt="Hero Image"
					width={600}
					height={400}
					className="w-full max-w-[500px] md:max-w-[600px]"
				/>
			</motion.div>
		</motion.div>
	);
};

export default Hero;
