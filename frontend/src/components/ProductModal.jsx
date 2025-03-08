// src/components/ProductModal.js
const ProductModal = ({ product, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{product.name}</h2>
          <p className="text-gray-700 font-medium">Price: ${product.price}</p>
          <p className="text-gray-700">Quantity: {product.quantity}</p>
          <p className="text-gray-700">Market: {product.market}</p>
          <p className="text-gray-700">Category: {product.category}</p>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <div className="mt-4">
            <span className="font-medium">Images:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.productImage.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-20 h-20 object-cover rounded border border-gray-300"
                />
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductModal;