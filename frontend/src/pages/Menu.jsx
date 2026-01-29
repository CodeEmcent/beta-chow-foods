import React, { useEffect, useMemo, useState } from "react";
import { fetchCategories, fetchMenuItems } from "../api/menu";
import { useCart } from "../context/CartContext";
import Loading from "../components/Loading";
import "../styles/Menu.css";
import { formatMoney } from "../utils/money";


export default function Menu() {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Fetch categories on load
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const cats = await fetchCategories();
        setCategories(cats);
        const first = cats?.[0]?.id || null;
        setActiveCat(first);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Fetch menu items when category changes
  useEffect(() => {
    (async () => {
      if (activeCat === null) return;
      try {
        setErr("");
        const data = await fetchMenuItems(activeCat);
        setItems(data);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [activeCat]);

  // Category buttons
  const catButtons = useMemo(
    () =>
      categories.map((c) => (
        <button
          key={c.id}
          onClick={() => setActiveCat(c.id)}
          className={`category-btn ${activeCat === c.id ? "active" : ""}`}
        >
          {c.name}
        </button>
      )),
    [categories, activeCat]
  );

  if (loading) return <Loading text="Fetching menu..." />;
  if (err) return <p className="error-text">{err}</p>;

  return (
    <div className="menu-page">
      <div className="menu-header">
  <h1>Our Menu</h1>
  <p>
    Freshly prepared Nigerian meals and drinks.  
    Choose a category and add items to your cart.
  </p>
</div>

      {/* Category Buttons */}
      <div className="category-bar">{catButtons}</div>

      {/* Menu Items or Empty State */}
      {items.length === 0 ? (
        <p className="empty-text">No items available in this category.</p>
      ) : (
        <div className="menu-grid-wrapper">
          <div className="grid-auto">
            {items.map((it) => (
              <div key={it.id} className="menu-card">
                {it.image_url ? (
                  <img
                    src={it.image_url}
                    alt={it.name}
                    className="menu-image"
                  />
                ) : (
                  <div className="menu-image placeholder">No image</div>
                )}

                <span className="badge">Available</span>

                <h3 className="menu-title">{it.name}</h3>
                <p className="menu-desc">{it.description}</p>
                <p className="menu-price">₦{formatMoney(Number(it.price))}</p>

                <button
                  className="btn-primary"
                  onClick={() => {
                    addToCart(it, 1);
                    alert(`${it.name} added to cart`);
                  }}

                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
