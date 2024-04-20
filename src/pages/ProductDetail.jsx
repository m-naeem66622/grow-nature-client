import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { notify } from "../utils/notify";
import { BASE_URL, PRODUCTS_URL } from "../constans";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${PRODUCTS_URL}/${_id}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching product:", error);
      setError({ ...error.response.data, code: error.response.status });
      setLoading(false);
      notify("error", "Error while fetching product");
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Images */}
        <div className="md:col-span-2 lg:col-span-1">
          <div className="w-full rounded-lg aspect-[4/3]">
            <img
              src={
                (data.src && data.src[selectedImage]?.startsWith("https:")) ||
                data.src[selectedImage]?.startsWith("http:")
                  ? data.src[selectedImage]
                  : `${BASE_URL}/api/v1/${data.src[selectedImage]}`
              }
              alt={data.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* Additional Images Carousel or Thumbnails */}
          <div className="flex mt-2 gap-x-3">
            {data.src?.map((image, index) => (
              <div
                key={index}
                className={`w-1/6 cursor-pointer relative aspect-square ${
                  index === selectedImage
                    ? "border-2 border-blue-500 rounded-lg"
                    : ""
                }`}
                onClick={() => handleImageSelect(index)}
              >
                <img
                  src={
                    image.startsWith("https:") || image.startsWith("http:")
                      ? image
                      : `${BASE_URL}/api/v1/${image}`
                  }
                  alt={data.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Product Details */}
        <div className="md:col-span-1 lg:col-span-1">
          <Heading level={1}>{data.name}</Heading>
          <p className="text-gray-600 mb-2 lg:text-lg">
            {data.price.currency} {data.price.amount}
          </p>
          <p className="text-gray-800 mb-4">{data.description}</p>

          {/* Categories */}
          <div className="mb-4">
            <span className="font-semibold mr-2">Categories:</span>
            {data.categories?.join(", ")}
          </div>

          {/* Pot Size */}
          <div className="mb-4">
            <span className="font-semibold">Pot Size:</span> {data.potSize.size}{" "}
            {data.potSize.unit}
          </div>

          {/* Pot Type */}
          <div className="mb-4">
            <span className="font-semibold">Pot Type:</span> {data.potType}
          </div>

          <div className="mb-4">
            <div className="join join-vertical lg:join-horizontal">
              <button
                className="btn join-item"
                onClick={() => setQuantity(quantity - 1 > 1 ? quantity - 1 : 1)}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <input
                type="number"
                value={quantity}
                className="input input-bordered rounded-none !outline-transparent ms-0 w-28"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                onBlur={(e) =>
                  e.target.value && e.target.value > 1
                    ? setQuantity(parseInt(e.target.value))
                    : setQuantity(1)
                }
              />
              <button
                className="btn join-item"
                onClick={() => setQuantity(quantity + 1)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            {quantity > 1 ? (
              <div className="font-semibold mt-2">
                Total Price: {parseFloat(data.price.amount) * quantity}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <div className="join">
              <button
                onClick={() => dispatch(addToCart({ ...data, quantity }))} // Dispatch the action
                className="btn btn-primary join-item"
              >
                {cartItems.some((item) => item._id === data._id)
                  ? "Update Cart"
                  : "Add to Cart"}
              </button>
              {cartItems.some((item) => item._id === data._id) && (
                <button
                  onClick={() => dispatch(removeFromCart(data._id))} // Dispatch the action
                  className="btn btn-danger join-item"
                >
                  Remove from Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        role="tablist"
        className="tabs tabs-bordered w-min mx-auto mt-12 mb-6"
      >
        <button
          role="tab"
          className={`tab ${activeTab === "description" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("description")}
        >
          Description
        </button>
        <button
          role="tab"
          className={`tab ${activeTab === "reviews" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("reviews")}
        >
          Reviews
        </button>
      </div>
      <div
        className={`tab-content ${activeTab === "description" ? "block" : ""}`}
      >
        <p>{data.longDesc}</p>
      </div>
      <div className={`tab-content ${activeTab === "reviews" ? "block" : ""}`}>
        {data.reviews.length > 0 ? (
          data.reviews.map((review) => (
            <div
              key={review.id}
              className="shadow-lg p-4 mb-4 rounded-lg flex items-start"
            >
              <img
                src={`https://gravatar.com/avatar?s=200&d=mp`}
                alt={`${review.user.firstName} ${review.user.lastName}`}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-medium">
                  {review.user.firstName} {review.user.lastName}
                </h3>
                <p className="text-sm text-gray-500">{review.user.email}</p>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <i
                      key={index}
                      className={`fa fa-star ${
                        index < review.rating
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    ></i>
                  ))}
                  <span className="ml-2 text-gray-600">
                    {review.rating} out of 5
                  </span>
                </div>
                <p className="mt-2">{review.comment}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Reviewed on {new Date(review.updatedAt).toLocaleDateString()}{" "}
                  {review.createdAt !== review.updatedAt ? "(Edited)" : ""}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No reviews yet for this product.</p>
        )}
      </div>
    </Container>
  );
};

export default ProductDetail;
