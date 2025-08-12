// components/Header.tsx
import Image from "next/image";

export default function Header() {
	return (
		<header className="sticky top-10 py-6 max-w-6xl mx-auto p-4 flex items-center justify-center bg-white border border-[#3030301A] rounded-full w-[70%] shadow-md z-50">
			<Image
				src="/images/logo.png"
				alt="Medbankr Logo"
				width={130}
				height={40}
			/>
		</header>
	);
}
