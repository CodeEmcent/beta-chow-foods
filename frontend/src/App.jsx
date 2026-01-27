import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmed from "./pages/OrderConfirmed";
import TrackOrder from "./pages/TrackOrder";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AboutProject from "./pages/AboutProject";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import "./App.css";



export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmed/:orderNo" element={<OrderConfirmed />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin */}
        <Route path="/about-project" element={<AboutProject />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
