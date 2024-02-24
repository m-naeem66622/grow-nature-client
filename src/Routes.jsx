import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ComingSoon from "./pages/ComingSoon";
import AddProduct from "./pages/admin/AddProduct";
import AdminProductList from "./pages/admin/ProductList";
import EditProduct from "./pages/admin/EditProduct";

export const publicRoutes = [
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
    element: <Register />,
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
    element: <ComingSoon />,
  },
  {
    path: "/category/:categoryName",
    element: <ComingSoon />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
];

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <ComingSoon />,
  },
  {
    path: "/admin/orders",
    element: <ComingSoon />,
  },
  {
    path: "/admin/products",
    element: <AdminProductList />,
  },
  {
    path: "/admin/product/create",
    element: <AddProduct />,
  },
  {
    path: "/admin/product/:_id/edit",
    element: <EditProduct />,
  },
];
