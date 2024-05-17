import React, { useState, useContext } from "react";
import Header from "@/components/mainPage/header/Header";
import Footer from "@/components/mainPage/Footer";
import OrderHistory from "@/components/userAccount/OrderHistory";
import { Store } from "@/utils/Store";
import { useRouter } from "next/router";

export default function Account() {
	const [currentView, setCurrentView] = useState("orderHistory");
	const router = useRouter();
	const { state, dispatch } = useContext(Store);
	const { userInfo } = state;

	const ShippingAddresses = () => (
		<p>Your shipping addresses will be shown here.</p>
	);

	const Logout = () => {
		// Clear all cookies and redirect to home page
		dispatch({ type: "USER_LOGOUT" }); // Assuming there's a reducer handling this type
		router.push("/");
	};

	// Function to render the current view
	const renderView = () => {
		switch (currentView) {
			case "orderHistory":
				return <OrderHistory />;
			case "shippingAddresses":
				return <ShippingAddresses />;
			case "logout":
				Logout();
				return <p>You are logged out.</p>;
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
									onClick={() => Logout()}
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
