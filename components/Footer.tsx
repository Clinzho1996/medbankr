// components/Footer.tsx
import {
	IconBrandFacebook,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandTelegram,
	IconBrandX,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="bg-white pt-[6%] mb-0">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600">
				{/* Contact Info */}
				<motion.div
					initial={{ opacity: 0, x: -40 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center md:text-left md:mb-0">
					<p className="mb-1">Questions?</p>
					<p className="font-bold font-sequel text-[#303030]">
						<a href="mailto:hello@medbankr.com" className="hover:underline">
							hello@medbankr.com
						</a>{" "}
						|<span className="ml-2">+234 909 000 0000</span>
					</p>
				</motion.div>

				{/* Social Links */}
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
					className="flex flex-col sm:flex-row space-x-4 items-center mt-4 sm:mt-0">
					<p className="text-[#303030]">Follow our journey: </p>
					<div className="flex flex-row justify-center items-center h-[50px] gap-2 md:gap-3 rounded-full w-fit sm:w-auto">
						<Link
							href="https://www.x.com/medbankr"
							className="bg-[#3AE2AD] p-2 rounded-full shadow shadow-[#EBEBEB]">
							<IconBrandX color="white" />
						</Link>
						<Link
							href="https://www.instagram.com/medbankr"
							className="bg-[#3AE2AD] p-2 rounded-full shadow shadow-[#EBEBEB]">
							<IconBrandInstagram color="white" />
						</Link>
						<Link
							href="https://www.facebook.com/medbankr"
							className="bg-[#3AE2AD] p-2 rounded-full shadow shadow-[#EBEBEB]">
							<IconBrandFacebook color="white" />
						</Link>
						<Link
							href="https://www.telegram.com/medbankr"
							className="bg-[#3AE2AD] p-2 rounded-full shadow shadow-[#EBEBEB]">
							<IconBrandTelegram color="white" />
						</Link>
						<Link
							href="https://www.linkedin.com/medbankr"
							className="bg-[#3AE2AD] p-2 rounded-full shadow shadow-[#EBEBEB]">
							<IconBrandLinkedin color="white" />
						</Link>
					</div>
				</motion.div>
			</div>

			{/* Footer Bottom */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				viewport={{ once: true }}
				className="bg-gradient-to-b from-[#FFFFFF] to-[#173C3D] h-full px-[6%] pt-[4%] pb-[2%] border-4 border-white rounded-lg mt-6">
				<Image
					src="/images/footer.png"
					alt="Description of image"
					width={1920}
					height={300}
					className="object-cover opacity-10 sm:opacity-10 w-full h-full"
					objectFit="cover"
				/>
				<div className="mt-8 text-center text-gray-400 flex flex-col sm:flex-row justify-between items-center">
					<p className="text-white font-normal font-sequel">
						&copy; 2023 Medbankr. All rights reserved.
					</p>
					<p className="text-white font-normal font-sequel">
						Proudly built in Nigeria
					</p>
				</div>
			</motion.div>
		</footer>
	);
};

export default Footer;
