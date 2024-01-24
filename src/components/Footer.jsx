import React from "react";
import Logo from "../assets/Logo";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-8">
      <Container className="footer items-center p-4">
        <aside className="items-center grid-flow-col">
          <Logo className="w-32 text-white rounded-full shadow-md" />
          <p className="text-base">&copy; Grow Nature. All rights reserved.</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-xl">
          <a
            href="#"
            className="hover:text-primary transition-colors duration-300"
          >
            <i className="fab fa-facebook-f" />
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors duration-300"
          >
            <i className="fab fa-twitter" />
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors duration-300"
          >
            <i className="fab fa-instagram" />
          </a>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
