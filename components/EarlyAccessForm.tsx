"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type FormData = {
	name: string;
	email: string;
	phone: string;
	location: string;
};

export default function EarlyAccessForm() {
	const router = useRouter();
	const [data, setData] = useState<FormData>({
		name: "",
		email: "",
		phone: "",
		location: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		// Prepare the payload according to the required format
		const payload = {
			full_name: data.name,
			designation: data.location || "no-context",
			phone: data.phone,
			email: data.email,
		};

		try {
			const response = await fetch(
				"https://api.medbankr.ai/api/v1/waitlist/user",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);

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
				email: "",
				phone: "",
				location: "",
			});
		} catch (error) {
			console.error("Submission error:", error);
			toast.error("Failed to submit. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

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
					<h2 className="text-lg font-normal font-sequel mt-3">
						The smartest way to manage your health
					</h2>
					<p className="text-[#6C7278] text-sm mb-4">
						Get 6 months premium FREE + exclusive insider benefits.
					</p>
					<form onSubmit={handleSubmit} className="space-y-3 text-left">
						<label className="text-sm text-gray-600">Full Name</label>
						<input
							name="name"
							value={data.name}
							onChange={handleChange}
							required
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="Williams Ayedungbe"
						/>

						<label className="text-sm text-gray-600">Email Address</label>
						<input
							name="email"
							type="email"
							value={data.email}
							onChange={handleChange}
							required
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="williams@medbankr.com"
						/>

						<label className="text-sm text-gray-600">Phone Number</label>
						<input
							name="phone"
							value={data.phone}
							onChange={handleChange}
							required
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="Enter phone number"
						/>

						<label className="text-sm text-gray-600">Location (city)</label>
						<input
							name="location"
							value={data.location}
							onChange={handleChange}
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="Enter location"
						/>

						<button
							type="submit"
							disabled={isLoading}
							className="mt-2 w-full rounded-full py-3 bg-gradient-to-b from-[#3BE2AD] to-[#3BE2AD] text-black font-normal font-sequel disabled:opacity-50 disabled:cursor-not-allowed">
							{isLoading ? "Submitting..." : "Get Early Access"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
