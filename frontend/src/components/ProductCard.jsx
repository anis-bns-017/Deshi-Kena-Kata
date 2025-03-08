import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      {product.productImage && (
        <img
          src={product.productImage}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded"
        />
      )}
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Market: {product.market}</p>
      <p>Category: {product.category}</p>
      {product.description && <p>Description: {product.description}</p>}
    </div>
  );
};

export default ProductCard;