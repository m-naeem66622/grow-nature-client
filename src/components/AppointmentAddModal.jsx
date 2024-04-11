import { useForm } from "react-hook-form";
import { APPOINTMENTS_URL } from "../constans";
import axios from "axios";
import { notify } from "../utils/notify";
import { toTitleCase } from "../utils/strings";

const AppointmentAddModal = ({ modalRef, caretaker }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({ defaultValues: { purpose: "", start: "", end: "" } });

  const onSubmitHandle = async (data) => {
    const formattedData = { ...data };
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
              {caretaker.services.map((service) => (
                <option key={service} value={service}>
                  {service}
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
