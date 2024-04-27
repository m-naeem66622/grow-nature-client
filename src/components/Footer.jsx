import { Link } from "react-router-dom";
import Logo from "../assets/Logo";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-8">
      <Container className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-4 md:mb-0 flex items-center justify-center">
            <Logo className="w-32 text-white rounded-full shadow-md" />
          </div>
          <div className="mb-4 md:mb-0 flex items-center justify-center">
            <div className="text-center lg:text-left">
              <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
              <p>Gujrat 51010, Pakistan</p>
              <p>
                Email:
                <a className="ml-1" href="mailto:info@highgears.pk">
                  info@grownature.com
                </a>
              </p>
              <p>
                Phone:
                <a href="tel:+92526617859" className="ml-1">
                  +92 312 2420075
                </a>
              </p>
            </div>
          </div>
          <div className="mb-4 md:mb-0 flex items-center justify-center">
            <div className="text-center lg:text-left">
              <h2 className="text-lg font-semibold mb-2">Links</h2>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-start">
            <div className="text-center lg:text-left">
              <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
              <div className="flex space-x-4">
                <a
                  rel="noreferrer"
                  href="https://www.facebook.com/"
                  target="_blank"
                  className="text-2xl text-gray-500 hover:text-blue-500 transition-colors duration-300"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  rel="noreferrer"
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="text-2xl text-gray-500 hover:text-red-500 transition-colors duration-300"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  rel="noreferrer"
                  href="https://twitter.com/"
                  target="_blank"
                  className="text-2xl text-gray-500 hover:text-black transition-colors duration-300"
                >
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a
                  rel="noreferrer"
                  href="https://www.linkedin.com"
                  target="_blank"
                  className="text-2xl text-gray-500 hover:text-blue-500 transition-colors duration-300"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="text-base mt-5 text-center">
          {new Date().getFullYear()}&copy; Grow Nature. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
