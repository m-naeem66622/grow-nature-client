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
import Profile from "./pages/Profile";
import CaretakerList from "./pages/CareTakerList";
import CaretakerDetail from "./pages/CaretakerDetail";
import CaretakerAppointmentList from "./pages/caretaker/AppointmentList";
import AppointmentDetail from "./pages/private/AppointmentDetail";
import CustomerAppointmentList from "./pages/customer/AppointmentList";
import UserPlantSwapList from "./pages/customer/PlantSwapList";
import PlantSwapList from "./pages/PlantSwapList";
import EditPlantSwap from "./pages/customer/EditPlantSwap";
import AddPlantSwap from "./pages/customer/AddPlantSwap";
import UserList from "./pages/admin/UserList";
import ProfileDetail from "./pages/admin/ProfileDetail";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/caretakers", element: <CaretakerList /> },
  { path: "/caretaker/:_id", element: <CaretakerDetail /> },
  { path: "/plant-swaps", element: <PlantSwapList /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/products", element: <ProductList /> },
  { path: "/product/:_id", element: <ProductDetail /> },
  { path: "/collection/:collectionName", element: <ProductList /> },
  { path: "/category/:categoryName", element: <ProductList /> },
  { path: "/cart", element: <Cart /> },
  { path: "*", element: <Page404 /> },
];

export const protectedRoutes = [{ path: "/profile", element: <Profile /> }];

export const buyerRoutes = [
  { path: "/user/orders", element: <ComingSoon /> },
  { path: "/user/appointments", element: <CustomerAppointmentList /> },
  { path: "/user/plant-swaps", element: <UserPlantSwapList /> },
  { path: "/user/plant-swaps/create", element: <AddPlantSwap /> },
  { path: "/user/plant-swaps/:_id/edit", element: <EditPlantSwap /> },
  { path: "/user/appointment/:_id", element: <ComingSoon /> },
];

export const adminRoutes = [
  { path: "/admin/dashboard", element: <ComingSoon /> },
  { path: "/admin/users", element: <UserList /> },
  { path: "/admin/user/:_id", element: <ProfileDetail /> },
  { path: "/admin/orders", element: <ComingSoon /> },
  { path: "/admin/products", element: <AdminProductList /> },
  { path: "/admin/product/create", element: <AddProduct /> },
  { path: "/admin/product/:_id/edit", element: <EditProduct /> },
];

export const caretakerRoutes = [
  { path: "/manage/appointments", element: <CaretakerAppointmentList /> },
  { path: "/manage/appointment/:_id", element: <AppointmentDetail /> },
];
