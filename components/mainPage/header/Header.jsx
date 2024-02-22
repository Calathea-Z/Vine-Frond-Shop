import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect, useContext } from "react"; // Combined import statements for React
import { simpleLogo } from "@/public/assets";
import { navLinks } from "@/constants";
import { motion } from "framer-motion";
import { Menu } from "@headlessui/react";
import {
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	Bars3Icon,
	UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";

const Header = ({ isTopBannerVisible }) => {
	const { dispatch } = useContext(Store);
	const router = useRouter();

	const [active, setActive] = useState(""); // State for managing active link
	const [userInfo, setUserInfo] = useState(null);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 150);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const headerStyle = {
		top: isTopBannerVisible ? "30px" : "0px",
		zIndex: 10,
	};

	// Adjust the headerClass to change the vertical padding based on isScrolled
	const headerClass = `w-full flex items-center justify-between gap-[10px] md:gap-[20px] bg-primary font-mono px-4 shadow-sm ${
		isScrolled ? "py-0" : "py-2.5"
	} ${isScrolled ? "border-b border-gray-200 shadow-md" : ""}`;

	const logoClass = `content-fill ${
		isScrolled ? "w-[90px]" : "w-[150px]"
	} flex-initial`;

	// Handler for logging out the user
	const logOutHandler = () => {
		dispatch({ type: "USER_LOGOUT" });
		Cookies.remove("userInfo");
		Cookies.remove("cartItems");
		Cookies.remove("shippingAddress");
		setUserInfo(null);
	};

	// Effect hook to update user info from cookies
	useEffect(() => {
		const userInfoFromCookies = Cookies.get("userInfo");
		setUserInfo(userInfoFromCookies ? JSON.parse(userInfoFromCookies) : null);
	}, []);

	// Prevent rendering on login and register pages
	if (router.pathname === "/login" || router.pathname === "/register") {
		return null;
	}

	const renderLogoImage = (
		<Image src={simpleLogo} alt="Vine & Frond logo" className={logoClass} />
	);

	return (
		<div className="fixed top-0 left-0 z-50 w-full" style={headerStyle}>
			<nav className={headerClass}>
				<div className="flex-1 flex items-center justify-start">
					<ul className="list-none hidden sm:flex flex-row gap-6">
						{navLinks.map((link) => (
							<li
								key={link.id}
								className={`${
									router.pathname === `/${link.id}`
										? isScrolled
											? "bg-primary rounded-md text-[12px] text-emerald-600" // Smaller size when scrolled
											: "bg-primary rounded-md text-lg text-emerald-600" // Larger size when not scrolled
										: ""
								} hover-underline-animation font-thin ${
									isScrolled ? "text-[13px]" : "text-[18px] xl:text-[20px]"
								} cursor-pointer`}
								onClick={() => setActive(link.title)}
							>
								<Link href={`/${link.id}`} legacyBehavior>
									{link.title}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<Link href="/" className="flex items-center justify-center mx-auto">
					{router.pathname === "/" && typeof window !== "undefined" ? (
						<motion.div
							animate={{ x: 0, rotate: 0 }}
							initial={{ x: -100, rotate: -10 }}
							transition={{ duration: 2 }} // Increased duration for slower animation
						>
							{renderLogoImage}
						</motion.div>
					) : (
						<div>{renderLogoImage}</div>
					)}
				</Link>

				{/* Right section with user and cart icons unchanged */}
				<div className="flex-1 flex items-center justify-end -translate-x-5">
					<ul className="list-none hidden sm:flex flex-row gap-6">
						<li className="flex items-center">
							<Link
								href="/search"
								className={`inline-flex items-center ${
									isScrolled
										? "bg-primary rounded-md text-[12px]" // Smaller size when scrolled
										: "bg-primary rounded-md text-lg" // Larger size when not scrolled
								} hover-underline-animation font-thin ${
									isScrolled ? "text-[13px]" : "text-[18px] xl:text-[20px]"
								} cursor-pointer text-black`}
							>
								<span className="flex items-center">
									<MagnifyingGlassIcon
										className={`${isScrolled ? "h-4 w-4" : "h-5 w-5"} mr-1`}
									/>
									<span>Search</span>
								</span>
							</Link>
						</li>
						<li>
							<Link
								href={userInfo ? "/account" : "/login"}
								className={`inline-flex items-center ${
									isScrolled
										? "bg-primary rounded-md text-[12px]" // Smaller size when scrolled
										: "bg-primary rounded-md text-lg" // Larger size when not scrolled
								} hover-underline-animation font-thin ${
									isScrolled ? "text-[13px]" : "text-[18px] xl:text-[20px]"
								} cursor-pointer text-black`}
							>
								Account
							</Link>
						</li>
						<li>
							<Link
								href="/cart"
								className={`inline-flex items-center ${
									isScrolled
										? "bg-primary rounded-md text-[12px]" // Smaller size when scrolled
										: "bg-primary rounded-md text-lg" // Larger size when not scrolled
								} hover-underline-animation font-thin ${
									isScrolled ? "text-[13px]" : "text-[18px] xl:text-[20px]"
								} cursor-pointer text-black`}
								passHref
							>
								Cart (0)
							</Link>
						</li>
					</ul>
					<div className="sm:hidden flex flex-1 justify-end items-center w-full z-50">
						<Menu as="div" className="relative inline-block text-left z-50">
							<Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
								<Bars3Icon className="w-8 h-8 mt-3 hover:text-[#caafa8] aria-hidden:true" />
							</Menu.Button>

							<Menu.Items className="absolute right-0 mt-2 w-[10rem] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
								{navLinks.map((link) => (
									<Menu.Item key={link.id} as={Fragment}>
										{({ active }) => (
											<Link
												href={`/${link.id}`}
												className={`${
													active
														? "bg-primary text-white"
														: "bg-white text-slate-800"
												} group flex w-full items-center rounded-md px-2 py-2 text-sm z-50`}
											>
												{link.title}
											</Link>
										)}
									</Menu.Item>
								))}
							</Menu.Items>
						</Menu>
					</div>
				</div>
			</nav>
		</div>
	);
};
export default Header;
