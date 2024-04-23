import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";
import { clearCartItems, savePaymentMethod } from "../../slices/cartSlice";
import { notify } from "../../utils/notify";
import { ORDERS_URL } from "../../constans";
import Page404 from "../Page404";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [formParams, setFormParams] = useState({
    CUSTOMER_MOBILE_NO: userInfo.phoneNumber,
    CUSTOMER_EMAIL_ADDRESS: userInfo.email,
    TXNDESC: "Payment for products",
    CHECKOUT_URL: `${ORDERS_URL}/payfast/checkout`,
    ORDER_DATE: new Date().toISOString().substring(0, 10),
    CUSTOMER_NAME: `${userInfo.firstName} ${userInfo.lastName}`,
    CUSTOMER_ID: userInfo._id,
    COUNTRY: userInfo.address.country,
    SHIPPING_STATE_PROVINCE: userInfo.address.state,
    SHIPPING_ADDRESS_CITU: userInfo.address.city,
    SHIPPING_POSTALCODE: userInfo.address.zipCode,
    SHIPPING_ADDRESS_1: `${userInfo.address.street}, ${userInfo.address.city}, ${userInfo.address.state}, ${userInfo.address.country} - ${userInfo.address.zipCode}`,
    ITEMS: cart.cartItems.map((item) => ({
      SKU: item._id,
      NAME: item.name,
      PRICE: item.price.amount,
      QTY: item.quantity,
    })),
  });

  const handleCheckout = async (e) => {
    e.preventDefault();

    const body = {
      orderItems: cart.cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
      paymentMethod: cart.paymentMethod,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };

    try {
      const response = await axios.post(`${ORDERS_URL}/`, body, {
        headers,
      });
      notify("success", response.data.message);

      if (cart.paymentMethod === "COD") {
        dispatch(clearCartItems()); // Dispatch action to clear cart items
        return;
      } // If COD then no need to redirect

      setFormParams({
        ...formParams,
        ...response.data.formParams,
        SUCCESS_URL: `${window.location.origin}/user/order/${response.data.data._id}`,
        FAILURE_URL: `${window.location.origin}/user/order/${response.data.data._id}`,
      });
      // Redirect to Payment Gateway after 1 second
      notify("info", "Hang Tight! Redirecting to payment gateway...");
      setTimeout(() => {
        const form = e.target;
        form.method = "POST";
        form.action =
          "https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction";
        form.submit();
        dispatch(clearCartItems()); // Dispatch action to clear cart items
      }, 1000);
    } catch (error) {
      console.log("Error placing order:", error);
      notify("error", "Something went wrong. Please try again");
    }
  };

  if (!cart.checkout) return <Page404 />;

  return (
    <Container>
      <Heading level={1}>Checkout</Heading>
      <div className="overflow-x-auto mt-8">
        <form onSubmit={handleCheckout}>
          {Object.keys(formParams).map((key) =>
            // If the value is an array again map it like nesting using input element

            // The structure of Array Items will be like this an Object with SKU, NAME, PRICE, QTY map it accordingly
            // ITEMS: formParams.map((item) => ({
            //   SKU: item.SKU,
            //   NAME: item.NAME,
            //   PRICE: item.PRICE,
            //   QTY: item.QTY,
            // })),
            Array.isArray(formParams[key]) ? (
              formParams[key].map((item, index) =>
                Object.keys(item).map((itemKey) => (
                  <input
                    key={`${key}[${index}][${itemKey}]`}
                    name={`${key}[${index}][${itemKey}]`}
                    type="hidden"
                    value={item[itemKey]}
                  />
                ))
              )
            ) : (
              <input
                key={key}
                name={key}
                type="hidden"
                value={formParams[key]}
              />
            )
          )}
          <table className="table">
            {/* Header */}
            <thead className="text-base">
              <tr>
                <th>Product</th>
                <th className="text-right">Price</th>
                <th className="text-right">Quantity</th>
                <th className="text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamic Rows */}
              {cart.cartItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <Link to={`/product/${item._id}`}>
                            <img src={item.src[0]} alt={item.shortDesc} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div>{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">{item.price.amount}</td>
                  <td className="text-right">{item.quantity}</td>
                  <th className="text-right">
                    {item.price.amount * item.quantity}
                  </th>
                </tr>
              ))}
            </tbody>
            {/* Footer */}
            <tfoot className="text-sm text-base-content">
              <tr>
                <th></th>
                <th colSpan={2} className="text-right">
                  Total Items Cost:
                </th>
                <th className="text-right">{cart.itemsPrice}</th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th colSpan={2} className="text-right">
                  Tax Price:
                </th>
                <th className="text-right">{cart.taxPrice}</th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th colSpan={2} className="text-right">
                  Shipping Price:
                </th>
                <th className="text-right">{cart.shippingPrice}</th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th colSpan={2} className="text-right">
                  Total Bill:
                </th>
                <th className="text-right">{cart.totalPrice}</th>
                <th></th>
              </tr>
              {/* To show button to switch Payment Method (COD or Online) */}
              <tr>
                <th></th>
                <th></th>
                <th colSpan={2} className="text-right">
                  <button
                    type="button"
                    className={`btn btn-primary btn-sm mr-4 ${
                      cart.paymentMethod === "COD"
                        ? "btn-disabled cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => dispatch(savePaymentMethod("COD"))}
                  >
                    COD
                  </button>
                  <button
                    type="button"
                    className={`btn btn-primary btn-sm ${
                      cart.paymentMethod === "ONLINE"
                        ? "btn-disabled cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => dispatch(savePaymentMethod("ONLINE"))}
                  >
                    Online
                  </button>
                </th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th colSpan={2} className="text-right">
                  <button type="submit" className="btn btn-primary btn-wide">
                    Place Order
                  </button>
                </th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </form>
      </div>
    </Container>
  );
};

export default Checkout;
