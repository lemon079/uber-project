import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormWarning from "../Components/shared/FormWarning";

const Login = ({ formType }) => {
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
    if (formType === "User") {
    }
    if (formType === "Captain") {
    }
  };

  return (
    <section>
      <figure className="w-full h-full ml-7 mt-7">
        <img
          src={formType === "User" ? "/logo-user.png" : "/logo-captain.png"}
          alt="logo"
          className={formType === "User" ? "w-20 h-8" : "w-20 h-12"}
        />
      </figure>
      <section className="mx-7 mt-8 flex flex-col gap-40 justify-between">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-extrabold text-lg">
              What's Your Email?
            </label>
            <input
              className="form-input"
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
              className="form-input"
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
              {formType === "User" ? (
                <Link to={"/user/signup"} className="text-blue-500">
                  Signup
                </Link>
              ) : (
                <Link to={"/captain/signup"} className="text-blue-500">
                  Signup
                </Link>
              )}
            </p>
          </div>
        </form>
        {formType === "User" ? (
          <Link
            to={"/captain/login"}
            className="text-lg block text-center w-full bg-gray-400 text-white p-2 mt-2 rounded"
          >
            Sign in as Captain
          </Link>
        ) : (
          <Link
            to={"/user/login"}
            className="text-lg block text-center w-full bg-gray-400 text-white p-2 mt-2 rounded"
          >
            Sign in as User
          </Link>
        )}
      </section>
    </section>
  );
};

export default Login;
