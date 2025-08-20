import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import CombinedRegistrationForm from "./CombinedRegistrationForm";
import Modal from "./Modal";

const ProviderSection: React.FC = () => {
	const [open, setOpen] = useState(false);

	return (
		<section className="bg-gray-100 py-[6%] px-4 sm:px-12 text-center mt-4">
			<Modal isOpen={open} onClose={() => setOpen(false)}>
				<CombinedRegistrationForm />
			</Modal>

			{/* Title & Description */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="flex flex-col justify-center w-full sm:w-[40%] mx-auto mb-8 gap-3">
				<h2 className="text-3xl font-normal font-sequel text-gray-900">
					For Healthcare Providers
				</h2>
				<p className="text-[#6C7278] font-normal font-sequel">
					Join Medbankr to connect with patients at the moment they need you
					most.
				</p>
			</motion.div>

			{/* Content Container */}
			<div
				className="container mx-auto p-4 rounded-lg shadow-lg border border-[#E2E4E9]"
				style={{ backgroundColor: "#EFF1F5" }}>
				<div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
					{/* Text Content Card */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="w-full md:w-[66%] bg-white p-2 rounded-lg h-full sm:h-[250px]">
						<div className="text-left bg-gradient-to-r from-[#183c3c] to-[#5b9087] p-6 rounded-lg w-full h-full flex flex-col justify-center">
							<h3 className="sm:text-[32px] text-[24px] text-white font-sequel font-normal mb-2">
								Join Nigeria&apos;s Most Trusted Health Network
							</h3>
							<p className="text-white mb-6 text-sm pr-0 sm:pr-20">
								The Specialist Provider form is different from the User Waitlist
								form. The Provider form is specifically for specialists,
								hospitals, and diagnostic labs, while the Waitlist form is for
								users eager to experience Medbankr.”
							</p>
							<button
								className="mt-4 bg-[#38E1AC] text-black font-normal font-sequel py-3 px-6 rounded-full hover:bg-emerald-600 transition-colors w-fit shadow-lg shadow-[#38E1AC33]"
								onClick={() => setOpen(true)}>
								Get Early Access
							</button>
						</div>
					</motion.div>

					{/* Image Card */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						viewport={{ once: true }}
						className="w-full md:w-[33%] bg-white p-2 rounded-lg h-[250px]">
						<div className="relative w-full h-full">
							<Image
								src="/images/avatars.png"
								alt="Healthcare Providers"
								fill
								className="object-contain rounded-lg"
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ProviderSection;
