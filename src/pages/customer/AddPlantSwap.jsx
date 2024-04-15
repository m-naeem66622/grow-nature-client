import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";
import axios from "axios";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { toTitleCase } from "../../utils/strings";
import { notify } from "../../utils/notify";
import { PLANT_SWAPS_URL, PRODUCTS_URL } from "../../constans";
import debounce from "lodash/debounce";

const AddPlantSwap = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      offeredPlants: [],
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
      const response = await axios.post(PLANT_SWAPS_URL, formattedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

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

  return (
    <Container>
      <Heading level={1}>Add Plant Swap</Heading>
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
              Add Plant Swap
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddPlantSwap;
