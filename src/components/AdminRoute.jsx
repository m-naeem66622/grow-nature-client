import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Page404 from "../pages/Page404";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.role === "ADMIN" ? <Outlet /> : <Page404 />;
};
export default AdminRoute;
