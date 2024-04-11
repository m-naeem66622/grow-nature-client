import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Page404 from "../pages/Page404";

const BuyerRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.role === "BUYER" ? <Outlet /> : <Page404 />;
};
export default BuyerRoute;
