import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import axios from "axios";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { toTitleCase } from "../../utils/strings";
import { notify } from "../../utils/notify";
import { BASE_URL, PRODUCTS_URL } from "../../constans";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const defaultValues = {
  images: [],
  name: "",
  categories: [],
  shortDesc: "",
  price: { amount: 0, currency: "PKR" },
  potSize: { size: 0, unit: "inches" },
  potType: "",
  longDesc: "",
};

const EditProduct = () => {
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesUrl, setImagesUrl] = useState([]); // To hold images url already stored on server
  const theme = useSelector((state) => state.theme.name);
  const [inputValue, setInputValue] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
    getValues,
    setValue,
    setError: setErrors,
  } = useForm({
    defaultValues,
  });

  watch("images");

  const onSubmitHandle = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    Array.from(data.images).forEach((file) => formData.append("images", file));
    imagesUrl.forEach((url) => formData.append("src[]", url));
    data.categories.forEach((category) => {
      formData.append("categories[]", category.value);
    });
    formData.append("shortDesc", data.shortDesc);
    formData.append("longDesc", data.longDesc);
    formData.append("price[amount]", data.price.amount);
    formData.append("price[currency]", data.price.currency);
    if (data.potSize?.size && data.potSize.size > 0) {
      formData.append("potSize[size]", data.potSize.size);
      formData.append("potSize[unit]", data.potSize.unit);
    }
    data.potType?.trim() && formData.append("potType", data.potType);

    try {
      const response = await axios.put(`${PRODUCTS_URL}/${_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      notify("success", response.data.message);
      navigate("/admin/products");
    } catch (error) {
      console.log("Error:", error.response?.data);
      let message;

      if (!error.response) message = error.message;
      else message = toTitleCase(error.response?.data.message);

      for (const key in error.response?.data.error) {
        setErrors(error.response?.data.error[key].split(" ")[0], {
          type: "manual",
          message: error.response?.data.error[key],
        });
      }

      notify("error", message);
    }
  };

  const handleKeyDown = (event, field) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        field.onChange([
          ...field.value,
          { label: inputValue, value: inputValue },
        ]);
        setInputValue("");
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${PRODUCTS_URL}/${_id}`);
      setImagesUrl(response.data.src);
      setValue("name", response.data.name);
      setValue(
        "categories",
        response.data.categories.map((category) => ({
          label: category,
          value: category,
        }))
      );
      setValue("shortDesc", response.data.shortDesc);
      setValue("price.amount", response.data.price.amount);
      setValue("price.currency", response.data.price.currency);

      if (response.data.potSize) {
        setValue("potSize.size", response.data.potSize.size);
        setValue("potSize.unit", response.data.potSize.unit);
      } else {
        setValue("potSize.size", 0);
        setValue("potSize.unit", "inches");
      }

      setValue("potType", response.data.potType);
      setValue("longDesc", response.data.longDesc);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching product:", error);
      setError({ ...error.response.data, code: error.response.status });
      setLoading(false);
      notify("error", "Error while fetching product");
    }
  };

  useEffect(() => {
    console.log("Errors:", errors);
  }, [errors]);

  useEffect(() => {
    fetchProduct();

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
      <Heading level={1}>Edit Product</Heading>
      <div className="mt-10 mx-auto w-full max-w-sm sm:max-w-full">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="flex flex-col sm:flex-row justify-between sm:gap-x-3">
            <div className="join gap-x-2">
              {imagesUrl.map((image, index) => (
                <div key={index} className="aspect-square w-24 h-24 relative">
                  <button
                    type="button"
                    className="btn btn-xs btn-circle btn-error absolute -right-1 -bottom-1"
                    onClick={() => {
                      setImagesUrl(imagesUrl.filter((img, i) => i !== index));
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <img
                    className="h-full w-full object-cover rounded-md"
                    src={
                      image.startsWith("https:")
                        ? image
                        : `${BASE_URL}/api/v1/${image}`
                    }
                    alt="..."
                  />
                </div>
              ))}
              {Array.from(getValues("images")).map((file, index) => (
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
                {...register("images", {
                  validate: (value) => {
                    if (value.length + imagesUrl.length <= 0) {
                      return "Product image is required";
                    }
                  },
                })}
                multiple
              />
              {getValues("images").length > 0 && (
                <div className="font-semibold mt-4">
                  {getValues("images").length} Files added.
                </div>
              )}
              <div className="label">
                {errors?.src && (
                  <span className="label-text-alt text-error">
                    {errors?.src?.message}
                  </span>
                )}
                {errors?.images && (
                  <span className="label-text-alt text-error">
                    {errors?.images?.message}
                  </span>
                )}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default EditProduct;
