import Footer from "@/components/mainPage/Footer";
import { Store } from "@/utils/Store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useContext, useState } from "react";
import jsCookie from "js-cookie";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useSnackbar } from "notistack";
import { getError } from "@/utils/error";
import { PulseLoader } from "react-spinners";

const RegisterScreen = () => {
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();
	const { state, dispatch } = useContext(Store);
	const { userInfo } = state;

	useEffect(() => {
		if (userInfo) {
			router.push("/");
		}
	}, [router, userInfo]);

	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const capital = new RegExp("(?=.*[A-Z])");
	const number = new RegExp("(?=.*[0-9])");
	const special = new RegExp("(?=.*[!@#$%^&*])");
	const length = new RegExp("(?=.{8,})");

	const {
		handleSubmit,
		register,
		formState: { errors },
		getValues,
	} = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const handlePasswordShowHide = () => {
		setShowPassword(!showPassword);
	};
	const handlePasswordConfirmShowHide = () => {
		setShowPasswordConfirm(!showPasswordConfirm);
	};

	const submitHandler = async ({
		firstName,
		lastName,
		email,
		password,
		confirmPassword,
	}) => {
		setIsLoading(true);
		if (password !== confirmPassword) {
			enqueueSnackbar("Passwords don't match", { variant: "error" });
			return;
		}
		try {
			const { data } = await axios.post(`/api/users/register`, {
				firstName,
				lastName,
				email,
				password,
			});
			dispatch({ type: "USER_LOGIN", payload: data });
			jsCookie.set("userInfo", JSON.stringify(data));
			router.push("/login");
		} catch (err) {
			enqueueSnackbar(getError(err), { variant: "default" });
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="grid grid-rows-auto min-h-screen bg-gray-100 overflow-hidden p-20">
			<div className="flex flex-col items-center justify-start min-h-screen">
				<h1 className="px-5 sm:px-10 py-4 text-4xl">Register</h1>
				<form
					onSubmit={handleSubmit(submitHandler)}
					className="flex flex-col p-5 mt-5 bg-white shadow-md rounded-lg"
				>
					<div className="flex flex-col sm:flex-row justify-center items-center sm:justify-start sm:items-start gap-1 sm:gap-4">
						<div className="w-[13.7rem] sm:w-full">
							<h1 className="mb-1 text-center sm:text-left"> First Name</h1>
							<input
								className="bg-gray-200 border-gray-400 mb-3 p-2 rounded mt-1 focus:bg-transparent w-full self-center"
								type="text"
								{...register("firstName", {
									required: "Required",
									minLength: { value: 2, message: "Minimum length is 2" },
								})}
							/>
							{errors.firstName ? (
								<p className="bg-primary border-transparent rounded-md p-[.2rem] text-black font-sans text-[.7rem] w-max text-center mb-1">
									{errors.firstName?.message}
								</p>
							) : (
								""
							)}
						</div>
						<div className="w-[13.7rem] sm:w-full">
							<h1 className="mb-1 text-center sm:text-left"> Last Name</h1>
							<input
								className="bg-gray-200 border-gray-400 mb-3 p-2 rounded mt-1 focus:bg-transparent w-full self-center"
								type="text"
								{...register("lastName", {
									required: "Required",
									minLength: { value: 2, message: "Minimum length is 2" },
								})}
							/>
							{errors.lastName ? (
								<p className="bg-primary border-transparent rounded-md p-[.2rem] text-black font-sans text-[.7rem] text-center w-max mb-1">
									{errors.lastName?.message}
								</p>
							) : (
								""
							)}
						</div>
					</div>

					<h1 className="mb-1 self-center sm:self-start">Email</h1>
					<input
						className="bg-gray-200 border-gray-400 mb-3 p-2 rounded mt-1 focus:bg-transparent w-full self-start"
						type="email"
						{...register("email", {
							required: "Required",
							pattern: {
								value: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
								message: "Please enter a valid email address",
							},
						})}
					/>
					{errors.email ? (
						<p className="bg-primary border-transparent rounded-md p-[.2rem] text-black font-sans text-[.7rem] text-center w-max mb-1">
							{errors.email?.message}
						</p>
					) : (
						""
					)}

					<div className="flex flex-col sm:flex-row justify-center items-center sm:justify-start sm:items-start gap-1 sm:gap-4">
						<div className="w-[13.7rem] sm:w-full">
							<h1 className="mb-1 text-center sm:text-left"> Password</h1>
							<input
								className="bg-gray-200 border-gray-400 mb-3 p-2 rounded mt-1 focus:bg-transparent w-full self-start"
								type={showPassword ? "text" : "password"}
								{...register("password", {
									required: "Required",
									validate: {
										includesCapital: (v) =>
											capital.test(v) ||
											"Password must include a capital letter",
										includesNumber: (v) =>
											number.test(v) || "Password must include a number",
										includesSpecial: (v) =>
											special.test(v) ||
											"Password must include a special character",
										includesLength: (v) =>
											length.test(v) ||
											"Password must be at least 8 characters long",
									},
								})}
							/>
							{errors.password ? (
								<p className="bg-primary border-transparent rounded-md p-[.2rem] mb-1 text-black font-sans text-[.7rem] w-max text-center">
									{errors.password?.message}
								</p>
							) : (
								""
							)}
						</div>
						{showPassword ? (
							<EyeIcon
								className="w-5 h-5 absolute translate-x-[15.4rem] translate-y-[2.6rem] cursor-pointer text-blue-400 hover:opacity-80"
								id="show-hide"
								onClick={handlePasswordShowHide}
							/>
						) : (
							<EyeSlashIcon
								className="w-5 h-5 absolute translate-x-[15.4rem] translate-y-[2.6rem] cursor-pointer text-gray-400 hover:opacity-80"
								id="show-hide"
								onClick={handlePasswordShowHide}
							/>
						)}

						<div className="w-[13.7rem] sm:w-full">
							<h1 className="mb-1 text-center sm:text-left">
								Confirm Password
							</h1>
							<input
								className="bg-gray-200 border-gray-400 mb-3 p-2 rounded mt-1 focus:bg-transparent w-full self-start"
								type={showPasswordConfirm ? "text" : "password"}
								{...register("confirmPassword", {
									required: "Required",
									validate: (value) =>
										value === getValues("password") ||
										"The passwords do not match",
								})}
							/>
							{errors.confirmPassword ? (
								<p className="bg-primary border-transparent rounded-md p-[.2rem] text-black font-sans text-[.7rem] w-max text-center mb-1">
									{errors.confirmPassword?.message}
								</p>
							) : (
								""
							)}
						</div>
						{showPasswordConfirm ? (
							<EyeIcon
								className="w-5 h-5 absolute translate-x-[33.5rem] translate-y-[2.6rem] cursor-pointer text-blue-400 hover:opacity-80"
								id="show-hide"
								onClick={handlePasswordConfirmShowHide}
							/>
						) : (
							<EyeSlashIcon
								className="w-5 h-5 absolute translate-x-[33.5rem] translate-y-[2.6rem] cursor-pointer text-gray-400 hover:opacity-80"
								id="show-hide"
								onClick={handlePasswordConfirmShowHide}
							/>
						)}
					</div>
					{isLoading ? (
						<div className="flex justify-center p-2">
							<PulseLoader color="#36d7b7" />
						</div>
					) : (
						<button
							className="bg-gray-200 border-gray-800 border-[.1rem] rounded px-10 py-2 hover:border-blue-400 mt-4 mb-8"
							type="submit"
						>
							Register!
						</button>
					)}
					<div className="self-center sm:self-start">
						<Link href="/login" className="text-sm hover:opacity-70">
							Already have an account?
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
export default RegisterScreen;
