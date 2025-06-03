import React, { useState } from "react";

interface products {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
}

interface CartProps {
  cart: products[];
  setCart: React.Dispatch<React.SetStateAction<products[]>>;
}

const Cart: React.FC<CartProps> = ({ cart, setCart }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  function handleDeleteClick(idx: number) {
    setDeleteIndex(idx);
    setShowDialog(true);
  }

  function confirmDelete() {
    if (deleteIndex !== null) {
      setCart((prevCart) => prevCart.filter((_, i) => i !== deleteIndex));
    }
    setShowDialog(false);
    setDeleteIndex(null);
  }

  function cancelDelete() {
    setShowDialog(false);
    setDeleteIndex(null);
  }

  return (
    <div style={{ marginTop: "2rem", maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
      <h2>Cart Items ({cart.length})</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              background: "#fff"
            }}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              width={100}
              height={80}
              style={{ borderRadius: "8px", objectFit: "cover", border: "1px solid #eee" }}
            />
            <div style={{ marginLeft: "20px", flex: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{item.title}</div>
              <div style={{ color: "#888", margin: "6px 0" }}>₹{item.price}</div>
              <div style={{ color: "#f39c12" }}>Rating: {item.rating}/5</div>
            </div>
            <button
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
              onClick={() => handleDeleteClick(idx)}
            >
              Delete
            </button>
          </div>
        ))
      )}

     
      {showDialog && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
        }}>
          <div style={{ background: "#fff", padding: 32, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
            <p>Are you sure you want to remove this from cart?</p>
            <button onClick={confirmDelete} style={{ marginRight: 10 }}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;