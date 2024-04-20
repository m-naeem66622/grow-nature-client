import { useForm } from "react-hook-form";
import { PRODUCTS_URL } from "../constans";
import axios from "axios";
import { notify } from "../utils/notify";
import { toTitleCase } from "../utils/strings";
import { useEffect } from "react";

const ReviewEditModal = ({
  modalRef,
  review,
  product,
  setIsOpen,
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
  } = useForm({ defaultValues: review });

  watch("rating");

  const onSubmitHandle = async (data) => {
    const formattedData = {
      order: review.order,
      rating: data.rating,
      comment: data.comment,
    };
    try {
      const response = await axios.patch(
        `${PRODUCTS_URL}/${product._id}/review`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      reset();
      updateData(response.data.data, product.index, review.index);
      notify("success", response.data.message);
      setIsOpen(false);
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
      } else {
        setIsOpen(false);
      }

      console.log("Error:", error.response?.data);
      notify("error", message);
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setIsOpen]);

  return (
    <dialog ref={modalRef} id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Review</h3>
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
              setIsOpen(false);
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

export default ReviewEditModal;
