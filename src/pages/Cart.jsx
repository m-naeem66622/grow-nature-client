import Container from "../components/Container";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkout, removeFromCart } from "../slices/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.auth.userInfo);

  if (cart.cartItems.length === 0) {
    return (
      <Container>
        <Heading level={1}>Cart</Heading>
        <div>
          <p className="font-medium">
            Your cart is empty! Let&apos;s turn your home into a green paradise.
            Start adding plants now!
          </p>
          <Link to="/products" className="btn btn-primary mt-4">
            Explore the Garden
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Heading level={1}>Cart</Heading>
      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* Header */}
          <thead className="text-base">
            <tr>
              <th>Product</th>
              <th className="text-right">Price</th>
              <th className="text-right">Quantity</th>
              <th className="text-right">Subtotal</th>
              <th></th>
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
                <td className="max-w-12 text-right">
                  <button
                    className="btn btn-circle btn-sm btn-outline text-error text-lg"
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </td>
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
            <tr>
              <th></th>
              <th></th>
              <th colSpan={2} className="text-right">
                {userInfo ? (
                  <button
                    className="btn btn-primary btn-wide"
                    onClick={() => {
                      dispatch(checkout(true));
                      navigate("/checkout");
                    }}
                  >
                    Checkout
                  </button>
                ) : (
                  <Link to="/login" className="btn btn-primary btn-wide">
                    Signin
                  </Link>
                )}
              </th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </Container>
  );
};

export default Cart;
