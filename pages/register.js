import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useEffect, useContext } from "react";
import jsCookie from "js-cookie";
import { XMarkIcon, CheckIcon, EyeIcon } from "@heroicons/react/24/solid";

const RegisterScreen = () => {
  
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);

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

  const { enqueueSnackbar } = useSnackbar();

  const showHide = () => {

  }

  const submitHandler = async ({ firstName, lastName, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        firstName,
        lastName,
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push("/");
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };
  return (
    <div className="flex flex-col">
      <Header />
      <div className="bg-[#fdf9f5] flex flex-col items-center p-8">
        <h1 className="self-center px-10 py-5 text-4xl">Register</h1>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          className="flex flex-col p-5 "
        >
          <div className="flex justify-start items-start gap-4">
            <div>
              <h1 className="mb-1"> First Name</h1>
              <input
                className="bg-transparent border-b-2 border-primary mb-3 p-2 rounded-sm focus:bg-none focus:ring-0 focus:border-transparent"
                id="firstName"
                {...register("firstName", {
                  required: "This is required",
                  minLength: { value: 2, message: "Minimum length is 2" },
                })}
              />
              {errors.firstName? <p className='bg-yellow-400 border-red-600 border-[1px] py-1 text-stone-700 rounded-sm text-center'>{errors.firstName?.message}</p> : '' }
              
            </div>
            <div>
              <h1 className="mb-1"> Last Name</h1>
              <input
                className="bg-transparent border-b-2 border-primary mb-3 p-2 rounded-sm focus:bg-none focus:ring-0 focus:border-transparent"
                id="lastName"
                {...register("lastName", {
                  required: "This is required",
                  minLength: { value: 2, message: "Minimum length is 2" },
                })}
              />
              {errors.lastName? <p className='bg-yellow-400 border-red-600 border-[1px] py-1 text-stone-700 rounded-sm text-center'>{errors.lastName?.message}</p> : '' }
            </div>
          </div>

          <h1 className="mb-1">Email</h1>
          <input
            className="bg-transparent border-b-2 border-primary mb-3 p-2 rounded-sm focus:bg-none focus:ring-0 focus:border-transparent w-[24.2rem]"
            id="email"
            {...register("email", {
              required: "This is required",
              pattern: { value: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email address"}
            })}
          />
          {errors.email? <p className='bg-yellow-400 border-red-600 border-[1px] py-1 text-stone-700 rounded-sm text-center'>{errors.email?.message}</p> : '' }

          <h1 className="mb-1">Password</h1>
          <div className='flex gap-2'>
            <div>
          <input
            className="bg-transparent border-b-2 border-primary mb-3 p-2 rounded-sm focus:bg-none w-[24.2rem]"
            id="password"
            {...register("password", {
              required: "This is required",
            
            })}
          />
          {errors.password? <p className='bg-yellow-400 border-red-600 border-[1px] py-1 text-stone-700 rounded-sm text-center'>{errors.password?.message}</p> : '' }
          <p id='capital' className='flex text-[.5rem] font-mono gap-[.2rem] py-[.1rem]'>
            <XMarkIcon className='h-3 w-3' />
            <CheckIcon className='h-3 w-3' />
            Capital Letter
          </p>
          <p id='char' className='flex text-[.5rem] font-mono gap-[.2rem] py-[.1rem]'>
            <XMarkIcon className='h-3 w-3' />
            <CheckIcon className='h-3 w-3' />
            Special Character
          </p>
          <p id='number' className='flex text-[.5rem] font-mono gap-[.2rem] py-[.1rem]'>
            <XMarkIcon className='h-3 w-3' />
            <CheckIcon className='h-3 w-3' />
            Number
          </p>
          <p id='length' className='flex text-[.5rem] font-mono gap-[.2rem] py-[.1rem]'>
            <XMarkIcon className='h-3 w-3' />
            <CheckIcon className='h-3 w-3' />
            8+ Characters
          </p>
          </div>
          <EyeIcon className='w-5 h-5 absolute translate-x-[22.5rem] translate-y-[.6rem]' id='show-hide' onClick={showHide}/>
          </div>
          
          <h1 className="mb-1">Confirm Password</h1>
          <div className='flex gap-2'>
            <div>
            <input
            className="bg-transparent border-b-2 border-primary mb-3 p-2 rounded-sm focus:bg-none w-[24.2rem]"
            id="confirmPassword"
            label="Confirm Password"
            {...register("confirmPassword", 
            )}
          />
          {errors.confirmPassword? <p className='bg-yellow-400 border-red-600 border-[1px] py-1 text-stone-700 rounded-sm text-center'>{errors.confirmPassword?.message}</p> : '' }
          </div>
          <EyeIcon className='w-5 h-5 absolute translate-x-[22.5rem] translate-y-[.6rem]' id='show-hide-two' onClick={showHide}/>
          </div>
          <button
            className="bg-primary rounded-sm mt-2 px-10 py-2 hover:bg-primary/80 mb-8"
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
