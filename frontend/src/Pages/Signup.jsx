import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Components/shared/Logo";
import axios from "axios";
import FormWarning from "../Components/shared/FormWarning";
import { UserDataContext } from "../Context/UserContext";

const Signup = ({ formType }) => {
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

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const onSubmit = async (values) => {
    const data = {
      fullName: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      email: values.email,
      password: values.password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}${
        formType === "User" ? "/user/signup" : "/captain/signup"
      }`,
      data
    );

    if (response.status === 201) {
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    }
  };

  return (
    <section>
      <Logo formType={formType} />
      <section className="mx-7 mt-8 flex flex-col gap-40 justify-between h-[80vh]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {/* First and Last Name */}
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="firstName" className="font-extrabold text-lg">
                First Name
              </label>
              <input
                className="form-input"
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
              className="form-input"
              id="password"
              type="password"
              autoComplete="true"
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
              Create Account
            </button>
            <p className="text-center">
              Already have an Account?{" "}
              {formType === "User" ? (
                <Link to={"/user/login"} className="text-blue-500">
                  Login
                </Link>
              ) : (
                <Link to={"/captain/login"} className="text-blue-500">
                  Login
                </Link>
              )}
            </p>
          </div>
        </form>
        {formType === "User" ? (
          <Link
            to={"/captain/login"}
            className="text-lg block text-center w-full bg-green-400 text-black p-2 mt-2 rounded"
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

export default Signup;
