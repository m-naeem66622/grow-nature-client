import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { notify } from "../utils/notify";
import { PRODUCTS_URL } from "../constans";

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

  const reviews = [
    {
      id: 1,
      author: "John Doe",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
    },
    {
      id: 2,
      author: "Jane Doe",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
    },
  ];

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
              src={data.src && data.src[selectedImage]}
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
                  src={image}
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
        <a
          role="tab"
          className={`tab ${activeTab === "description" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("description")}
        >
          Description
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "reviews" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("reviews")}
        >
          Reviews
        </a>
      </div>
      <div
        className={`tab-content ${activeTab === "description" ? "block" : ""}`}
      >
        <p>{data.longDesc}</p>
      </div>
      <div className={`tab-content ${activeTab === "reviews" ? "block" : ""}`}>
        {reviews.map((review) => (
          <div key={review.id} className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <img
                src={`https://gravatar.com/avatar?s=200&d=mp`}
                alt={review.author}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium">{review.author}</h3>
              <div className="flex items-center">
                <span className="flex">
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
                </span>
                <span className="ml-1 text-gray-600">
                  {review.rating} out of 5
                </span>
              </div>
              <p className="text-gray-800">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ProductDetail;
