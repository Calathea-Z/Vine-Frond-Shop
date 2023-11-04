import Footer from "@/components/Footer";
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

const LoginScreen = () => {
  const { enqueueSnackbar }  = useSnackbar();
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

  const submitHandler = async ({
    email,
    password,
  }) => {
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
    <div className="grid grid-rows-auto min-h-screen">
      <div className="bg-[#fdf9f5] flex flex-col items-center p-4 sm:p-8">
        <h1 className="self-center px-10 py-5 text-4xl">Login</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col sm:p-5 mt-5"
        >
          <h1 className="mb-1 p-[.03rem] sm:p-0">Email</h1>
          <input
            className="bg-gray-200 border-gray-400 mb-3 p-2 sm:p-2 rounded mt-1 focus:bg-transparent w-[23rem] sm:w-[24.2rem] self-center sm:self-start"
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
            <p className=" bg-primary border-transparent rounded-md p-[.2rem] text-black font-sans text-[.6rem] text-center w-max mb-1">
              {errors.email?.message}
            </p>
          ) : (
            ""
          )}
          <h1 className="mb-1 p-[.03rem] sm:p-0">Password</h1>
          <div className="flex gap-2">
            <div>
              <input
                className="bg-gray-200 border-gray-400 mb-3 p-2 sm:p-2 rounded mt-1 focus:bg-transparent w-[23rem] sm:w-[24.2rem] self-center sm:self-start"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Required",
                })}
              />
              {errors.password ? (
                <p className="bg-primary border-transparent rounded-md p-[.2rem] mb-1 text-black font-sans text-[.6rem] w-max text-center">
                  {errors.password?.message}
                </p>
              ) : (
                ""
              )}
            </div>
            {showPassword ? (
              <EyeIcon
                className="w-5 h-5 absolute translate-x-[24.5rem] sm:translate-x-[22.5rem] translate-y-[.6rem] sm:translate-y-[.8rem] cursor-pointer text-blue-400 hover:opacity-80"
                id="show-hide"
                onClick={handlePasswordShowHide}
              />
            ) : (
              <EyeSlashIcon
                className="w-5 h-5 absolute translate-x-[24.5rem] sm:translate-x-[22.5rem] translate-y-[.6rem] sm:translate-y-[.8rem] cursor-pointer text-black hover:opacity-80"
                id="show-hide"
                onClick={handlePasswordShowHide}
              />
            )}
          </div>
          {isLoading ? (
            <div className="flex justify-center p-2">
              <PulseLoader color="#36d7b7" />
            </div>) : (
              <button
              className="bg-gray-200 border-gray-800 border-[.1rem] rounded px-10 py-2 hover:border-blue-400 mt-4 mb-8"
              type="submit"
            >
              Login
            </button>
          )}          
          <button className="mt-5">
  <Link href="/register" passHref className="text-sm hover:opacity-70 bg-blue-500 text-white py-1 px-3 rounded">
    Create Account
  </Link>
</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default LoginScreen;
