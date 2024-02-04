import Link from "next/link";
import Image from "next/image";
import { simpleLogo } from "@/public/assets";
import { SocialIcon } from "react-social-icons";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const Footer = () => {
	const router = useRouter(); // Initializing useRouter hook

	// Function to render the logo image
	const renderLogoImage = () => {
		return (
			<Image
				src={simpleLogo}
				alt="simple logo"
				width={150}
				height={150}
				className="sm:translate-y-3"
			/>
		);
	};

	// Function to render social media icons, accepts iconSize as parameter
	const renderSocialIcons = (iconSize) => {
		return (
			<div
				className={`hidden sm:p-3 self-center mt-5 mr-3 sm:flex sm:gap-5 ${iconSize}`}
			>
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
	};

	// Conditional rendering based on the current route
	if (router.pathname === "/login" || router.pathname === "/register") {
		return (
			<Link href="/">
				<div className="bg-[#fdf9f5] flex justify-center items-center w-full bottom-0 left-0 right-0 relative py-0.5">
					{renderLogoImage()} // Render logo image for login or register page
				</div>
			</Link>
		);
	}
	// Default return for other pages
	return (
		<div className="bg-secondary flex flex-col justify-center items-center sm:px- sm:py-1 w-full bottom-0 left-0 right-0 relative">
			<div className="flex flex-col sm:flex-row justify-between items-center w-full py-4">
				{/* Logo */}
				<div className="flex justify-center items-center">
					{renderLogoImage()} // Render logo image
				</div>

				{/* Newsletter Subscribe Form */}
				<div className="w-full flex justify-center items-center">
					<form className="w-[20%] bg-pink-900 p-4 rounded-md flex items-center justify-center gap-5 text-white hover:bg-pink-900/90 transition-colors duration-300">
						<input
							type="email"
							name="email"
							placeholder="Enter your email for updates!"
							className="w-3/4 bg-transparent border-none text-sm self-center focus:ring-0 focus:rounded-sm focus:outline-none text-white font-sans p-2 placeholder-white"
						/>
						<button className=" rounded-lg bg-transparent border-transparent border-[1px] px-1  hover:bg-pink-700 transition-colors duration-300 flex justify-center">
							<EnvelopeIcon className="w-5 h-5" /> // Email icon button
						</button>
					</form>
				</div>

				{/* Social Icons for different screen sizes */}
				<div className="hidden sm:p-3 self-center mt-5 mr-3 sm:flex sm:gap-5">
					{renderSocialIcons(50)} // Render larger social icons for sm screens
					and up
				</div>

				<div className=" sm:hidden p-1 sm:p-3 flex gap-3 sm:gap-5">
					{renderSocialIcons(40)} // Render smaller social icons for xs screens
				</div>
			</div>

			{/* Horizontal Line for visual separation */}
			<div className="hidden sm:flex w-full border border-white justify-center items-center" />

			{/* Navigation Links for site navigation */}
			<div className="flex justify-between w-full">
				{/* Site Navigation Links */}
				<div className="sm:flex justify-between items-center sm:p-5 text-md sm:text-md sm:gap-2 hidden">
					<Link href="/#" className="hover-underline-animation">
						Home
					</Link>
					<Link href="/contact" className="hover-underline-animation">
						Contact
					</Link>
					<Link href="/shipping" className="hover-underline-animation">
						Shipping
					</Link>
					<Link href="/faq" className="hover-underline-animation">
						FAQ
					</Link>
				</div>

				{/* Link to Calathea Designs */}
				<div className="flex mx-auto sm:mx-0 items-center p-1 sm:p-3 text-xs sm:text-md space-x-2 sm:gap-2">
					<Link
						href="https://zach-sykes.com"
						className="text-[.9rem] hover-underline-animation font-sans"
					>
						Website Design by Calathea Designs
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Footer;
