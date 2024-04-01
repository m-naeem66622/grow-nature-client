import { useRef } from "react";
import Logo from "../assets/Logo";
import { Link, useNavigate } from "react-router-dom";
import Container from "./Container";
import { toKebabCase } from "../utils/strings";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import staticData from "../staticData";
import { logout } from "../slices/authSlice";

const Header = ({ inside = false }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.auth).userInfo;

  // To close the dropdown menu when clicked outside or on the link
  const handleClick = () => {
    ref.current.removeAttribute("open");
  };

  return (
    <Container
      className={`navbar backdrop-blur py-6 relative z-10 mb-8 ${
        inside ? "px-0" : ""
      }`}
    >
      <Link to="/" className="flex-1">
        <Logo className="w-32 text-white rounded-full shadow-md" />
        <div className="flex flex-col pl-6">
          <span className="text-xl font-bold">Grow Nature</span>
          <span className="text-sm">No.1 Online Plant Store</span>
        </div>
      </Link>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/products">Buy Plants Online</Link>
          </li>
          <li>
            <details ref={ref}>
              <summary>Store</summary>
              <ul className="p-2 bg-base-100 rounded-t-none w-max">
                {staticData.storeItems.map((item) => (
                  <li onClick={handleClick} key={item.value}>
                    <Link
                      onClick={handleClick}
                      to={`/collection/${toKebabCase(item.value)}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <Link to="/">Special Offers</Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cart.cartItems.length}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">
                {cart.cartItems.length} Item(s)
              </span>
              <span className=" text-primary font-bold">
                Subtotal: ₨. {cart.itemsPrice}
              </span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-ghost btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="avatar">
              <div className="w-6 rounded-full">
                <img
                  src="https://gravatar.com/avatar?s=50&d=mp"
                  alt="User Avatar"
                />
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] dropdown-content menu gap-y-1 w-52 bg-base-100 shadow"
          >
            {userInfo ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/");
                      dispatch(logout());
                    }}
                    className="btn btn-sm text-left hover:btn-error hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
};

Header.propTypes = {
  inside: PropTypes.bool,
};

export default Header;
