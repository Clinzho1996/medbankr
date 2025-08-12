// app/fonts.ts
import localFont from "next/font/local";

export const sequelFont = localFont({
	src: [
		{
			path: "../public/fonts/SequelLight.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/SequelBold.ttf",
			weight: "600",
			style: "bold",
		},
	],
	variable: "--sequel",
});
