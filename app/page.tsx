"use client";

import { useState } from "react";
import EarlyAccessForm from "../components/EarlyAccessForm";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Modal from "../components/Modal";
import Providers from "../components/Providers";

export default function Page() {
	const [open, setOpen] = useState(false);
	return (
		<main>
			<div className=" bg-[url('/images/bg.png')] bg-cover bg-center h-full">
				<Header />
				<Hero />
			</div>
			<Features />
			<Providers />
			<Footer />

			<Modal isOpen={open} onClose={() => setOpen(false)}>
				<EarlyAccessForm />
			</Modal>
		</main>
	);
}
