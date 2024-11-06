import React from "react";
import "./ProductTemplate.css";

export default function ProductTemplate({ product }) {
  return (
    <div className="product-template">
      <strong>{product.name}</strong>
      <p>Price: ${product.price}</p>
    </div>
  );
}
