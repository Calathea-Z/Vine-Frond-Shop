import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

const LoginScreen = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({email, password}) => {};
  return (
    <div>
      <Header />
      <div className="bg-[#fdf9f5] flex flex-col h-screen p-8">
        <h1 className="self-center p-3 text-4xl">Login</h1>
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col p-5 ">
          <h1 className='mb-5'>Email</h1>
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
              className='bg-transparent border-b-2 border-primary mb-5 p-2 rounded-sm focus:bg-none focus:ring-0 focus:border-transparent'
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
          <h1 className='mb-5'>Password</h1>
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
              className='bg-transparent border-b-2 border-primary mb-8 p-2 rounded-sm focus:bg-none'
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
          <button className='bg-primary rounded-sm mt-2 px-10 py-2 hover:bg-primary/80 mb-8' type='submit'>Sign In</button>
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
