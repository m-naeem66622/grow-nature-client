import { useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { toTitleCase } from "../../utils/strings";
import { PRODUCTS_URL } from "../../constans";
import { notify } from "../../utils/notify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const defaultValues = {
  src: [],
  name: "",
  categories: [],
  shortDesc: "",
  price: { amount: 0, currency: "PKR" },
  potSize: { size: 0, unit: "inches" },
  potType: "",
  longDesc: "",
};

const AddProduct = () => {
  const theme = useSelector((state) => state.theme.name);
  const animatedComponents = makeAnimated();
  const [inputValue, setInputValue] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
    getValues,
    reset,
    setError,
  } = useForm({
    defaultValues,
  });

  watch("src");

  const onSubmitHandle = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    Array.from(data.src).forEach((file) => formData.append("images", file));
    data.categories.forEach((category) => {
      formData.append("categories[]", category.value);
    });
    formData.append("shortDesc", data.shortDesc);
    formData.append("longDesc", data.longDesc);
    formData.append("price[amount]", data.price.amount);
    formData.append("price[currency]", data.price.currency);
    if (data.potSize.size > 0) {
      formData.append("potSize[size]", data.potSize.size);
      formData.append("potSize[unit]", data.potSize.unit);
    }
    data.potType?.trim() && formData.append("potType", data.potType);

    try {
      const response = await axios.post(PRODUCTS_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      reset(defaultValues);
      notify("success", response.data.message);
    } catch (error) {
      console.log("Error:", error.response?.data);
      let message;

      if (!error.response) message = error.message;
      else message = toTitleCase(error.response?.data.message);

      for (const key in error.response?.data.error) {
        setError(error.response?.data.error[key].split(" ")[0], {
          type: "manual",
          message: error.response?.data.error[key],
        });
      }

      notify("error", message);
    }
  };

  const handleKeyDown = (event, field) => {
    if (!inputValue) return;
    if (["Enter", "Tab", ","].includes(event.key)) {
      field.onChange([
        ...field.value,
        { label: inputValue, value: inputValue },
      ]);
      setInputValue("");
      event.preventDefault();
    }
  };

  return (
    <Container>
      <Heading level={1}>Add Product</Heading>
      <div className="mt-10 mx-auto w-full max-w-sm sm:max-w-full">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="flex flex-col sm:flex-row justify-between sm:gap-x-3">
            <div className="join gap-x-2">
              {Array.from(getValues("src")).map((file, index) => (
                <div key={index} className="aspect-square w-24 h-24">
                  <img
                    className="h-full w-full object-cover rounded-md"
                    src={URL.createObjectURL(file)}
                    alt="..."
                  />
                </div>
              ))}
            </div>
            <label className="form-control w-full sm:w-1/2">
              <div className="label">
                <span className="label-text">Product Image</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("src", {
                  required: "Product image is required",
                })}
                multiple
              />
              {getValues("src").length > 0 && (
                <div className="font-semibold mt-4">
                  {getValues("src").length} Files added.
                </div>
              )}
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors?.src?.message}
                </span>
              </div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:gap-x-3">
            <label className="form-control w-full sm:w-1/2">
              <div className="label">
                <span className="label-text">Product Name</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full input-md"
                {...register("name", {
                  required: "Product name is required",
                })}
              />
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors?.name?.message}
                </span>
              </div>
            </label>

            <label className="form-control w-full sm:w-1/2">
              <div className="label">
                <span className="label-text">Categories</span>
              </div>
              <Controller
                name="categories"
                control={control}
                rules={{
                  required: "Categories is required",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    components={animatedComponents}
                    inputValue={inputValue}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    onChange={(newValue) => field.onChange(newValue)}
                    onInputChange={(newValue) => setInputValue(newValue)}
                    onKeyDown={(e) => handleKeyDown(e, field)}
                    placeholder="Type something and press enter or tab..."
                    value={field.value}
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        backgroundColor: "transparent",
                        color: "#a6adbb",
                        minHeight: "48px",
                        borderRadius: "8px",
                      }),
                      placeholder: (styles) => ({
                        ...styles,
                        color: theme === "dark" ? "#a6adbb" : "#1d232a",
                      }),
                      input: (styles) => ({
                        ...styles,
                        color: theme === "dark" ? "#a6adbb" : "#1d232a",
                      }),
                    }}
                  />
                )}
              />
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors?.categories?.message}
                </span>
              </div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:gap-x-3">
            <label className="form-control w-full sm:w-1/3">
              <div className="label">
                <span className="label-text">Pot Type</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full input-md"
                {...register("potType")}
              />
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors?.potType?.message}
                </span>
              </div>
            </label>

            <label className="form-control w-full sm:w-1/3">
              <div className="label">
                <span className="label-text">
                  Pot Size (If not applicable leave it as 0)
                </span>
              </div>
              <div className="join join-horizontal items-center">
                <input
                  type="number"
                  className="input input-bordered w-full input-md join-item"
                  {...register("potSize.size")}
                />
                <div className="join-item btn btn-bordered">
                  {toTitleCase(getValues("potSize.unit"))}
                </div>
              </div>
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors?.potSize?.size?.message}
                </span>
              </div>
            </label>

            <label className="form-control w-full sm:w-1/3">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <div className="join join-horizontal items-center">
                <div className="join-item btn btn-bordered">
                  {getValues("price.currency")}
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full input-md join-item"
                  {...register("price.amount", {
                    required: "Price is required",
                    min: {
                      value: 1,
                      message: "Price must be positive number",
                    },
                  })}
                />
              </div>
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors?.price?.amount?.message}
                </span>
              </div>
            </label>
          </div>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Short Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered w-full textarea-md"
              {...register("shortDesc", {
                required: "Short description is required",
              })}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.shortDesc?.message}
              </span>
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Long Description</span>
            </div>
            <Controller
              name="longDesc"
              control={control}
              defaultValue=""
              rules={{
                required: "Long description is required",
              }}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  onChange={(newValue) => field.onChange(newValue)}
                  value={field.value}
                  theme="snow"
                />
              )}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.longDesc?.message}
              </span>
            </div>
          </label>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddProduct;
