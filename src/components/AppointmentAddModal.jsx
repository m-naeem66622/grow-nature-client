import { useForm } from "react-hook-form";
import { APPOINTMENTS_URL } from "../constans";
import axios from "axios";
import { notify } from "../utils/notify";
import { toTitleCase } from "../utils/strings";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const AppointmentAddModal = ({ modalRef, caretaker }) => {
  const formRef = useRef(null);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [formParams, setFormParams] = useState({
    CUSTOMER_MOBILE_NO: userInfo.phoneNumber,
    CUSTOMER_EMAIL_ADDRESS: userInfo.email,
    TXNDESC: "Payment for products",
    CHECKOUT_URL: `${APPOINTMENTS_URL}/payfast/checkout`,
    ORDER_DATE: new Date().toISOString().substring(0, 10),
    CUSTOMER_NAME: `${userInfo.firstName} ${userInfo.lastName}`,
    CUSTOMER_ID: userInfo._id,
    COUNTRY: userInfo.address.country,
    SHIPPING_STATE_PROVINCE: userInfo.address.state,
    SHIPPING_ADDRESS_CITU: userInfo.address.city,
    SHIPPING_POSTALCODE: userInfo.address.zipCode,
    SHIPPING_ADDRESS_1: `${userInfo.address.street}, ${userInfo.address.city}, ${userInfo.address.state}, ${userInfo.address.country} - ${userInfo.address.zipCode}`,
    SUCCESS_URL: `${window.location.origin}/user/appointments`,
    FAILURE_URL: `${window.location.origin}/user/appointments`,
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({ defaultValues: { purpose: "", start: "", end: "" } });

  const onSubmitHandle = async (data) => {
    const formattedData = {
      ...data,
      price: caretaker.services.find(({ service }) => service === data.purpose)
        .price,
    };
    formattedData.caretaker = caretaker._id;

    try {
      const response = await axios.post(`${APPOINTMENTS_URL}`, formattedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      reset();
      modalRef.current.close();
      notify("success", response.data.message);

      setFormParams({ ...formParams, ...response.data.formParams });

      // Redirect to Payment Gateway after 1 second
      notify("info", "Hang Tight! Redirecting to payment gateway...");
      setTimeout(() => {
        console.log("formParams:", formParams);
        console.log("formRef:", formRef.current);

        formRef.current.click();
      }, 1000);
    } catch (error) {
      let message;

      if (!error.response) message = error.message;
      else message = toTitleCase(error.response?.data.error.message);

      if (error.response?.status === 400) {
        for (const key in error.response?.data.error) {
          setError(key, {
            type: "manual",
            message: error.response?.data.error[key],
          });
        }
      }

      console.log("Error:", error.response?.data);
      notify("error", message);
    }
  };

  return (
    <dialog ref={modalRef} id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Appointment Schedule</h3>
        <div className="">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Start Date/Time</span>
            </div>
            <input
              type="datetime-local"
              className="input input-bordered w-full input-md"
              {...register("start", {
                required: "Start date/time is required",
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.start?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">End Date/Time</span>
            </div>
            <input
              type="datetime-local"
              className="input input-bordered w-full input-md"
              {...register("end", {
                required: "Start date/time is required",
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.end?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Purpose</span>
            </div>
            <select
              className="select select-bordered w-full"
              defaultValue=""
              {...register("purpose", { required: "Purpose is required" })}
            >
              <option value="" disabled>
                Select the purpose
              </option>
              {caretaker.services.map(({ service, price }) => (
                <option key={service} value={service}>
                  {service} - {price} PKR
                </option>
              ))}
            </select>
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.purpose?.message}
              </span>
            </div>
          </label>
        </div>
        <p className="text-blue-600 text-sm text-wrap">
          Please note: When you click &quot;Confirm&quot;, your appointment will
          be placed and you will then be redirected to the payment page to
          complete your purchase.
        </p>
        <form
          method="POST"
          action="https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction"
        >
          {Object.keys(formParams).map((key) => (
            <input key={key} type="hidden" name={key} value={formParams[key]} />
          ))}
          <button type="submit" className="hidden" ref={formRef}>
            Submit
          </button>
        </form>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => {
              clearErrors();
              modalRef.current.close();
            }}
          >
            Close
          </button>
          <button
            onClick={handleSubmit(onSubmitHandle)}
            className="btn btn-primary"
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AppointmentAddModal;
