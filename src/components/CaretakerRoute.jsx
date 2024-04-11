import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Page404 from "../pages/Page404";

const CaretakerRoute = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return userInfo && userInfo.role === "CARETAKER" ? <Outlet /> : <Page404 />;
};
export default CaretakerRoute;
