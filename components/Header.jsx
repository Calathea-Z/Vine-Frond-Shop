import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { simpleLogo } from "@/public/assets";
import { navLinks } from "@/constants";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import jsCookie from "js-cookie";
import Cookies from "js-cookie";
import { Menu } from "@headlessui/react";
import {
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	Bars3Icon,
	UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Store } from "@/utils/Store";

const Header = () => {
	const { dispatch } = useContext(Store); // Using context to dispatch actions
	const [active, setActive] = useState(""); // State for managing active link
	const [userInfo, setUserInfo] = useState(null); // State for user information
	const [isScrolled, setIsScrolled] = useState(false); // State to check if page is scrolled
	const router = useRouter(); // Next.js router

	// Handler for logging out the user
	const logOutHandler = () => {
		dispatch({ type: "USER_LOGOUT" }); // Dispatching logout action
		jsCookie.remove("userInfo"); // Removing user info from cookies
		jsCookie.remove("cartItems"); // Removing cart items from cookies
		jsCookie.remove("shippingAddress"); // Removing shipping address from cookies
		setUserInfo(null); // Resetting user info state
	};

	// Effect hook to add and remove scroll event listener
	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 0;
			setIsScrolled(isScrolled);
		};

		document.addEventListener("scroll", handleScroll);
		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Effect hook to update user info from cookies
	useEffect(() => {
		setUserInfo(
			Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : null
		);
	}, []);

	// Prevent rendering on login and register pages
	if (router.pathname === "/login" || router.pathname === "/register") {
		return null;
	}

	// Function to render the logo image
	const renderLogoImage = (
		<Image
			src={simpleLogo}
			alt="Vine & Frond logo"
			className="content-fill w-[85px] min-w-[90px] h-[90px] sm:w-[140px] sm:min-w-[114px] sm:h-[140px] flex-initial"
		/>
	);

	// Main navigation component
	return (
		<nav
			className={`w-full fixed flex items-center justify-between gap-[10px] md:gap-[20px] bg-primary font-mono py-1 px-4 top-0 left-0 z-50 shadow-sm ${
				isScrolled ? "border-b border-gray-200 shadow-md" : ""
			}`}
		>
			{/* Left section with logo */}
			<Link
				href="/"
				className="flex items-center max-w-xl mx-auto justify-start"
			>
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

			{/* Middle section with navigation menu */}
			<div className="w-full space-x-4 flex items-center justify-center text-slate-600">
				<ul className="list-none hidden sm:flex flex-row gap-10">
					{navLinks.map((link) => (
						<li
							key={link.id}
							className={`${
								router.pathname === `/${link.id}` ? "bg-primary rounded-md" : ""
							} hover-underline-animation text-[18px] xl:text-[24px] cursor-pointer`}
							onClick={() => setActive(link.title)}
						>
							<Link href={`/${link.id}`}>{link.title}</Link>
						</li>
					))}
				</ul>
			</div>

			{/* Right section with user and cart icons */}
			<div className="flex items-center sm:pr-3 pr-5 sm:px-4 space-x-4 w-full justify-end">
				{userInfo ? (
					<div className="flex flex-1 justify-end items-center w-full z-50 mt-2">
						<Menu as="div" className="relative inline-block text-left z-50">
							<Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
								<UserCircleIcon className="w-6 h-6 xl:w-10 xl:h-10  aria-hidden:true hover:text-[#caafa8]" />
							</Menu.Button>

							<Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
								<Menu.Item>
									<h1 className="group flex w-full justify-center items-center px-2 py-2 text-sm z-50 bg-purple-400/90">
										{" "}
										Hi, {userInfo.firstName} !
									</h1>
								</Menu.Item>

								<Menu.Item>
									{({ active }) => (
										<Link
											href="/user/profile"
											className={`${
												active
													? "bg-primary text-white"
													: "bg-white text-slate-800"
											} group flex w-full items-center rounded-md px-2 py-2 text-sm z-50`}
										>
											Profile
										</Link>
									)}
								</Menu.Item>

								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active
													? "bg-primary text-white"
													: "bg-white text-slate-800"
											} group flex w-full items-center rounded-md px-2 py-2 text-sm z-50`}
											onClick={logOutHandler}
										>
											Log Out
										</button>
									)}
								</Menu.Item>
							</Menu.Items>
						</Menu>
					</div>
				) : (
					<Link
						href="/login"
						passHref
						className="w-[5rem] p-2 hover-underline-animation text-sm"
					>
						Log In
					</Link>
				)}

				<MagnifyingGlassIcon className="w-6 h-6 xl:w-10 xl:h-10 hover:text-[#caafa8]" />

				<Link href="/cart">
					<ShoppingBagIcon className="w-6 h-6 xl:w-10 xl:h-10 hover:text-[#caafa8]" />
				</Link>

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
	);
};
export default Header;
