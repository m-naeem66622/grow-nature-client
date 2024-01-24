import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { themeChange } from "theme-change";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState("garden");
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
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
