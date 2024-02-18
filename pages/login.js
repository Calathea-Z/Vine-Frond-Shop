import { Store } from "@/utils/Store";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useContext, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useSnackbar } from "notistack";
import { getError } from "@/utils/error";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import Link from "next/link";
import jsCookie from "js-cookie";
import { simpleLogo } from "@/public/assets";

const LoginScreen = () => {
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
	const [isLoading, setIsLoading] = useState(false);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handlePasswordShowHide = () => {
		setShowPassword(!showPassword);
	};

	const submitHandler = async ({ email, password }) => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(`/api/users/login`, {
				email,
				password,
			});
			dispatch({ type: "USER_LOGIN", payload: data });
			jsCookie.set("userInfo", JSON.stringify(data));
			router.push("/");
		} catch (err) {
			enqueueSnackbar(getError(err), { variant: "error" });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col md:flex-row h-screen bg-gray-100 items-center justify-center overflow-hidden">
			<div className="md:w-3/5 flex justify-center mb-10 md:mb-0">
				<Link href="/" passHref>
					<a className="w-100 h-1/3">
						<Image
							src={simpleLogo}
							alt="Vine & Frond logo"
							layout="fill"
							objectFit="contain"
						/>
					</a>
				</Link>
			</div>
			<div className="md:w-2/5 flex flex-col bg-gray-100">
				<h1 className="text-6xl mb-4">Login</h1>
				<form
					onSubmit={handleSubmit(submitHandler)}
					className="w-full max-w-xl"
				>
					<div className="mb-6">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							{...register("email", {
								required: "Required",
								pattern: {
									value: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
									message: "Please enter a valid email address",
								},
							})}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						{errors.email && (
							<p className="mt-2 text-sm text-red-600">
								{errors.email.message}
							</p>
						)}
					</div>
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								{...register("password", {
									required: "Required",
								})}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
							<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
								{showPassword ? (
									<EyeIcon
										className="h-5 w-5 text-gray-400 cursor-pointer"
										onClick={handlePasswordShowHide}
									/>
								) : (
									<EyeSlashIcon
										className="h-5 w-5 text-gray-400 cursor-pointer"
										onClick={handlePasswordShowHide}
									/>
								)}
							</div>
						</div>
						{errors.password && (
							<p className="mt-2 text-sm text-red-600">
								{errors.password.message}
							</p>
						)}
					</div>
					<div className="flex items-center justify-between">
						{isLoading ? (
							<div className="flex justify-center items-center">
								<PulseLoader color="#36d7b7" />
							</div>
						) : (
							<button
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Login
							</button>
						)}
					</div>
					<div className="mt-4 text-center">
						<Link href="/register" passHref>
							<a
								className={`text-sm ${
									isLoading
										? "opacity-50 cursor-not-allowed"
										: "hover:underline"
								} text-indigo-600 cursor-pointer`}
							>
								Create Account
							</a>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
export default LoginScreen;
