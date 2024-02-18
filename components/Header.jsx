import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect, useContext } from "react";
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

	const [isScrolled, setIsScrolled] = useState(false);
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 0);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const userInfoFromCookies = Cookies.get("userInfo");
		if (userInfoFromCookies) {
			setUserInfo(JSON.parse(userInfoFromCookies));
		}
	}, []);

	const logOutHandler = () => {
		dispatch({ type: "USER_LOGOUT" });
		["userInfo", "cartItems", "shippingAddress"].forEach(Cookies.remove);
		setUserInfo(null);
		router.push("/");
	};

	if (router.pathname === "/login" || router.pathname === "/register") {
		return null;
	}

	const headerStyle = {
		top: isTopBannerVisible ? "30px" : "0px",
		zIndex: 10,
	};

	const headerClass = `fixed top-0 left-0 z-50 w-full flex items-center justify-between gap-[10px] md:gap-[20px] bg-primary font-mono px-4 shadow-sm ${
		isScrolled ? "py-0 border-b border-gray-200 shadow-md" : "py-2.5"
	}`;

	const logoClass = `content-fill ${
		isScrolled ? "w-[90px]" : "w-[150px]"
	} flex-initial`;

	return (
		<div style={headerStyle} className={headerClass}>
			<nav className="flex items-center justify-between w-full">
				<Link href="/" passHref legacyBehavior>
					<a className="flex items-center justify-center mx-auto">
						{router.pathname === "/" && typeof window !== "undefined" ? (
							<motion.div
								animate={{ x: 0, rotate: 0 }}
								initial={{ x: -100, rotate: -10 }}
								transition={{ duration: 2 }}
							>
								<Image
									src={simpleLogo}
									alt="logo"
									width={isScrolled ? 90 : 150}
									height={isScrolled ? 90 : 150}
								/>
							</motion.div>
						) : (
							<Image
								src={simpleLogo}
								alt="logo"
								width={isScrolled ? 90 : 150}
								height={isScrolled ? 90 : 150}
							/>
						)}
					</a>
				</Link>
				<div className="flex items-center justify-end flex-1 pr-8">
					{userInfo ? (
						<Menu as="div" className="relative inline-block text-left">
							<Menu.Button className="inline-flex justify-center rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
								<UserCircleIcon className="w-6 h-6 xl:w-10 xl:h-10 hover:text-[#caafa8]" />
							</Menu.Button>
							{/* Menu.Items and Menu.Item components */}
						</Menu>
					) : (
						<Link href="/login" passHref>
							<p className="w-[5rem] p-2 hover-underline-animation text-sm">
								Log In
							</p>
						</Link>
					)}
					<MagnifyingGlassIcon className="w-6 h-6 xl:w-10 xl:h-10 hover:text-[#caafa8] mx-4" />
					<Link href="/cart" passHref>
						<a className="inline-flex items-center">
							<ShoppingBagIcon className="w-6 h-6 xl:w-10 xl:h-10 hover:text-[#caafa8]" />
						</a>
					</Link>
					<Menu as="div" className="relative inline-block text-left sm:hidden">
						<Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							<Bars3Icon
								className="w-8 h-8 mt-3 hover:text-[#caafa8]"
								aria-hidden="true"
							/>
						</Menu.Button>
						<Menu.Items className="absolute right-0 mt-2 w-[10rem] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
							{navLinks.map((link) => (
								<Menu.Item key={link.id} as={Fragment}>
									{({ active }) => (
										<Link href={`/${link.id}`} passHref>
											<a
												className={`${
													active
														? "bg-primary text-white"
														: "bg-white text-slate-800"
												} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
											>
												{link.title}
											</a>
										</Link>
									)}
								</Menu.Item>
							))}
						</Menu.Items>
					</Menu>
				</div>
			</nav>
		</div>
	);
};

export default Header;
