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

const RegisterScreen = () => {
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
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const capital = new RegExp("(?=.*[A-Z])");
  const number = new RegExp("(?=.*[0-9])");
  const special = new RegExp("(?=.*[!@#$%^&*])");
  const length = new RegExp("(?=.{8,})");

  const {
    handleSubmit,
    register,
    formState: { errors },
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
      console.log("hit success")
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push("/");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'default' });
    }
  };
  return (
    <div className="flex flex-col">
      <Header />
      <div className="bg-[#fdf9f5] flex flex-col items-center p-8">
        <h1 className="self-center px-10 py-5 text-4xl">Register</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col p-5 "
        >
          <div className="flex justify-start items-start gap-4">
            <div>
              <h1 className="mb-1"> First Name</h1>
              <input
                className="bg-transparent border-primary mb-3 p-2 rounded-sm focus:bg-transparent focus:ring-0 focus:border-transparent"
                type="text"
                {...register("firstName", {
                  required: "Required",
                  minLength: { value: 2, message: "Minimum length is 2" },
                })}
              />
              {errors.firstName ? (
                <p className="bg-primary border-transparent rounded-md p-[.2rem] text-black font-sans text-[.6rem] w-max text-center mb-1">
                  {errors.firstName?.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div>
              <h1 className="mb-1"> Last Name</h1>
              <input
                className="bg-transparent border-primary mb-3 p-2 rounded-sm focus:bg-transparent focus:ring-0 focus:border-transparent"
                type="text"
                {...register("lastName", {
                  required: "Required",
                  minLength: { value: 2, message: "Minimum length is 2" },
                })}
              />
              {errors.lastName ? (
                <p className="bg-primary border-transparent rounded-md p-[.2rem] text-black font-sans text-[.6rem] text-center w-max mb-1">
                  {errors.lastName?.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <h1 className="mb-1">Email</h1>
          <input
            className="bg-transparent border-primary mb-3 p-2 rounded-sm focus:bg-transparent focus:ring-0 focus:border-transparent w-[24.2rem]"
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

          <h1 className="mb-1">Password</h1>
          <div className="flex gap-2">
            <div>
              <input
                className="bg-transparent border-primary mb-3 p-2 rounded-sm focus:bg-transparent focus:ring-0 focus:border-transparent w-[24.2rem]"
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
                <p className="bg-primary border-transparent rounded-md p-[.2rem] mb-1 text-black font-sans text-[.6rem] w-max text-center">
                  {errors.password?.message}
                </p>
              ) : (
                ""
              )}
            </div>
            {showPassword ? (
              <EyeIcon
                className="w-5 h-5 absolute translate-x-[22.5rem] translate-y-[.6rem] cursor-pointer text-blue-400 hover:opacity-80"
                id="show-hide"
                onClick={handlePasswordShowHide}
              />
            ) : (
              <EyeSlashIcon
                className="w-5 h-5 absolute translate-x-[22.5rem] translate-y-[.6rem] cursor-pointer text-gray-400 hover:opacity-80"
                id="show-hide"
                onClick={handlePasswordShowHide}
              />
            )}
          </div>

          <h1 className="mb-1">Confirm Password</h1>
          <div className="flex gap-2">
            <div>
              <input
                className="bg-transparent border-primary mb-3 p-2 rounded-sm focus:bg-transparent focus:ring-0 focus:border-transparent w-[24.2rem]"
                type={showPasswordConfirm ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Required",
                })}
              />
              {errors.confirmPassword ? (
                <p className="bg-primary border-transparent rounded-md p-[.2rem] text-black font-sans text-[.6rem] w-max text-center mb-1">
                  {errors.confirmPassword?.message}
                </p>
              ) : (
                ""
              )}
            </div>
            {showPasswordConfirm ? (
              <EyeIcon
                className="w-5 h-5 absolute translate-x-[22.5rem] translate-y-[.6rem] cursor-pointer text-blue-400 hover:opacity-80"
                id="show-hide"
                onClick={handlePasswordConfirmShowHide}
              />
            ) : (
              <EyeSlashIcon
                className="w-5 h-5 absolute translate-x-[22.5rem] translate-y-[.6rem] cursor-pointer text-gray-400 hover:opacity-80"
                id="show-hide"
                onClick={handlePasswordConfirmShowHide}
              />
            )}
          </div>
          <button
            className="bg-primary rounded-sm mt-2 px-10 py-2 font-sans hover:bg-primary/80 mb-8"
            type="submit"
          >
            Register!
          </button>
          <div>
            <Link href="/login" passHref className="text-sm hover:opacity-70">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default RegisterScreen;
