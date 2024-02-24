import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Validate from "../utils/validators";
import axios from "axios";
import { USERS_URL } from "../constans";
import { notify } from "../utils/notify";
import { toTitleCase } from "../utils/strings";
import { setCredentials } from "../slices/authSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandle = async (data) => {
    try {
      const response = await axios.post(`${USERS_URL}/register`, data);
      dispatch(setCredentials(response.data));
      navigate("/");
      notify("success", "You have successfully signed in!");
    } catch (error) {
      let message;

      if (!error.response) message = error.message;
      else message = toTitleCase(error.response?.data.message);

      for (const key in error.response?.data.error) {
        setError(key, {
          type: "manual",
          message: error.response?.data.error[key],
        });
      }

      console.log("Error:", error.response?.data);
      notify("error", message);
    }
  };

  useEffect(() => {
    console.log("Errors:", errors);
  }, [errors]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-foreground-600">
          Create your free account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmitHandle)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              placeholder="John"
              className="input input-bordered w-full input-md"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 3,
                  message: "First name must be at least 3 characters long",
                },
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.firstName?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="Doe"
              className="input input-bordered w-full input-md"
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 3,
                  message: "Last name must be at least 3 characters long",
                },
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.lastName?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered w-full input-md"
              {...register("email", {
                required: true,
                validate: Validate.email,
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.email?.message}
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
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-base-content">
          Already a member?
          <Link to="/register" className="font-semibold leading-6 ml-1">
            Login to your account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
