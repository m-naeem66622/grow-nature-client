import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Validate from "../utils/validators";
import axios from "axios";
import { USERS_URL } from "../constans";
import { notify } from "../utils/notify";
import { formatTime, toTitleCase } from "../utils/strings";
import { setCredentials } from "../slices/authSlice";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  bio: "",
  experience: [],
  speciality: "",
  services: [],
  pricing: [],
  availability: [],
};

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCaretaker, setIsCaretaker] = useState(false);
  const [fields, setFields] = useState({
    experience: "",
    services: "",
    pricing: { service: "", price: "" },
    availability: { day: "", start: "00:00", end: "00:00" },
  });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
    setValue,
  } = useForm({ defaultValues });

  // watch experience, pricing, services, availability
  const watchExperience = watch("experience");
  const watchPricing = watch("pricing");
  const watchServices = watch("services");
  const watchAvailability = watch("availability");

  const onSubmitHandle = async (data) => {
    const formattedData = isCaretaker
      ? {...data, role: "CARETAKER"}
      : {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          address: data.address,
        };

    try {
      const response = await axios.post(
        `${USERS_URL}/register${isCaretaker ? "/caretaker" : ""}`,
        formattedData
      );
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
    clearErrors();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchExperience, watchPricing, watchServices, watchAvailability]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-foreground-600">
          Create your free account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
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
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              type="tel"
              placeholder="1234567890"
              className="input input-bordered w-full input-md"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.phoneNumber?.message}
              </span>
            </div>
          </label>
          <div className="divider"></div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Country</span>
            </div>
            <input
              type="text"
              placeholder="Pakistan"
              className="input input-bordered w-full input-md"
              {...register("address.country", {
                required: "Country is required",
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.address?.country?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">State</span>
            </div>
            <input
              type="text"
              placeholder="Punjab"
              className="input input-bordered w-full input-md"
              {...register("address.state", {
                required: "State is required",
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.address?.state?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">City</span>
            </div>
            <input
              type="text"
              placeholder="Lahore"
              className="input input-bordered w-full input-md"
              {...register("address.city", {
                required: "City is required",
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.address?.city?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Street</span>
            </div>
            <input
              type="text"
              placeholder="123 Street"
              className="input input-bordered w-full input-md"
              {...register("address.street", {
                required: "Street is required",
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.address?.street?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Zip Code</span>
            </div>
            <input
              type="text"
              placeholder="12345"
              className="input input-bordered w-full input-md"
              {...register("address.zipCode", {
                required: "Zip code is required",
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.address?.zipCode?.message}
              </span>
            </div>
          </label>
          {/* Add a checkbox switch to toggle between caretaker or regualr registration */}
          <div className="form-control w-full">
            <label className="label cursor-pointer">
              <span className="label-text">Register as a Caretaker</span>
              <input
                onChange={() => setIsCaretaker(!isCaretaker)}
                type="checkbox"
                className="checkbox"
              />
            </label>
          </div>
          {isCaretaker && (
            <>
              <div className="divider"></div>
              {/* If isCaretaker is true, render the following fields */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Bio</span>
                </div>
                <textarea
                  placeholder="Tell us about yourself"
                  className="textarea textarea-bordered w-full"
                  {...register("bio", {
                    required: "Bio is required",
                  })}
                />
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors?.bio?.message}
                  </span>
                </div>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Experience</span>
                </div>
                <span className="join">
                  <input
                    type="text"
                    placeholder="Watering"
                    className="input input-bordered w-full input-md join-item"
                    onChange={(e) => {
                      setFields({ ...fields, experience: e.target.value });
                    }}
                    value={fields.experience}
                  />
                  <button
                    type="button"
                    className="join-item btn"
                    onClick={(e) => {
                      if (!fields.experience.trim()) return;
                      const newExperience = [
                        ...getValues("experience"),
                        fields.experience,
                      ];
                      setValue("experience", newExperience);
                      setFields({ ...fields, experience: "" });
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </span>
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors?.experience?.message}
                  </span>
                </div>
                <ul className="join join-vertical bg-base-200">
                  {getValues("experience").map((exp, index) => (
                    <div
                      key={index}
                      className="join-item flex w-full justify-between"
                    >
                      <span className="border border-1 border-r-0 p-2 w-full text-sm">
                        {exp}
                      </span>
                      <button
                        type="button"
                        className="border border-1 p-2"
                        onClick={() => {
                          const newExperience = getValues("experience").filter(
                            (item) => item !== exp
                          );
                          setValue("experience", newExperience);
                        }}
                      >
                        <span className="p-2 text-error">
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </button>
                    </div>
                  ))}
                </ul>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Speciality</span>
                </div>
                <input
                  type="text"
                  placeholder="Cacti"
                  className="input input-bordered w-full input-md"
                  {...register("speciality", {
                    required: "Speciality is required",
                  })}
                />
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors?.speciality?.message}
                  </span>
                </div>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Services</span>
                </div>
                <span className="join">
                  <input
                    type="text"
                    placeholder="Watering"
                    className="input input-bordered w-full input-md join-item"
                    onChange={(e) => {
                      setFields({ ...fields, services: e.target.value });
                    }}
                    value={fields.services}
                  />
                  <button
                    type="button"
                    className="join-item btn"
                    onClick={(e) => {
                      if (!fields.services.trim()) return;
                      const newServices = [
                        ...getValues("services"),
                        fields.services,
                      ];
                      setValue("services", newServices);
                      setFields({ ...fields, services: "" });
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </span>
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors?.services?.message}
                  </span>
                </div>
                <ul className="join join-vertical bg-base-200">
                  {getValues("services").map((service, index) => (
                    <div
                      key={index}
                      className="join-item flex w-full justify-between"
                    >
                      <span className="border border-1 border-r-0 p-2 w-full text-sm">
                        {service}
                      </span>
                      <button
                        type="button"
                        className="border border-1 p-2"
                        onClick={() => {
                          const newServices = getValues("services").filter(
                            (item) => item !== service
                          );
                          setValue("services", newServices);
                        }}
                      >
                        <span className="p-2 text-error">
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </button>
                    </div>
                  ))}
                </ul>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Pricing</span>
                </div>
                <span className="join">
                  <input
                    name="service"
                    type="text"
                    placeholder="Watering"
                    className="input input-bordered w-full input-md join-item"
                    onChange={(e) => {
                      setFields({
                        ...fields,
                        pricing: { service: e.target.value },
                      });
                    }}
                    value={fields.pricing.service}
                  />
                  <input
                    name="price"
                    type="text"
                    placeholder="1200"
                    className="input input-bordered w-full input-md join-item"
                    onChange={(e) => {
                      setFields({
                        ...fields,
                        pricing: { ...fields.pricing, price: e.target.value },
                      });
                    }}
                    value={fields.pricing.price}
                  />
                  <button
                    type="button"
                    className="join-item btn"
                    onClick={(e) => {
                      if (
                        !fields.pricing.service.trim() ||
                        !fields.pricing.price.trim()
                      )
                        return;
                      const newPricing = [
                        ...getValues("pricing"),
                        fields.pricing,
                      ];
                      setValue("pricing", newPricing);
                      setFields({
                        ...fields,
                        pricing: { service: "", price: "" },
                      });
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </span>
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors?.pricing?.message}
                  </span>
                </div>
                <ul className="join join-vertical bg-base-200">
                  {getValues("pricing").map((price, index) => (
                    <div key={index} className="join-item flex w-full">
                      <span className="border border-1 border-r-0 p-2 w-full text-sm">
                        {price.service}: ${price.price}
                      </span>
                      <button type="button" className="border border-1 p-2">
                        <span className="p-2 text-error">
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </button>
                    </div>
                  ))}
                </ul>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Availability</span>
                </div>
                <span className="join">
                  <select
                    className="select select-bordered join-item"
                    name="day"
                    onChange={(e) => {
                      setFields({
                        ...fields,
                        availability: {
                          ...fields.availability,
                          day: e.target.value,
                        },
                      });
                    }}
                    value={fields.availability.day}
                  >
                    <option value="">Select</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                  <input
                    type="time"
                    placeholder="Start"
                    className="input input-bordered w-full input-md join-item"
                    onChange={(e) => {
                      setFields({
                        ...fields,
                        availability: {
                          ...fields.availability,
                          start: e.target.value,
                        },
                      });
                    }}
                    value={fields.availability.start}
                  />
                  <input
                    type="time"
                    placeholder="End"
                    className="input input-bordered w-full input-md join-item"
                    onChange={(e) => {
                      setFields({
                        ...fields,
                        availability: {
                          ...fields.availability,
                          end: e.target.value,
                        },
                      });
                    }}
                    value={fields.availability.end}
                  />
                  <button
                    type="button"
                    className="join-item btn"
                    onClick={(e) => {
                      if (
                        !fields.availability.day ||
                        !fields.availability.start ||
                        !fields.availability.end
                      )
                        return;
                      const newAvailability = [
                        ...getValues("availability"),
                        {
                          ...fields.availability,
                          start: fields.availability.start.replace(":", ""),
                          end: fields.availability.end.replace(":", ""),
                        },
                      ];
                      setValue("availability", newAvailability);
                      setFields({
                        ...fields,
                        availability: { day: "", start: "00:00", end: "00:00" },
                      });
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </span>
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors?.availability?.message}
                  </span>
                </div>
                <ul className="join join-vertical bg-base-200">
                  {getValues("availability").map((avail, index) => (
                    <div
                      key={index}
                      className="join-item flex w-full justify-between"
                    >
                      <span className="border border-1 border-r-0 p-2 w-full text-sm">
                        {avail.day}: {formatTime(avail.start)} -{" "}
                        {formatTime(avail.end)}
                      </span>
                      <button
                        type="button"
                        className="border border-1 p-2"
                        onClick={() => {
                          const newAvailability = getValues(
                            "availability"
                          ).filter(
                            (item) =>
                              item.day !== avail.day &&
                              item.start !== avail.start &&
                              item.end !== avail.end
                          );
                          setValue("availability", newAvailability);
                        }}
                      >
                        <span className="p-2 text-error">
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </button>
                    </div>
                  ))}
                </ul>
              </label>
            </>
          )}
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
