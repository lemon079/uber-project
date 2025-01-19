import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormWarning from "../Components/shared/FormWarning";
import Logo from "../Components/shared/Logo";
import axios from "axios";
import { UserDataContext } from "../Context/UserContext";
import { CaptainDataContext } from "../Context/CaptainContext";

const Login = ({ type }) => {
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

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const { setCaptain } = useContext(CaptainDataContext);

  const onSubmit = async (values) => {
    let data;
    if (type === "User") {
      data = {
        email: values.email,
        password: values.password,
      };
    } else if (type === "Captain") {
      data = {
        email: values.email,
        password: values.password,
      };
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}${
        type === "User" ? "/user/login" : "/captain/login"
      }`,
      data
    );

    if (response.status === 200) {
      if (type === "User") {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/user/home");
      } else if (type === "Captain") {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captain/home");
      }
    }
  };

  return (
    <section>
      <Logo type={type} />
      <section className="mx-7 mt-8 flex flex-col gap-40 justify-between h-[calc(100vh - 20vh)]">
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
              {type === "User" ? (
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
        {type === "User" ? (
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

export default Login;
