import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useContext } from "react";
import jsCookie from 'js-cookie'

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
    control,
    formState: { errors },
  } = useForm();



  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      jsCookie.set('userInfo', JSON.stringify(data));
      router.push('/');
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };
  return (
    <div>
      <Header />
      <div className="bg-[#fdf9f5] flex flex-col h-screen p-8">
        <h1 className="self-center p-3 text-4xl">Register</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col p-5 "
        >
          <h1 className="mb-1"> Full Name</h1>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 2,
            }}
            render={({ field }) => (
              <input
                className="bg-transparent border-b-2 border-primary mb-3 p-2 rounded-sm focus:bg-none focus:ring-0 focus:border-transparent"
                id="name"
                label="Name"
                inputProps={{ type: "name" }}
                error={errors.name}
                helperText={
                  errors.name
                    ? (errors.name.type = "pattern"
                        ? "Please enter your full name"
                        : "Full Name is required")
                    : ""
                }
                {...field}
              />
            )}
          ></Controller>
          <h1 className="mb-1">Email</h1>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2-4}$/,
            }}
            render={({ field }) => (
              <input
                className="bg-transparent border-b-2 border-primary mb-3 p-2 rounded-sm focus:bg-none focus:ring-0 focus:border-transparent"
                id="email"
                label="Email"
                inputProps={{ type: "email" }}
                error={errors.email}
                helperText={
                  errors.email
                    ? (errors.email.type = "pattern"
                        ? "Email is not valid"
                        : "Email is required")
                    : ""
                }
                {...field}
              />
            )}
          ></Controller>
          <h1 className="mb-1">Password</h1>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 8,
            }}
            render={({ field }) => (
              <input
                className="bg-transparent border-b-2 border-primary mb-3 p-2 rounded-sm focus:bg-none"
                id="password"
                label="Password"
                inputProps={{ type: "password" }}
                error={Boolean(errors.password)}
                helperText={
                  errors.password
                    ? (errors.password.type = "minLength"
                        ? "Password must be at least 8 characters"
                        : "Password is required")
                    : ""
                }
                {...field}
              />
            )}
          ></Controller>
          <h1 className="mb-1">Confirm Password</h1>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 8,
            }}
            render={({ field }) => (
              <input
                className="bg-transparent border-b-2 border-primary mb-3 p-2 rounded-sm focus:bg-none"
                id="confirmPassword"
                label="Confirm Password"
                inputProps={{ type: "password" }}
                error={Boolean(errors.confirmPassword)}
                helperText={
                  errors.confirmPassword
                    ? (errors.confirmPassword.type = "minLength"
                        ? "Password must be at least 8 characters"
                        : "Password is required")
                    : ""
                }
                {...field}
              />
            )}
          ></Controller>
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
