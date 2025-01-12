import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormWarning from "../Components/shared/FormWarning";

const UserLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to the server
  };

  return (
    <section>
      <figure className="w-full h-full">
        <img src="/logo.png" alt="logo" className=" h-20 w-28" />
      </figure>
      <section className="mx-7 flex flex-col gap-40 mt-5 justify-between">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-extrabold text-lg">
              What's Your Email
            </label>
            <input
              className="p-2 bg-gray-200 rounded outline-0"
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <FormWarning warning={errors.email.message} />}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-extrabold text-lg">
              Password
            </label>
            <input
              autoComplete="true"
              className="p-2 bg-gray-200 rounded outline-0"
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <FormWarning warning={errors.password.message} />
            )}
          </div>

          {/* Submit Button and Links */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="text-lg text-center w-full bg-black text-white p-2 mt-5 rounded"
            >
              Continue
            </button>
            <p className="text-center">
              Don't Have an Account?{" "}
              <Link to="/user/signup" className="text-blue-500">
                Signup
              </Link>
            </p>
          </div>
        </form>
        <Link
          to={"/captain/login"}
          className="text-lg block text-center w-full bg-gray-400 text-white p-2 mt-2 rounded"
        >
          Sign in as Captain
        </Link>
      </section>
    </section>
  );
};

export default UserLogin;
