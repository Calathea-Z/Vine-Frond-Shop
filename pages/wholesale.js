import { useEffect, useContext, useState } from "react";
import Header from "@/components/mainPage/header/Header";
import Footer from "@/components/mainPage/Footer";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";

const Wholesale = () => {
	const { state, dispatch } = useContext(Store);
	const userInfo = Cookies.get("userInfo")
		? JSON.parse(Cookies.get("userInfo"))
		: null;
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		if (userInfo) {
			dispatch({ type: "USER_LOGIN", payload: userInfo });
		}
	}, [dispatch, userInfo]);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		// Handle the form submission logic here
		alert("Form submitted!"); // Placeholder action
	};

	return (
		<div className="flex flex-col min-h-screen justify-between">
			<Header />
			<main className="flex-grow flex items-center justify-center">
				{userInfo && userInfo.isWholesale ? (
					<div className="text-center">
						<h1 className="text-2xl font-bold">
							Welcome to our Wholesale Portal!
						</h1>
					</div>
				) : (
					<div className="text-center p-10">
						{showForm ? (
							<form onSubmit={handleFormSubmit} className="space-y-4">
								<div>
									<label
										htmlFor="businessName"
										className="block text-sm font-medium text-gray-700"
									>
										Business Name
									</label>
									<input
										type="text"
										id="businessName"
										name="businessName"
										required
										className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
								<div>
									<label
										htmlFor="address"
										className="block text-sm font-medium text-gray-700"
									>
										Address
									</label>
									<input
										type="text"
										id="address"
										name="address"
										required
										className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
								<div>
									<label
										htmlFor="contactInfo"
										className="block text-sm font-medium text-gray-700"
									>
										Contact Info
									</label>
									<input
										type="text"
										id="contactInfo"
										name="contactInfo"
										required
										className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
								<button
									type="submit"
									className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									Submit
								</button>
							</form>
						) : (
							<button
								onClick={() => setShowForm(true)}
								className="text-blue-500 hover:text-blue-700"
							>
								Join our Wholesale Program
							</button>
						)}
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
};
export default Wholesale;
