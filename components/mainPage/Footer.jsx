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
		<div className="flex justify-center items-center w-full max-w-xs h-26">
			<Image
				src={simpleLogo}
				alt="simple logo"
				width={180}
				className="translate-y-1 translate-x-4"
				priority
				style={{ objectFit: "contain", layout: "responsive" }}
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
		<div className="bg-[#f2c88c] flex flex-col justify-center items-center py-10 md:py-0 w-full bottom-0 left-0 right-0 relative">
			<div className="flex justify-between items-center w-full">
				<div className="hidden md:flex">{renderLogoImage()}</div>

				<div className="w-full sm:w-auto flex justify-center mb-[3rem ]md:-mb-[3rem] translate-x-6">
					<form className="w-2/3 sm:w-full bg-white px-3 rounded-md flex items-center justify-between text-black">
						<div className="flex-grow relative">
							<label
								htmlFor="email"
								className="absolute -top-[3.5rem] left-5 mx-auto w-full text-center bg-none text-black font-amaticSC font-bold rounded-md px-2 py-1 hidden sm:text-4xl"
							>
								Get shop updates
							</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								className="w-full bg-white border-none rounded-l-md text-sm sm:text-3xl text-black font-amaticSC pl-4 pr-3 py-2 focus:ring-2 focus:ring-white focus:outline-none"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<button
							className="bg-white text-black rounded-r-md p-2 transition-colors duration-300"
							disabled={!email}
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="w-8 h-8"
							>
								<line x1="5" y1="12" x2="19" y2="12"></line>
								<polyline points="12 5 19 12 12 19"></polyline>
							</svg>
						</button>
					</form>
				</div>

				<div className="hidden sm:block mx-7 mt-7 mb-7">
					{renderSocialIcons(58)}
				</div>
				<div className="sm:hidden mx-7 mt-7 mb-7">{renderSocialIcons(30)}</div>
			</div>

			<div className="hidden sm:flex w-full border border-white justify-center items-center" />

			<div className="flex justify-between w-full">
				<div className="sm:flex justify-between items-center p-0 sm:gap-2 hidden translate-x-4">
					{isHomePage ? (
						<motion.div
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
							href="/"
							className="cursor-pointer font-sans font-semibold"
						>
							Home
						</motion.div>
					) : (
						<Link href="/" passHref>
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								className="cursor-pointer font-sans font-semibold"
							>
								Home
							</motion.div>
						</Link>
					)}
					<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<Link
							href="/contact"
							className="cursor-pointer font-sans font-semibold"
						>
							Contact
						</Link>
					</motion.div>
				</div>
				<div className="flex mx-auto sm:mx-0 items-end p-1 sm:p-3 text-xs sm:text-md space-x-2 sm:gap-2">
					<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<Link
							href="https://zach-sykes.com"
							target="_blank"
							rel="noopener noreferrer"
							className="cursor-pointer font-sans font-semibold text-[.6rem]"
						>
							Site Credit | Calathea Designs
						</Link>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
export default Footer;
