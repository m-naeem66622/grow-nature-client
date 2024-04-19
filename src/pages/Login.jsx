import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Validate from "../utils/validators";
import { toTitleCase } from "../utils/strings";
import { notify } from "../utils/notify";
import { setCredentials } from "../slices/authSlice";
import { USERS_URL } from "../constans";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandle = async (data) => {
    try {
      const response = await axios.post(`${USERS_URL}/login`, data);
      dispatch(setCredentials(response.data));
      navigate("/");
      notify("success", "You have successfully signed in!");
    } catch (error) {
      console.log("Error:", error.response?.data);
      let notifyMsg = {
        type: "error",
        message: "Oops! Something went wrong...",
      };

      if (!error.response) notifyMsg.message = error.message;
      if (error.response?.status === 401)
        notifyMsg.message = toTitleCase(error.response.data.message);
      if (error.response?.status === 403)
        notifyMsg.message = toTitleCase(error.response.data.message);

      notify(notifyMsg.type, notifyMsg.message);
    }
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
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="example@email.com"
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
