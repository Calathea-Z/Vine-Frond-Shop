import { Fragment, useContext, useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { simpleLogo } from "@/public/assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Store } from "@/utils/Store";
import { navLinks } from "@/constants";
import useScroll from "@/hooks/useScroll";

const SmallHeader = () => {
	const { state } = useContext(Store);
	const { cart } = state;
	const router = useRouter();
	const isScrolled = useScroll();

	useEffect(() => {
		// Prevent rendering on login and register pages
		if (router.pathname === "/login" || router.pathname === "/register") {
			return null;
		}
	}, [router.pathname]);

	const headerClass = `fixed top-0 left-0 z-50 w-full bg-primary ${
		isScrolled ? "py-0" : "py-0"
	}`;

	return (
		<div className={headerClass}>
			<nav className="flex items-center justify-between p-4">
				<Menu as="div" className="relative">
					<Menu.Button className="inline-flex justify-center items-center">
						<Bars3Icon className="w-6 h-6" />
					</Menu.Button>
					<Menu.Items className="absolute left-0 top-full mt-2 w-48 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						{navLinks.map((link) => (
							<Menu.Item key={link.id} as={Fragment}>
								{({ active }) => (
									<Link
										href={`/${link.id}`}
										passHref
										className={`${
											active ? "bg-gray-100" : ""
										} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}
									>
										{link.title}
									</Link>
								)}
							</Menu.Item>
						))}
					</Menu.Items>
				</Menu>
				<Link href="/" passHref className="flex items-center justify-center">
					<Image src={simpleLogo} alt="Logo" width={90} height={90} />
				</Link>
				<div className="flex items-center space-x-4">
					<Link
						href="/search"
						passHref
						className="inline-flex items-center justify-center"
					>
						<MagnifyingGlassIcon className="w-6 h-6" />
					</Link>
					<Link
						href="/cart"
						passHref
						className="inline-flex items-center justify-center relative"
					>
						<ShoppingCartIcon className="w-6 h-6" />
						{cart.cartItems.length > 0 && (
							<span className="absolute -right-2 -top-2 rounded-full bg-secondary text-white px-2 py-1 text-xs">
								{cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
							</span>
						)}
					</Link>
				</div>
			</nav>
		</div>
	);
};

export default SmallHeader;
