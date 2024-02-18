import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { simpleLogo } from "@/public/assets";
import { SocialIcon } from "react-social-icons";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Footer = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [isHomePage, setIsHomePage] = useState(false);

	useEffect(() => {
		// Check if the current page is the home page
		setIsHomePage(router.pathname === "/");
	}, [router.pathname]);

	const renderLogoImage = () => (
		<div className="flex justify-center items-center w-full">
			<Image
				src={simpleLogo}
				alt="simple logo"
				width={150}
				height={150}
				className="translate-y-3"
				priority
			/>
		</div>
	);

	const renderSocialIcons = (iconSize) => (
		<div className="flex gap-3">
			<SocialIcon
				url="https://www.instagram.com/vineandfrond/"
				fgColor="white"
				bgColor="black"
				className="hover:opacity-80"
				style={{ width: iconSize, height: iconSize }}
			/>
			<SocialIcon
				url="https://www.facebook.com/vineandfrondceramics"
				fgColor="white"
				bgColor="black"
				className="hover:opacity-80"
				style={{ width: iconSize, height: iconSize }}
			/>
			<SocialIcon
				url="https://www.tiktok.com/@vineandfrond"
				fgColor="white"
				bgColor="black"
				className="hover:opacity-80"
				style={{ width: iconSize, height: iconSize }}
			/>
		</div>
	);

	return (
		<div className="bg-[#f2c88c] flex flex-col justify-center items-center sm:py-1 w-full bottom-0 left-0 right-0 relative">
			<div className="flex flex-col sm:flex-row justify-between items-center w-full py-4">
				<div className="flex justify-center items-center sm:justify-start">
					{renderLogoImage()}
				</div>

				<div className="w-full sm:w-auto flex justify-center mt-8 sm:mt-0">
					<form className="w-full sm:w-auto border-2 bg-[#b8a597] p-4 rounded-md flex items-center justify-between gap-4 text-white hover:bg-[#9e9387]/90 transition-colors duration-300">
						<div className="relative w-auto flex-grow">
							<label
								htmlFor="email"
								className="absolute -top-[2.9rem] -left-[4.5rem] right-0 mx-auto w-max bg-[#f1ad4d]/20 text-black rounded-sm px-2 py-1 text-xs"
							>
								Get shop updates
							</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								className="w-full bg-transparent border border-white rounded-md text-sm text-[#f9f1e7] font-sans p-2 placeholder-white focus:ring-2 focus:ring-[#9e9387] focus:outline-none"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<button
							className="flex-shrink-0 bg-[#f9f1e7] hover:bg-[#b8a597] text-black rounded-lg border border-[#f9f1e7]] hover:border-[#d3b7a3] transition-colors duration-300 px-4 py-2"
							disabled={!email}
						>
							<EnvelopeIcon className="w-5 h-5" />
						</button>
					</form>
				</div>

				<div className="hidden sm:flex p-3 self-center mt-5 sm:mt-0">
					{renderSocialIcons(40)}
				</div>
			</div>

			<div className="hidden sm:flex w-full border border-white justify-center items-center" />

			<div className="flex justify-between w-full">
				<div className="sm:flex justify-between items-center sm:p-5 text-md sm:text-md sm:gap-2 hidden">
					{isHomePage ? (
						<motion.a
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
							href="/"
							className="cursor-pointer text-[.9rem] font-sans"
						>
							Home
						</motion.a>
					) : (
						<Link href="/" passHref>
							<motion.a
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								className="text-[.9rem] font-sans"
							>
								Home
							</motion.a>
						</Link>
					)}
					<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<Link href="/contact" className="text-[.9rem] font-sans">
							Contact
						</Link>
					</motion.div>
				</div>
				<div className="flex mx-auto sm:mx-0 items-center p-1 sm:p-3 text-xs sm:text-md space-x-2 sm:gap-2">
					<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<a
							href="https://zach-sykes.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[.9rem] font-sans"
						>
							Website Design by Calathea Designs
						</a>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
export default Footer;
