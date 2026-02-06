import { Routes, Route } from "react-router-dom";

/* Public layout */
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

/* Public pages */
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmed from "./pages/OrderConfirmed";
import TrackOrder from "./pages/TrackOrder";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AboutProject from "./pages/AboutProject";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import MyOrderDetail from "./pages/MyOrderDetail";
import Profile from "./pages/Profile";


/* Admin */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminLayout from "./layouts/AdminLayout";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC SITE */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmed/:orderNo" element={<OrderConfirmed />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-project" element={<AboutProject />} />
        {/* Customer WORKSPACE */}
        <Route path="/track" element={<TrackOrder />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>}/>
        <Route path="/my-orders" element={<RequireAuth><MyOrders /></RequireAuth>} />
        <Route path="/my-orders/:id" element={<RequireAuth><MyOrderDetail /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      </Route>

      {/* ADMIN LOGIN (no public layout) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN WORKSPACE */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        <Route path="orders">
          <Route index element={<AdminOrders />} />
          <Route path=":id" element={<AdminOrderDetail />} />
        </Route>

        <Route path="menu" element={<AdminMenu />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
