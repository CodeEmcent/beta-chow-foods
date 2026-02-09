// Home.jsx (SWIPER VERSION)
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/Home.css";

import heroVideo from "../assets/kitchen.mp4";
import jollof from "../assets/jollof.jpg";
import friedRice from "../assets/fried_rice.jpg";
import egusi from "../assets/egusi.jpg";
import suya from "../assets/suya.jpg";
import chops from "../assets/small_chops.jpg";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="home">
      {/* HERO VIDEO */}
      <section className="hero video-hero full-bleed">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="section-inner">
          <div className="hero-overlay">
            <motion.h1
              initial={{ opacity: 0, y: -22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Beta Chow Foods
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Authentic Nigerian Meals, Freshly Prepared & Delivered in Lagos
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Link to="/menu" className="btn primary">
                Order Now
              </Link>
              <Link to="/track" className="btn outline">
                Track Order
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* POPULAR DISHES (SWIPER CAROUSEL) */}
      <motion.section
        className="featured full-bleed"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <div className="section-inner">
          <h2>Our Popular Dishes</h2>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1 },
              760: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="food-swiper"
          >
            <SwiperSlide>
              <FoodCard img={jollof} title="Jollof Rice & Chicken" />
            </SwiperSlide>

            <SwiperSlide>
              <FoodCard img={friedRice} title="Fried Rice Special" />
            </SwiperSlide>

            <SwiperSlide>
              <FoodCard img={egusi} title="Egusi Soup & Pounded Yam" />
            </SwiperSlide>

            <SwiperSlide>
              <FoodCard img={suya} title="Spicy Suya" />
            </SwiperSlide>

            <SwiperSlide>
              <FoodCard img={chops} title="Small Chops" />
            </SwiperSlide>
          </Swiper>
        </div>
      </motion.section>

      {/* WHY US */}
      <motion.section
        className="why-us full-bleed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <div className="section-inner">
          <h2>Why Nigerians Love Beta Chow</h2>
          <p className="section-subtitle">
            Real Naija flavour, clean preparation, and a smooth ordering experience — built for Lagos.
          </p>

          <div className="why-grid">
            <Feature title="🔥 Fresh Meals" text="Cooked daily with fresh ingredients and careful preparation." />
            <Feature title="🚀 Fast Delivery" text="Swift delivery across key Lagos routes and neighbourhoods." />
            <Feature title="💯 Quality Taste" text="Authentic Nigerian flavour — consistent, satisfying, memorable." />
            <Feature title="💰 Affordable" text="Great portions and value without breaking the bank." />
            <Feature title="🧼 Clean & Hygienic" text="Neat kitchen practices and food handled with care." />
            <Feature title="📍 Lagos-Ready" text="Orders designed around Lagos addresses, landmarks, and directions." />
            <Feature title="📱 Easy to Order" text="Order online or quickly via WhatsApp when you’re in a rush." />
            <Feature title="⏱️ Reliable Timing" text="Clear order updates so you know what’s happening and when." />
          </div>

          <div className="why-strip">
            <div className="strip-item">
              <div className="strip-kpi">4.8★</div>
              <div className="strip-label">Customer joy</div>
            </div>
            <div className="strip-item">
              <div className="strip-kpi">Fresh</div>
              <div className="strip-label">Daily cooking</div>
            </div>
            <div className="strip-item">
              <div className="strip-kpi">Fast</div>
              <div className="strip-label">Lagos delivery</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* HOW TO ORDER */}
      <motion.section
        className="how-to-order full-bleed"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <div className="section-inner">
          <h2>How to Order</h2>
          <p className="section-subtitle">
            A simple 5-step journey — quick, clear, and made for Lagos.
          </p>

          <div className="steps-grid">
            <Step number="1" title="Browse Menu" text="Explore categories, prices, and best sellers." />
            <Step number="2" title="Add to Cart" text="Select quantity, extras, and preferences." />
            <Step number="3" title="Checkout" text="Choose delivery or pickup, add address/landmark." />
            <Step number="4" title="Confirm & Pay" text="Pay on delivery, transfer, or confirm payment reference." />
            <Step number="5" title="Track Order" text="Follow your order from kitchen to doorstep." />
          </div>

          <div className="order-actions">
            <Link to="/menu" className="btn primary">
              Start Order
            </Link>
            <Link to="/track" className="btn outline-dark">
              Track an Order
            </Link>
          </div>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        className="cta full-bleed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <Testimonials />
      </motion.section>
    </div>
  );
}

const FoodCard = ({ img, title }) => (
  <div className="food-card">
    <img src={img} alt={title} loading="lazy" />
    <h4>{title}</h4>
  </div>
);

const Feature = ({ title, text }) => (
  <div className="feature">
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);

const Step = ({ number, title, text }) => (
  <div className="step-card">
    <div className="step-bubble">
      <span>{number}</span>
    </div>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);