import { useForm } from "react-hook-form";
import { PRODUCTS_URL, USERS_URL } from "../constans";
import axios from "axios";
import { notify } from "../utils/notify";
import { toTitleCase } from "../utils/strings";

const ReviewAddModal = ({
  modalRef,
  order,
  reviewTo,
  reviewFor = "product",
  updateData,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
    reset,
  } = useForm({ defaultValues: { rating: "", comment: "" } });

  watch("rating");

  const onSubmitHandle = async (data) => {
    const formattedData = { ...data };
    if (reviewFor === "product") formattedData.order = order;
    try {
      const response = await axios.post(
        `${reviewFor === "product" ? PRODUCTS_URL : USERS_URL}/${
          reviewTo._id
        }/review`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      reset();
      updateData(response.data.data, null, reviewTo.index);
      modalRef.current.close();
      notify("success", response.data.message);
    } catch (error) {
      let message;

      if (!error.response) message = error.message;
      else message = toTitleCase(error.response?.data.message);

      if (error.response?.status === 400) {
        for (const key in error.response?.data.error) {
          setError(key, {
            type: "manual",
            message: error.response?.data.error[key],
          });
        }
      }

      if (error.response?.status === 422) {
        reset();
      }

      if (error.response?.status !== 400) modalRef.current.close();
      console.log("Error:", error.response?.data);
      notify("error", message);
    }
  };

  return (
    <dialog ref={modalRef} id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Review</h3>
        <div className="">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Rating</span>
            </div>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`rating-star ${
                    value <= getValues("rating")
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => setValue("rating", value)}
                >
                  <i className="fas fa-star"></i>
                </span>
              ))}
            </div>
            <input
              type="hidden"
              {...register("rating", {
                required: "Rating is required",
                min: 1,
                max: 5,
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.rating?.message}
              </span>
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Comment</span>
            </div>
            <textarea
              className="textarea textarea-bordered textarea-sm"
              {...register("comment", {
                required: "Comment is required",
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.start?.message}
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
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ReviewAddModal;
