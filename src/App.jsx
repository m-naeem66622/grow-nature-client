import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { adminRoutes, publicRoutes } from "./Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";
import ThemeController from "./components/ThemeController";
import { setCredentials } from "./slices/authSlice";
import { USERS_URL } from "./constans";

function App() {
  const location = useLocation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const theme = useSelector((state) => state.theme.name);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${USERS_URL}/verify/${userInfo?.role.toLowerCase()}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.status !== 200) {
          // reset the credentials
          localStorage.removeItem("authToken");
          localStorage.removeItem("userInfo");
          setCredentials(null);
        }
      } catch (error) {
        console.log("Error:", error.response);
      }
    };

    if (authToken && userInfo?.role) {
      verifyToken();
    }
  }, [userInfo?.role]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    themeChange(false);

    // 👆 false parameter is required for react project
  }, [theme]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2500} theme="dark" />
      <ThemeController />
      <main>
        {!(location.pathname === "/") && <Header />}
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="" element={<AdminRoute />}>
            {adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
