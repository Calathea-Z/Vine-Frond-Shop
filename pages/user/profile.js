import Footer from "@/components/Footer";
import Header from "@/components/Header";
import jsCookie from "js-cookie";
import states from "states-us";
import Select from "react-select";
import { Store } from "@/utils/Store";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";

const ProfileScreen = () => {
	const router = useRouter();

	const { state, dispatch } = useContext(Store);

	const {
		userInfo,
		cart: { shippingInformation },
	} = state;

	const {
		register,
		setValue,
		getValues,
		formState: { isDirty, isValid },
	} = useForm({
		mode: "onChange",
	});

	const [isEditable, setIsEditable] = useState(false);

	// Handler for logging out the user
	const logOutHandler = () => {
		dispatch({ type: "USER_LOGOUT" }); // Dispatching logout action
		jsCookie.remove("userInfo"); // Removing user info from cookies
		jsCookie.remove("cartItems"); // Removing cart items from cookies
		jsCookie.remove("shippingAddress"); // Removing shipping address from cookies
	};

	const stateOptions = states.map((state) => ({
		value: state.abbreviation,
		label: state.name,
	}));

	useEffect(() => {
		if (!userInfo) {
			return router.push("/login");
		}

		const fields = [
			"shippingContactEmail",
			"firstNameShipping",
			"lastNameShipping",
			"company",
			"address",
			"city",
			"zipCode",
			"usState",
		];
		fields.forEach((field) =>
			setValue(field, shippingInformation[field] || userInfo[field])
		);
	}, [router, setValue, userInfo, shippingInformation]);

	const toggleEdit = () => setIsEditable(!isEditable);

	return (
		<div className="flex flex-col min-h-screen justify-between">
			<div>
				<Header />
				<div className="pt-36 px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center">
						<h1 className="text-5xl font-bold mt-4">My Account</h1>
						<button
							className="py-2 mt-10 px-5 text-xl rounded-md border-2 bg-gray-300 hover:bg-gray-400"
							onClick={logOutHandler}
						>
							Log Out
						</button>
					</div>
					<div className="w-full max-w-4xl p-8 my-4 bg-white shadow-md rounded-lg mx-auto">
						<div className="p-6">
							<h2 className="text-3xl font-semibold mb-4">Shipping Address</h2>
							<form>
								<div className="grid grid-cols-2 gap-4">
									<div className="mb-1 relative shadow-md">
										<label
											htmlFor="firstNameShipping"
											className="font-sans text-xs text-gray-400 absolute left-4 top-1"
										>
											First Name
										</label>
										<input
											className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
											id="firstNameShipping"
											defaultValue={getValues("firstNameShipping")}
											{...register("firstNameShipping")}
											readOnly={!isEditable}
										/>
									</div>
									<div className="mb-1 relative shadow-md">
										<label
											htmlFor="lastNameShipping"
											className="font-sans text-xs text-gray-400 absolute left-4 top-1"
										>
											Last Name
										</label>
										<input
											className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
											id="lastNameShipping"
											defaultValue={getValues("lastNameShipping")}
											{...register("lastNameShipping")}
											readOnly={!isEditable}
										/>
									</div>
									<div className="mb-1 relative shadow-md">
										<label
											htmlFor="company"
											className="font-sans text-xs text-gray-400 absolute left-4 top-1"
										>
											Company (optional)
										</label>
										<input
											className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
											id="company"
											defaultValue={getValues("company")}
											{...register("company")}
											readOnly={!isEditable}
										/>
									</div>
									<div className="mb-1 relative shadow-md">
										<label
											htmlFor="address"
											className="font-sans text-xs text-gray-400 absolute left-4 top-1"
										>
											Address
										</label>
										<input
											className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
											id="address"
											defaultValue={getValues("address")}
											{...register("address")}
											readOnly={!isEditable}
										/>
									</div>
									<div className="mb-1 relative shadow-md">
										<label
											htmlFor="city"
											className="font-sans text-xs text-gray-400 absolute left-4 top-1"
										>
											City
										</label>
										<input
											className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
											id="city"
											defaultValue={getValues("city")}
											{...register("city")}
											readOnly={!isEditable}
										/>
									</div>
									<div className="mb-1 relative shadow-md">
										<label
											htmlFor="zipCode"
											className="font-sans text-xs text-gray-400 absolute left-4 top-1"
										>
											Zip Code
										</label>
										<input
											className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
											id="zipCode"
											defaultValue={getValues("zipCode")}
											{...register("zipCode")}
											readOnly={!isEditable}
										/>
									</div>
									<div className="mb-1 relative shadow-md max-h-64 overflow-auto">
										<label
											htmlFor="usState"
											className="font-sans text-xs text-gray-400 absolute left-4 top-1"
										>
											State
										</label>
										<Select
											options={stateOptions}
											isSearchable
											defaultValue={stateOptions.find(
												(option) => option.value === getValues("usState")
											)}
											onChange={(selectedOption) =>
												setValue("usState", selectedOption.value)
											}
											className="basic-multi-select"
											classNamePrefix="select"
										/>
									</div>
								</div>
								<div className="flex justify-end">
									<button
										type="button"
										className="py-2 px-5 mt-4 text-xl rounded-md border-2 bg-gray-300 hover:bg-gray-400"
										onClick={toggleEdit}
									>
										{isEditable ? "Save" : "Edit"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ProfileScreen;
