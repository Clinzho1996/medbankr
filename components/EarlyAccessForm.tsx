"use client";
import Image from "next/image";
import { useState } from "react";

export default function EarlyAccessForm() {
	const [data, setData] = useState({
		name: "",
		email: "",
		phone: "",
		location: "",
	});
	const handle = (e: any) =>
		setData({ ...data, [e.target.name]: e.target.value });
	const submit = (e: any) => {
		e.preventDefault();
		alert("submitted (dummy)");
	};

	return (
		<div className="p-4 bg-white">
			<div className="rounded-xl p-4 bg-[#EFF1F5] w-full text-center border border-[#E2E4E9]">
				<div className="bg-white p-6 rounded-lg">
					<div className="mx-auto ">
						<Image
							src="/images/popup.png"
							alt="avatars"
							width={500}
							height={300}
							className="w-full h-full"
						/>
					</div>
					<h2 className="text-xl font-normal font-sequel mt-3">
						Be Among Our First Users
					</h2>
					<p className="text-[#6C7278] text-sm mb-4">
						Get 6 months premium FREE + exclusive founding member benefits
					</p>
					<form onSubmit={submit} className="space-y-3 text-left">
						<label className="text-sm text-gray-600">Full Name</label>
						<input
							name="name"
							value={data.name}
							onChange={handle}
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="Williams Ayedungbe"
						/>

						<label className="text-sm text-gray-600">Email Address</label>
						<input
							name="email"
							value={data.email}
							onChange={handle}
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="williams@medbankr.com"
						/>

						<label className="text-sm text-gray-600">Phone Number</label>
						<input
							name="phone"
							value={data.phone}
							onChange={handle}
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="Enter phone number"
						/>

						<label className="text-sm text-gray-600">Location (city)</label>
						<input
							name="location"
							value={data.location}
							onChange={handle}
							className="w-full rounded-lg px-3 py-2 bg-[#F4F6F8] shadow-inner shadow-[#0000000D] text-sm mt-2"
							placeholder="Enter location"
						/>

						<button
							type="submit"
							className="mt-2 w-full rounded-full py-3 bg-gradient-to-b from-[#3BE2AD] to-[#3BE2AD] text-black font-normal font-sequel">
							Get Early Access
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
