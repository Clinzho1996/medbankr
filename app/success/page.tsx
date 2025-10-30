"use client";

import { IconCaretRightFilled } from "@tabler/icons-react";
import Image from "next/image";

function FormSuccess() {
	return (
		<div className="w-full h-screen mx-auto flex flex-col justify-center items-center gap-3">
			<Image
				src="/images/success.png"
				alt="success"
				width={190}
				height={162}
				className="object-contain"
			/>
			<p className="text-primary text-xs lg:text-sm font-normal font-inter">
				Successfully submitted!
			</p>
			<p className="text-xs text-[#6B7280] font-inter font-light  text-center">
				Thank you for signing up for our Waitlist! You'll get early access soon.
			</p>
			<button
				className="bg-[#38E1AC] flex flex-row justify-center items-center gap-1 text-primary py-3 px-10 rounded-lg mt-4 w-fit cursor-pointer"
				onClick={() => (window.location.href = "/")}>
				<p className="text-xs lg:text-sm">Continue exploring Medbankr ai</p>
				<IconCaretRightFilled size={18} />
			</button>
		</div>
	);
}

export default FormSuccess;
