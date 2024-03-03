import React, { useState } from "react";
import Header from "@/components/mainPage/header/Header";
import Footer from "@/components/mainPage/Footer";
import OrderHistory from "@/components/userAccount/OrderHistory";
import Link from "next/link";

const ShippingAddresses = () => (
	<p>Your shipping addresses will be shown here.</p>
);
const Logout = () => <p>You are logged out.</p>;

export default function Account() {
	const [currentView, setCurrentView] = useState("orderHistory");

	// Function to render the current view
	const renderView = () => {
		switch (currentView) {
			case "orderHistory":
				return <OrderHistory />;
			case "shippingAddresses":
				return <ShippingAddresses />;
			case "logout":
				return <Logout />;
			default:
				return <OrderHistory />;
		}
	};
	return (
		<div className="min-h-screen flex flex-col mt-[10.5rem]">
			<Header />
			<div className="flex-grow flex ">
				<aside className="w-1/4 bg-white border-r border-r-black px-6 py-8">
					<nav className="sticky top-0">
						<ul className="flex flex-col items-center gap-1">
							<li className="mb-2">
								<button
									onClick={() => setCurrentView("orderHistory")}
									className="text-xl font-thin italic"
								>
									Order History
								</button>
							</li>
							<li className="mb-2">
								<button
									onClick={() => setCurrentView("shippingAddresses")}
									className="text-xl font-thin italic"
								>
									Shipping Addresses
								</button>
							</li>
							<li className="mb-2">
								<button
									onClick={() => setCurrentView("logout")}
									className="text-xl font-thin italic"
								>
									Logout
								</button>
							</li>
						</ul>
					</nav>
				</aside>
				<main className="w-3/4 bg-primary">{renderView()}</main>
			</div>
			<Footer />
		</div>
	);
}
