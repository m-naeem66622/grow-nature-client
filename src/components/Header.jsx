import React from "react";
import Logo from "../assets/Logo";
import { Link } from "react-router-dom";
import Container from "./Container";

const Header = ({ inside = false }) => {
  return (
    <Container
      className={`navbar backdrop-blur py-6 max-w-full${inside ? " px-0" : ""}`}
    >
      <div className="flex-1">
        <Logo className="w-32 text-white rounded-full shadow-md" />
        <div className="flex flex-col pl-6">
          <span className="text-xl font-bold">Grow Nature</span>
          <span className="text-sm">Gujrat's No.1 Online Plant Store</span>
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Buy Plants Online</Link>
          </li>
          <li>
            <details>
              <summary>Store</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <Link to="/">Buy Plants</Link>
                </li>
                <li>
                  <Link to="/">Buy Trees</Link>
                </li>
                <li>
                  <Link to="/">Buy Seeds</Link>
                </li>
                <li>
                  <Link to="/">Buy Accessories</Link>
                </li>
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
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-ghost btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Header;
