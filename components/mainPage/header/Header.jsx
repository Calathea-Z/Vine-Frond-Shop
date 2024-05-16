import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { simpleLogo } from "@/public/assets";
import { navLinks } from "@/constants";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Store } from "@/utils/Store";
import { urlFor } from "@/utils/image.js";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import client from "@/utils/client";
import useScroll from "@/hooks/useScroll";

const Header = ({ isTopBannerVisible }) => {
	const { dispatch } = useContext(Store);
	const router = useRouter();
	const isScrolled = useScroll();

	const [active, setActive] = useState(""); // State for managing active link
	const [userInfo, setUserInfo] = useState(null);
	const [showSubMenu, setShowSubMenu] = useState(false);
	const [categories, setCategories] = useState([]);
	const [subMenuImageToShow, setSubMenuImageToShow] = useState("");

	useEffect(() => {
		const fetchCategories = async () => {
			const query = `*[_type == "category" && hidden != true] | order(ordinal asc){
                                title,
                                "subMenuImage": subMenuImage.asset._ref,
                                ordinal
                            }`;
			const fetchedCategories = await client.fetch(query);
			const categoriesWithImageUrl = await Promise.all(
				fetchedCategories.map(async (category) => ({
					...category,
					imageUrl: urlFor(category.subMenuImage).url(),
				}))
			);
			setCategories([...categoriesWithImageUrl]);
			if (categoriesWithImageUrl.length > 0) {
				setSubMenuImageToShow(categoriesWithImageUrl[0].imageUrl);
			}
		};

		fetchCategories();
	}, []);

	//Dynamic styling for the banner above the header and if it exists.
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

	// Function to toggle submenu visibility
	const toggleSubMenu = (shouldShow) => {
		setShowSubMenu(shouldShow);
	};

	const renderLogoImage = (
		<Image src={simpleLogo} alt="Vine & Frond logo" className={logoClass} />
	);

	return (
		<div className="fixed top-0 left-0 z-50 w-full" style={headerStyle}>
			<nav className={`${headerClass} hidden lg:flex`}>
				<div className="flex-1 flex items-center justify-start">
					<ul className="list-none hidden sm:flex flex-row gap-6">
						{navLinks.map((link) =>
							link.title === "Shop" ? (
								<div
									className="nav-item relative hover-underline-animation"
									key={link.id}
									onMouseEnter={() => toggleSubMenu(true)}
									onMouseLeave={() => toggleSubMenu(false)}
								>
									<li
										className={`${
											router.pathname === `/${link.id}`
												? isScrolled
													? "bg-primary rounded-md text-[12px] text-emerald-600" // Smaller when scrolled
													: "bg-primary rounded-md text-lg text-emerald-600" // Larger when not scrolled
												: ""
										} 
                                        hover:underline-animation font-thin 
                                        ${
																					isScrolled
																						? "text-[13px]"
																						: "text-[18px] xl:text-[20px]"
																				} cursor-pointer`}
										onMouseEnter={() => setActive(link.title)}
									>
										<Link href={`/${link.id}`} legacyBehavior>
											{link.title}
										</Link>
									</li>
									{showSubMenu && (
										<div className="absolute bg-primary shadow-xl z-20 rounded-xl w-[45rem] left-0 top-[1] flex">
											<div className="w-1/4 p-2">
												{categories.map((category) => (
													<motion.div
														key={category.title}
														whileHover={{
															rotate: [0, 1, -1, 1, 0],
															transition: { duration: 0.5 },
														}}
														className="hover:bg-[#ECC89A] rounded-md w-full"
													>
														<Link
															href={
																category.title.trim().toLowerCase() ===
																"all products"
																	? "/allproducts"
																	: `/allproducts/category/${category.title.toLowerCase()}`
															}
															className="block text-sm text-gray-700 px-4 py-2 rounded-md hover:font-amaticSC hover:font-semibold hover:text-4xl"
															onMouseEnter={() =>
																setSubMenuImageToShow(category.imageUrl)
															}
														>
															{category.title}
														</Link>
													</motion.div>
												))}
											</div>
											<div
												className="w-3/4 relative"
												style={{ height: "400px" }}
											>
												<div className="absolute inset-0 flex justify-center items-center z-30 border-[.4rem] border-primary rounded-xl">
													{subMenuImageToShow && (
														<Image
															src={subMenuImageToShow}
															alt="Category Image"
															priority={true}
															fill={true}
															className="object-cover rounded-xl"
														/>
													)}
												</div>
											</div>
										</div>
									)}
								</div>
							) : (
								<li
									key={link.id}
									className={`${
										router.pathname === `/${link.id}`
											? isScrolled
												? "bg-primary rounded-md text-[12px] text-emerald-600" // Smaller when scrolled
												: "bg-primary rounded-md text-lg text-emerald-600" // Larger when not scrolled
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
							)
						)}
					</ul>
				</div>
				<Link href="/" className="flex items-center justify-center mx-auto">
					{router.pathname === "/" && typeof window !== "undefined" ? (
						<motion.div
							animate={{ x: 0, rotate: 0 }}
							initial={{ x: -100, rotate: -10 }}
							transition={{ duration: 2 }}
						>
							{renderLogoImage}
						</motion.div>
					) : (
						<div>{renderLogoImage}</div>
					)}
				</Link>

				<div
					className={`flex-1 flex items-center ${
						isScrolled ? "justify-end" : "lg:justify-end justify-start"
					} -translate-x-5`}
				>
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
								href="/about"
								className={`inline-flex items-center ${
									isScrolled
										? "bg-primary rounded-md text-[12px]" // Smaller size when scrolled
										: "bg-primary rounded-md text-lg" // Larger size when not scrolled
								} hover-underline-animation font-thin ${
									isScrolled ? "text-[13px]" : "text-[18px] xl:text-[20px]"
								} cursor-pointer text-black`}
							>
								About
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
				</div>
			</nav>
		</div>
	);
};
export default Header;
