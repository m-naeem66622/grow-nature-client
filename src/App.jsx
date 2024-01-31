import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { themeChange } from "theme-change";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState("garden");

  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Login />,
    },
    {
      path: "/products",
      element: <ProductList />,
    },
    {
      path: "/product/:_id",
      element: <ProductDetail />,
    },
    {
      path: "/collection/:collectionName",
      element: <ProductList />,
    },
    {
      path: "/category/:categoryName",
      element: <ProductList />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    themeChange(false);

    // 👆 false parameter is required for react project
  }, []);

  return (
    <>
      <main>
        {!(location.pathname === "/") && <Header />}
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
