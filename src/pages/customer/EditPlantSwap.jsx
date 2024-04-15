import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";
import axios from "axios";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { toTitleCase } from "../../utils/strings";
import { notify } from "../../utils/notify";
import { PLANT_SWAPS_URL, PRODUCTS_URL } from "../../constans";
import debounce from "lodash/debounce";

const EditPlantSwap = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      offeredPlants: [
        {
          _id: "65d0ea1a4846e7829baf0733",
          name: "Brown Pumpkin Cactus (Grafted)",
          price: {
            amount: 4500,
            currency: "PKR",
            _id: "661c73a9fbd529211e7b807a",
          },
        },
      ],
      desiredPlants: [],
    },
  });

  watch("offeredPlants");
  watch("desiredPlants");

  const onSubmitHandle = async (data) => {
    const formattedData = {
      offeredPlants: data.offeredPlants.map((plant) => plant._id),
      desiredPlants: data.desiredPlants.map((plant) => plant._id),
    };

    try {
      const response = await axios.put(
        `${PLANT_SWAPS_URL}/${_id}`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      notify("success", response.data.message);
      navigate("/user/plant-swaps");
    } catch (error) {
      console.log("Error:", error.response?.data);
      let message;
      if (!error.response) message = error.message;
      else message = toTitleCase(error.response?.data.error.message);
      notify("error", message);
    }
  };

  const fetchPlantSwap = async () => {
    try {
      const response = await axios.get(`${PLANT_SWAPS_URL}/${_id}`);
      console.log("Response:", response.data.data);
      setValue("offeredPlants", response.data.data.offeredPlants);
      setValue("desiredPlants", response.data.data.desiredPlants);
    } catch (error) {
      console.log("Error:", error.response?.data);
      let errorObj = {};
      if (!error.response)
        errorObj = { code: error.code, message: error.message };
      else
        errorObj = {
          ...error.response.data.error,
          code: error.response.status,
        };
      setError(errorObj);
      notify("error", errorObj.message);
    }
    setLoading(false);
  };

  const loadOptions = debounce((inputValue, callback) => {
    if (inputValue.length < 1) {
      callback([{ value: "", label: "Start typing to search plants" }]);
      return;
    }

    axios
      .get(`${PRODUCTS_URL}?name=${inputValue}`)
      .then((response) => {
        const options = response.data.data.map((plant) => ({
          value: plant._id,
          label: plant.name,
        }));
        callback(options);
      })
      .catch((error) => {
        console.log("Error:", error.response?.data);
        callback([{ value: "", label: "No plants found" }]);
      });
  }, 500); // 500ms debounce time for API call each time user types

  useEffect(() => {
    fetchPlantSwap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          {error.code} Error
        </h2>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  return (
    <Container>
      <Heading level={1}>Edit Plant Swap</Heading>
      <div className="mt-10 mx-auto w-full max-w-sm sm:max-w-full">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="">
            <Heading level={2} className="">
              Offered Plants
            </Heading>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Add Products</span>
              </div>
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                placeholder="Search Plants"
                isClearable
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    getValues("offeredPlants").some(
                      (plant) => plant._id === selectedOption.value
                    )
                      ? notify("info", "Plant already added")
                      : setValue("offeredPlants", [
                          ...getValues("offeredPlants"),
                          {
                            _id: selectedOption.value,
                            name: selectedOption.label,
                          },
                        ]);
                  }
                }}
              />
            </label>
            <ul className="list-decimal ml-8">
              {getValues("offeredPlants").map((plant) => (
                <li key={plant._id}>
                  <div className="flex justify-between">
                    <span>{plant.name}</span>
                    <button
                      className="btn btn-sm btn-circle"
                      onClick={() => {
                        setValue(
                          "offeredPlants",
                          getValues("offeredPlants").filter(
                            (p) => p._id !== plant._id
                          )
                        );
                      }}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <Heading level={2} className="">
              Desired Plants
            </Heading>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Add Products</span>
              </div>
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                placeholder="Search Plants"
                isClearable
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    getValues("desiredPlants").some(
                      (plant) => plant._id === selectedOption.value
                    )
                      ? notify("info", "Plant already added")
                      : setValue("desiredPlants", [
                          ...getValues("desiredPlants"),
                          {
                            _id: selectedOption.value,
                            name: selectedOption.label,
                          },
                        ]);
                  }
                }}
              />
            </label>
            <ul className="list-decimal ml-8">
              {getValues("desiredPlants").map((plant) => (
                <li key={plant._id}>
                  <div className="flex justify-between">
                    <span>{plant.name}</span>
                    <button
                      className="btn btn-sm btn-circle"
                      onClick={() => {
                        setValue(
                          "desiredPlants",
                          getValues("desiredPlants").filter(
                            (p) => p._id !== plant._id
                          )
                        );
                      }}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default EditPlantSwap;
