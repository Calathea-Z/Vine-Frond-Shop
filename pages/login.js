import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
      const { data } = await axios.post(`/api/users/login`, {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push("/");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-[#fdf9f5] flex flex-col items-center p-4 sm:p-8">
        <h1 className="self-center px-10 py-5 text-4xl">Login</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col sm:p-5"
        >
          <h1 className="mb-1 p-[.03rem] sm:p-0">Email</h1>
          <input
            className="bg-transparent border-primary mb-3 p-1 sm:p-2 rounded-sm focus:bg-transparent focus:ring-0 focus:border-transparent w-[23rem] sm:w-[24.2rem] self-center sm:self-start"
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
                className="bg-transparent border-primary mb-3 p-1 sm:p-2 rounded-sm focus:bg-transparent focus:ring-0 focus:border-transparent w-[23rem] sm:w-[24.2rem] self-center sm:self-start"
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
                className="w-5 h-5 absolute translate-x-[21.5rem] sm:translate-x-[22.5rem] translate-y-[.4rem] sm:translate-y-[.6rem] cursor-pointer text-blue-400 hover:opacity-80"
                id="show-hide"
                onClick={handlePasswordShowHide}
              />
            ) : (
              <EyeSlashIcon
                className="w-5 h-5 absolute translate-x-[21.5rem] sm:translate-x-[22.5rem] translate-y-[.4rem] sm:translate-y-[.6rem] cursor-pointer text-gray-400 hover:opacity-80"
                id="show-hide"
                onClick={handlePasswordShowHide}
              />
            )}
          </div>
          <button
            className="bg-primary rounded-sm mt-2 px-10 py-2 font-sans hover:bg-primary/80 mb-8"
            type="submit"
          >
            Login
          </button>
          <div>
            <Link href="/register" passHref className="text-sm hover:opacity-70">
              Create Account
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default LoginScreen;
