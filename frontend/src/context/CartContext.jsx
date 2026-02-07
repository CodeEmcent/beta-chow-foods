import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadCart, saveCart, clearCart as clearCartStorage } from "../utils/storage";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => loadCart());

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  function addToCart(item, qty = 1, notes = "") {
    setCart((prev) => {
      const found = prev.find(
        (x) => x.id === item.id && (x.notes || "") === (notes || "")
      );

      if (found) {
        return prev.map((x) =>
          x === found ? { ...x, quantity: x.quantity + qty } : x
        );
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: Number(item.price),
          image_url: item.image_url,
          quantity: qty,
          notes,
        },
      ];
    });
  }

  function removeFromCart(index) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function setQty(index, quantity) {
    setCart((prev) =>
      prev.map((x, i) =>
        i === index ? { ...x, quantity: Math.max(1, quantity) } : x
      )
    );
  }

  // ✅ This is the real clear cart function for frontend
  function clearCart() {
    setCart([]);
    clearCartStorage();
  }

  const subtotal = useMemo(
    () => cart.reduce((sum, x) => sum + x.price * x.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        setQty,
        subtotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
