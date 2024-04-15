import { useForm } from "react-hook-form";
import { PLANT_SWAPS_URL } from "../constans";
import axios from "axios";
import { notify } from "../utils/notify";
import { toTitleCase } from "../utils/strings";
import { useEffect } from "react";

const AppointmentEditModal = ({ modalRef, data, setIsOpen, updateData }) => {
  const {
    handleSubmit,
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      ...data,
    },
  });

  const onSubmitHandle = async (data) => {
    const formattedData = {
      offeredPlants: data.offeredPlants.map((plant) => plant._id),
      desiredPlants: data.desiredPlants.map((plant) => plant._id),
    };

    try {
      const response = await axios.patch(
        `${PLANT_SWAPS_URL}/${data._id}`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      reset();
      updateData(response.data.data);
      notify("success", response.data.message);
      setIsOpen(false);
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
        <h3 className="font-bold text-lg">Plant Swap</h3>
        <div className="">
          <label className="form-control w-full">
            
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
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AppointmentEditModal;
