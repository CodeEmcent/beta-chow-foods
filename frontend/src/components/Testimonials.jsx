// src/components/Testimonials.jsx
import React from "react";
import Slider from "react-slick";
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
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="testimonials">
      <div className="testimonials-inner">
        <h2>What Our Customers Say</h2>
        <p className="subtitle">
          Real feedback from customers across Lagos who enjoy Beta Chow.
        </p>

        <Slider {...settings}>
          {reviews.map((r, i) => (
            <div key={i} className="testimonial-slide">
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
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
