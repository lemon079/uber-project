import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Components/shared/Logo";
import axios from "axios";
import FormWarning from "../Components/shared/FormWarning";
import { UserDataContext } from "../Context/UserContext";
import { CaptainDataContext } from "../Context/CaptainContext";

const Signup = ({ type }) => {
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
  const { setCaptain } = useContext(CaptainDataContext);

  const onSubmit = async (values) => {
    let data;

    if (type === "User") {
      data = {
        fullName: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        email: values.email,
        password: values.password,
      };
    } else if (type === "Captain") {
      data = {
        fullName: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        email: values.email,
        password: values.password,
        vehicle: {
          vehicleType: values.vehicleType,
          color: values.color,
          plate: values.plate,
          capacity: values.capacity,
        },
      };
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}${
        type === "User" ? "/user/signup" : "/captain/signup"
      }`,
      data
    );

    if (response.status === 201) {
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
      <section className="mx-7 mt-8 flex flex-col gap-40 justify-between h-[calc(100vh-20vh)]">
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
          {/* Additional Fields for Captains */}
          {type === "Captain" && (
            <>
              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="vehicleType"
                    className="font-extrabold text-lg"
                  >
                    Vehicle Type
                  </label>
                  <select
                    id="vehicleType"
                    className="form-input bg-gray-200 rounded p-2 outline-0"
                    {...register("vehicleType", {
                      required: "Vehicle Type is required",
                    })}
                  >
                    <option value="">Select Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="auto">Auto</option>
                  </select>
                  {errors.vehicleType && (
                    <FormWarning warning={errors.vehicleType.message} />
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="plate" className="font-extrabold text-lg">
                    Plate Number
                  </label>
                  <input
                    className="form-input uppercase"
                    id="plate"
                    type="text"
                    {...register("plate", {
                      required: "Plate Number is required",
                    })}
                  />
                  {errors.plate && (
                    <FormWarning warning={errors.plate.message} />
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <label htmlFor="color" className="font-extrabold text-lg">
                    Color
                  </label>
                  <input
                    className="form-input"
                    id="color"
                    type="text"
                    {...register("color", { required: "Color is required" })}
                  />
                  {errors.color && (
                    <FormWarning warning={errors.color.message} />
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="capacity" className="font-extrabold text-lg">
                    Capacity
                  </label>
                  <input
                    className="form-input"
                    id="capacity"
                    type="text"
                    {...register("capacity", {
                      required: "Capacity is required",
                    })}
                  />
                  {errors.capacity && (
                    <FormWarning warning={errors.capacity.message} />
                  )}
                </div>
              </div>
            </>
          )}

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
              {type === "User" ? (
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

export default Signup;
