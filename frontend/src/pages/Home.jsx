// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "../styles/Home.css";

import heroVideo from "../assets/kitchen.mp4";
import jollof from "../assets/jollof.jpg";
import friedRice from "../assets/fried_rice.jpg";
import egusi from "../assets/egusi.jpg";
import suya from "../assets/suya.jpg";
import chops from "../assets/small_chops.jpg";

export default function Home() {
  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 650,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2400,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="home">
      {/* HERO VIDEO */}
      <section className="hero video-hero">
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

      {/* FOOD CAROUSEL */}
      <motion.section
        className="featured"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <div className="section-inner">
          <h2>Our Popular Dishes</h2>
          <Slider {...sliderSettings} className="carousel">
            <FoodCard img={jollof} title="Jollof Rice & Chicken" />
            <FoodCard img={friedRice} title="Fried Rice Special" />
            <FoodCard img={egusi} title="Egusi Soup & Pounded Yam" />
            <FoodCard img={suya} title="Spicy Suya" />
            <FoodCard img={chops} title="Small Chops" />
          </Slider>
        </div>
      </motion.section>

      {/* WHY US */}
      <motion.section
        className="why-us"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <div className="section-inner">
          <h2>Why Nigerians Love Beta Chow</h2>
          <div className="why-grid">
            <Feature title="🔥 Fresh Meals" text="Cooked daily with fresh ingredients" />
            <Feature title="🚀 Fast Delivery" text="Swift delivery across Lagos" />
            <Feature title="💯 Quality Taste" text="Authentic Nigerian flavour" />
            <Feature title="💰 Affordable" text="Great taste without breaking the bank" />
          </div>
        </div>
      </motion.section>

      {/* HOW TO ORDER */}
      <motion.section
        className="how-to-order"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <div className="section-inner">
          <h2>How to Order</h2>
          <div className="steps">
            <Step number="1" text="Browse our Menu" />
            <Step number="2" text="Add to Cart" />
            <Step number="3" text="Checkout & Relax" />
            <Step number="4" text="We Deliver" />
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <div className="section-inner">
          <div className="cta-card">
            <h2>Ready to Enjoy Great Food?</h2>
            <p>Order now and let us serve you delicious Nigerian meals.</p>
            <Link to="/menu" className="btn primary">
              Order Now
            </Link>
          </div>
        </div>
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

const Step = ({ number, text }) => (
  <div className="step">
    <span>{number}</span>
    <p>{text}</p>
  </div>
);
