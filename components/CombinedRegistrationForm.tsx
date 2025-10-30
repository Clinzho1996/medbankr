"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type FormData = {
	name: string;
	designation: string;
	phone: string;
	email: string;
	type: "hospital" | "diagnostic" | "";
	hospitalName: string;
	hospitalAddress: string;
	specialization: string;
	labName: string;
	labAddress: string;
};

export default function CombinedRegistrationForm() {
	const router = useRouter();
	const [data, setData] = useState<FormData>({
		name: "",
		designation: "",
		phone: "",
		email: "",
		type: "",
		hospitalName: "",
		hospitalAddress: "",
		specialization: "",
		labName: "",
		labAddress: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			let payload;
			let endpoint;

			if (data.type === "hospital") {
				// Hospital payload
				payload = {
					full_name: data.name,
					designation: data.designation || "no-context",
					phone: data.phone,
					email: data.email,
					hospital_name: data.hospitalName,
					hospital_address: data.hospitalAddress,
					specialization: data.specialization,
				};
				endpoint = "https://api.medbankr.ai/api/v1/waitlist/hospital";
			} else if (data.type === "diagnostic") {
				// Diagnostic center payload
				payload = {
					full_name: data.name,
					designation: data.designation || "no-context",
					phone: data.phone,
					email: data.email,
					lab_name: data.labName,
					lab_address: data.labAddress,
					specialization: data.specialization,
				};
				endpoint = "https://api.medbankr.ai/api/v1/waitlist/diagnostic";
			} else {
				throw new Error("Please select a facility type");
			}

			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			console.log("Success:", result);

			// Show success toast
			router.push("/success");

			// Reset form
			setData({
				name: "",
				designation: "",
				phone: "",
				email: "",
				type: "",
				hospitalName: "",
				hospitalAddress: "",
				specialization: "",
				labName: "",
				labAddress: "",
			});
		} catch (error) {
			console.error("Registration error:", error);
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to register. Please try again.";
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const specializations = [
		"Cardiology",
		"Neurology",
		"Oncology",
		"Nephrology",
		"Orthopedics",
		"Gynecology",
		"Fertility",
		"Urology",
		"Others",
	];

	return (
		<div className="p-4 bg-white">
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 4000,
					style: {
						background: "#363636",
						color: "#fff",
					},
					success: {
						duration: 3000,
						iconTheme: {
							primary: "#3BE2AD",
							secondary: "#fff",
						},
					},
					error: {
						duration: 4000,
						iconTheme: {
							primary: "#ff4d4f",
							secondary: "#fff",
						},
					},
				}}
			/>

			<div className="rounded-xl p-4 bg-[#EFF1F5] w-full text-center border border-[#E2E4E9]">
				<div className="bg-white p-6 rounded-lg">
					<div className="mx-auto">
						<Image
							src="/images/popup.png"
							alt="avatars"
							width={500}
							height={300}
							className="w-full h-full"
						/>
					</div>
					<h2 className="text-xl font-normal font-sequel mt-3">
						Hospital & Diagnostic Center Registration
					</h2>
					<p className="text-[#6C7278] text-sm mb-4">
						Register your healthcare facility with us
					</p>
					<form onSubmit={handleSubmit} className="space-y-3 text-left">
						{/* Common Fields */}
						<label className="text-sm text-gray-600">Your Name *</label>
						<input
							name="name"
							value={data.name}
							onChange={handleChange}
							required
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="Enter your full name"
						/>

						<label className="text-sm text-gray-600">Your Designation</label>
						<input
							name="designation"
							value={data.designation}
							onChange={handleChange}
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="Enter your designation"
						/>

						<label className="text-sm text-gray-600">Your Phone Number *</label>
						<input
							name="phone"
							value={data.phone}
							onChange={handleChange}
							required
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="Enter phone number"
						/>

						<label className="text-sm text-gray-600">
							Your Email Address *
						</label>
						<input
							name="email"
							type="email"
							value={data.email}
							onChange={handleChange}
							required
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="Enter email address"
						/>

						<label className="text-sm text-gray-600">Facility Type *</label>
						<select
							name="type"
							value={data.type}
							onChange={handleChange}
							required
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2">
							<option value="">Select facility type</option>
							<option value="hospital">Hospital</option>
							<option value="diagnostic">Diagnostic Center</option>
						</select>

						{/* Hospital-specific fields */}
						{data.type === "hospital" && (
							<>
								<label className="text-sm text-gray-600">
									Name of the Hospital *
								</label>
								<input
									name="hospitalName"
									value={data.hospitalName}
									onChange={handleChange}
									required
									className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
									placeholder="Enter hospital name"
								/>

								<label className="text-sm text-gray-600">Address *</label>
								<input
									name="hospitalAddress"
									value={data.hospitalAddress}
									onChange={handleChange}
									required
									className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
									placeholder="Enter hospital address"
								/>

								<label className="text-sm text-gray-600">
									Specialization *
								</label>
								<select
									name="specialization"
									value={data.specialization}
									onChange={handleChange}
									required
									className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2">
									<option value="">Select specialization</option>
									{specializations.map((spec) => (
										<option key={spec} value={spec}>
											{spec}
										</option>
									))}
								</select>
							</>
						)}

						{/* Diagnostic Center-specific fields */}
						{data.type === "diagnostic" && (
							<>
								<label className="text-sm text-gray-600">
									Name of the Lab *
								</label>
								<input
									name="labName"
									value={data.labName}
									onChange={handleChange}
									required
									className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
									placeholder="Enter lab name"
								/>

								<label className="text-sm text-gray-600">
									Head Office Address *
								</label>
								<input
									name="labAddress"
									value={data.labAddress}
									onChange={handleChange}
									required
									className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
									placeholder="Enter head office address"
								/>

								<label className="text-sm text-gray-600">
									Specialization *
								</label>
								<select
									name="specialization"
									value={data.specialization}
									onChange={handleChange}
									required
									className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2">
									<option value="">Select specialization</option>
									{specializations.map((spec) => (
										<option key={spec} value={spec}>
											{spec}
										</option>
									))}
								</select>
							</>
						)}

						<button
							type="submit"
							disabled={isLoading}
							className="mt-2 w-full rounded-full py-3 bg-gradient-to-b from-[#3BE2AD] to-[#3BE2AD] text-black font-normal font-sequel disabled:opacity-50 disabled:cursor-not-allowed">
							{isLoading ? "Registering..." : "Register Facility"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
