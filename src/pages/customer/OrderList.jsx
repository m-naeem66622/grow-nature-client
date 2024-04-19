import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { notify } from "../../utils/notify";
import { queryParser } from "../../utils/queryParser";
import { BASE_URL, ORDERS_URL } from "../../constans";
import { toTitleCase } from "../../utils/strings";
import { statusColorMap } from "../../staticData";

const OrderList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 12;

  const title = "My Orders";

  const fetchOrders = async () => {
    const query = queryParser({ page, limit });
    try {
      const response = await axios.get(`${ORDERS_URL}?${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setPagination(response.data.pagination);
      if (response.data.data.length === 0) {
        setError({ code: 404, message: "No orders found." });
        setLoading(false);
        return;
      }
      setError(null);
      setData(response.data.data);
    } catch (error) {
      let message;

      if (!error.response) message = error.message;
      else {
        if (error.response.status === 404) {
          setError({ code: 404, message: "No orders found." });
        }
        message = toTitleCase(error.response?.data.error.message);
      }

      console.log("Error:", error.response?.data);
      notify("error", message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const paginationHeader = (
    <div className="flex justify-center items-center mb-4">
      <div htmlFor="limit" className="label mr-2">
        <span className="label-text">Orders per page:</span>
      </div>
      <select
        id="limit"
        className="select select-sm select-primary"
        value={limit}
        onChange={(e) => {
          setSearchParams({ page, limit: e.target.value });
        }}
      >
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="18">18</option>
        <option value="24">24</option>
      </select>
    </div>
  );

  const paginationFooter = (
    <div className="flex justify-center items-center mt-4 gap-x-2">
      <button
        className="btn btn-primary text-lg"
        onClick={() => {
          setSearchParams({ page: parseInt(page) - 1, limit });
        }}
        disabled={page <= 1}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <span className="text-lg font-semibold text-base-content">
        Page {page} of {pagination.totalPages}
      </span>
      <button
        className="btn btn-primary text-lg"
        onClick={() => {
          setSearchParams({ page: parseInt(page) + 1, limit });
        }}
        disabled={page >= pagination.totalPages}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <Heading className="text-4xl font-bold mb-8 mt-4">{title}</Heading>
        {error.code === 404 && pagination.totalOrders > 0 && paginationHeader}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            {error.code} Error
          </h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
        {error.code === 404 && pagination.totalOrders > 0 && paginationFooter}
      </Container>
    );
  }

  return (
    <Container>
      <Heading className="text-4xl font-bold mb-8 mt-4">{title}</Heading>
      {paginationHeader}
      {data.map((order) => (
        <div key={order._id} className="card my-4 p-2 sm:p-4 shadow-lg">
          <div className="flex flex-col mb-4">
            <div className="flex w-full justify-between items-center">
              <div className={`badge badge-lg ${statusColorMap[order.status]}`}>
                {order.status}
              </div>
              <Link
                className="btn btn-primary btn-sm"
                to={`/user/order/${order._id}`}
              >
                View Details
              </Link>
            </div>
            <div className="divider my-2"></div>
            <div className="flex justify-between flex-wrap">
              <div className="text-sm text-gray-600">
                <div>
                  <strong>Order ID:</strong> {order._id}
                </div>
                <div>
                  <strong>Placed At: </strong>
                  {new Date(order.placedAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {order.orderItems.map((item) => (
              <div key={item.product._id} className="flex gap-x-4 items-start">
                <Link to={`/products/${item.product._id}`}>
                  <img
                    className="w-20"
                    alt={item.product.name}
                    src={
                      item.product.src[0].startsWith("https:") ||
                      item.product.src[0].startsWith("http:")
                        ? item.product.src[0]
                        : `${BASE_URL}/api/v1/${item.product.src[0]}`
                    }
                  />
                </Link>
                <div className="">
                  <div>Quantity: {item.quantity}</div>
                  <div>
                    Price: {item.price.amount} {item.price.currency}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="divider my-2"></div>
          <div className="">
            <strong>Total Price: {order.totalPrice}</strong>
          </div>
        </div>
      ))}
      {paginationFooter}
    </Container>
  );
};

export default OrderList;
