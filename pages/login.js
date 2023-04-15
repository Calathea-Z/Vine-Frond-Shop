import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";

const LoginScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordShowHide = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async ({email, password}) => {};
  return (
    <div>
      <Header />
      <div className="bg-[#fdf9f5] flex flex-col h-screen p-8">
        <h1 className="self-center p-3 text-4xl">Login</h1>
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col p-5 ">
          <h1 className='mb-5'>Email</h1>
          <input
            className="bg-transparent border-primary mb-3 p-2 rounded-sm focus:bg-transparent focus:ring-0 focus:border-transparent w-full"
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
          <h1 className='mb-5'>Password</h1>
          <input
                className="bg-transparent border-primary mb-3 p-2 rounded-sm focus:bg-transparent focus:ring-0 focus:border-transparent w-full"
                type={showPassword ? "text" : "password"}
                {...register("password",
                {
                  required: "Required",})}
              />
              {errors.password ? (
                <p className="bg-primary border-transparent rounded-md p-[.2rem] text-black font-sans text-[.6rem] w-max text-center mb-1">
                  {errors.password?.message}
                </p>
              ) : (
                ""
              )}
          <button className='bg-primary rounded-sm mt-2 px-10 py-2 hover:bg-primary/80 mb-8 font-sans' type='submit'>Sign In</button>
          <div>
            <Link href="/register" passHref className='text-sm hover:opacity-70'>
              Create account
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default LoginScreen;
