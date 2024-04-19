import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Heading from "../../components/Heading";
import { notify } from "../../utils/notify";
import { ORDERS_URL } from "../../constans";
import Container from "../../components/Container";
import { statusColorMap } from "../../staticData";

const OrderDetail = () => {
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ORDERS_URL}/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.log("Error while fetching order:", error.response?.data);
      let errorObj = {};
      if (!error.response)
        errorObj = { code: error.code, message: error.message };
      else errorObj = { ...error.response.data, code: error.response.status };
      setError(errorObj);
      notify("error", errorObj.message);
    }
    setLoading(false);
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
        <Heading className="text-2xl font-semibold text-red-500 mb-4">
          {error.code} Error
        </Heading>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  return (
    <Container>
      <div className="card p-4 md:p-8 shadow-lg">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Order Details</h2>
            <p className=" text-gray-500">Order ID: {data._id}</p>
            <p className=" text-gray-500">
              Placed At: {new Date(data.placedAt).toLocaleString()}
            </p>
          </div>
          <div>
            <div className={`badge badge-lg ${statusColorMap[data.status]}`}>
              {data.status}
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">User Information</h3>
          <p className=" text-gray-500">
            Name: {data.buyer.firstName} {data.buyer.lastName}
          </p>
          <p className=" text-gray-500">Email: {data.buyer.email}</p>
          <p className=" text-gray-500">Phone: {data.buyer.phoneNumber}</p>
        </div>

        {/* Shipping Address */}
        {/* {
                country: { type: String, required: true },
                state: { type: String, required: true },
                city: { type: String, required: true },
                street: { type: String, default: "" },
                zipCode: { type: String, required: true },
              }, */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <p className=" text-gray-500">
            {data.buyer.address.street}, {data.buyer.address.city},{" "}
            {data.buyer.address.state}, {data.buyer.address.country},{" "}
            {data.buyer.address.zipCode}
          </p>
        </div>

        {/* Products */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          {data.orderItems.map((item) => (
            <div className="flex items-center mb-2" key={item.product._id}>
              <Link to={`/product/${item.product._id}`}>
                <img
                  className="w-12 h-12 object-cover rounded-sm mr-4"
                  src={item.product.src[0]}
                  alt={item.product.name}
                />
              </Link>
              <div>
                <p className=" font-semibold">{item.product.name}</p>
                <p className=" text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="">
          <h3 className="text-lg font-semibold mb-2">Pricing Details</h3>
          <p className=" text-gray-500">Items Price: {data.itemsPrice}</p>
          <p className=" text-gray-500">Shipping Price: {data.shippingPrice}</p>
          <p className=" text-gray-500">
            Discounted Price: {data.discountedPrice}
          </p>
          <p className=" text-gray-500">Total Price: {data.totalPrice}</p>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetail;
