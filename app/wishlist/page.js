"use client";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setItems(data.items);
    };
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      <div className="wishlist-grid">
        {items.map((item) => (
          <div key={item._id} className="wishlist-item">
            <img src={item.product.image} width={150} />
            <h3>{item.product.name}</h3>
            <p>₹{item.product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
