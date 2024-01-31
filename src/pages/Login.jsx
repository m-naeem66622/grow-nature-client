import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import Validate from "../utils/validators";
function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmitHandle = async (data) => {
    console.log("Data:", data);
    // TODO: Send data to server
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-foreground-600">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmitHandle)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full input-md"
              {...register("username", {
                required: true,
                validate: Validate.username,
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.username?.message}
              </span>
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full input-md"
              {...register("password", {
                required: true,
                minLength: 8,
                validate: Validate.password,
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.password?.message}
              </span>
            </div>
          </label>
          <div className="text-sm text-right">
            <Link to="#" className="font-semibold">
              Forgot password?
            </Link>
          </div>

          <div>
            <button type="submit" className="btn btn-primary btn-block">
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-base-content">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-info-content ml-1"
          >
            Create a free account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
