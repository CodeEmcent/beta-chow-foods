// src/components/Testimonials.jsx (SWIPER VERSION)

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "../styles/Testimonials.css";

const reviews = [
  {
    name: "Tunde A.",
    location: "Yaba",
    rating: 5,
    text:
      "The jollof was fresh and delivery was faster than expected. I’ll definitely order again.",
  },
  {
    name: "Aisha M.",
    location: "Surulere",
    rating: 5,
    text:
      "Very easy to order and the food arrived hot and well packaged. Highly recommended.",
  },
  {
    name: "Chinedu O.",
    location: "Ikeja",
    rating: 4,
    text:
      "Great portions for the price. The egusi tasted authentic and rich. I can't get over the flavour and taste.",
  },
  {
    name: "Blessing K.",
    location: "Lekki",
    rating: 5,
    text:
      "Clean packaging, good taste, and clear order updates. Smooth experience overall.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials-inner">
        <h2>What Our Customers Say</h2>

        <p className="subtitle">
          Real feedback from customers across Lagos who enjoy Beta Chow.
        </p>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="testimonial-swiper"
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i}>
              <div className="testimonial-card">
                <div className="stars">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </div>

                <p className="review-text">“{r.text}”</p>

                <div className="reviewer">
                  <strong>{r.name}</strong>
                  <span>{r.location}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}