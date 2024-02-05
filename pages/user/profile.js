import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";

const ProfileScreen = () => {
	const router = useRouter();

	const { state, dispatch } = useContext(Store);

	const {
		userInfo,
		cart: { shippingInformation },
	} = state;

	const { setValue } = useForm();

	useEffect(() => {
		if (!userInfo) {
			return router.push("/login");
		}

		setValue(
			"shippingContactEmail",
			shippingInformation.shippingContactEmail || userInfo.shippingContactEmail
		);
		setValue(
			"firstNameShipping",
			shippingInformation.firstNameShipping || userInfo.firstNameShipping
		);
		setValue(
			"lastNameShipping",
			shippingInformation.lastNameShipping || userInfo.lastNameShipping
		);
		setValue("company", shippingInformation.company || userInfo.company);
		setValue("address", shippingInformation.address || userInfo.address);
		setValue("city", shippingInformation.city || userInfo.city);
		setValue("zipCode", shippingInformation.zipCode || userInfo.zipCode);
		setValue("usState", shippingInformation.usState || userInfo.usState);
	}, [router, setValue, userInfo, shippingInformation]);

	return (
		<div className="flex flex-col min-h-screen justify-between">
			<div>
				<Header />
				<div className="pt-36 px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center">
						<h1 className="text-5xl font-bold mt-4">My Account</h1>
						<button className="py-2 mt-10 px-5 text-xl rounded-md border-2 bg-gray-300 hover:bg-gray-400">
							Log Out
						</button>
					</div>
					<div className="w-full max-w-4xl p-8 my-4 bg-white shadow-md rounded-lg mx-auto">
						<div className="p-6">
							<h2 className="text-3xl font-semibold mb-4">Shipping Address</h2>
							<p className="text-xl mb-2">
								{shippingInformation.firstNameShipping}{" "}
								{shippingInformation.lastNameShipping}
							</p>
							<p className="text-xl mb-2">{shippingInformation.company}</p>
							<p className="text-xl mb-2">{shippingInformation.address}</p>
							<p className="text-xl mb-4">
								{shippingInformation.city}, {shippingInformation.usState}{" "}
								{shippingInformation.zipCode}
							</p>
							<button className="py-2 px-5 text-xl rounded-md border-2 bg-gray-300 hover:bg-gray-400">
								Update Shipping Address
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ProfileScreen;
