import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
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
          {/* First and Last Name */}
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="firstName" className="font-extrabold text-lg">
                First Name
              </label>
              <input
                className="p-2 w-full bg-gray-200 rounded outline-0"
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <FormWarning warning={errors.firstName.message} />
              )}
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="lastName" className="font-extrabold text-lg">
                Last Name
              </label>
              <input
                className="p-2 w-full bg-gray-200 rounded outline-0"
                id="lastName"
                type="text"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <FormWarning warning={errors.lastName.message} />
              )}
            </div>
          </div>

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
              Already have an?{" "}
              <Link to="/user/login" className="text-blue-500">
                Signin
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

export default UserSignup;
