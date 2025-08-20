import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const FeatureCard: React.FC<{
	title: string;
	description: string;
	img: string;
	className?: string;
	delay?: number;
}> = ({ title, description, img, className = "", delay = 0 }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay }}
			viewport={{ once: true }}
			className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full flex flex-col ${className}`}>
			<div className="flex items-center mb-4">
				<h3 className="text-xl font-normal font-sequel text-[#161616]">
					{title}
				</h3>
			</div>
			<p className="text-[#6C7278] mb-4">{description}</p>
			<div className="w-full flex-1 relative min-h-[200px]">
				<Image src={img} alt="Feature Image" fill className="object-contain" />
			</div>
		</motion.div>
	);
};

const FeaturesGrid: React.FC = () => {
	return (
		<section className="bg-[#F7F7F8] py-[6%] px-4 sm:px-[4%]">
			<div className="container mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-8 gap-2 flex flex-col">
					<h2 className="text-3xl font-normal text-left font-sequel text-gray-900">
						Medbankr – Your Smarter Health Companion
					</h2>
					<p className="text-gray-600">
						What we offer:
					</p>
				</motion.div>

				<div className="gap-3 bg-gradient-to-b from-[#3AE2AD] to-[#173C3D] p-3 rounded-lg">
					{/* First row - taller cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
						<FeatureCard
							title="AI-Powered Health Vault"
							description="Securely store and manage all your medical records in one place."
							img="/images/vault.png"
							className="h-full min-h-[400px] md:h-[510px]"
							delay={0.1}
						/>
						<FeatureCard
							title="Intelligent Symptom Checker"
							description="Get instant insights into your symptoms and potential conditions."
							img="/images/symptoms.png"
							className="h-full min-h-[400px] md:h-[510px]"
							delay={0.2}
						/>
						<FeatureCard
							title="Smart Medication Tracker"
							description="Never miss a dose with timely reminders and medication logs."
							img="/images/chat.png"
							className="h-full min-h-[400px] md:h-[510px]"
							delay={0.3}
						/>
					</div>

					{/* Second row - shorter cards */}
					<div className="flex flex-col sm:flex-row gap-3 w-full">
						<div className="w-full sm:w-[66.5%]">
							<FeatureCard
								title="Specialist Connection"
								description="Connect with top healthcare specialists when you need them."
								img="/images/specialist.png"
								className="h-full min-h-[280px] md:h-[350px]"
								delay={0.4}
							/>
						</div>
						<div className="w-full sm:w-[32.5%]">
							<FeatureCard
								title="Health Insights"
								description="Get personalized health recommendations based on your data."
								img="/images/health.png"
								className="h-full min-h-[280px] md:h-[350px]"
								delay={0.5}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeaturesGrid;
