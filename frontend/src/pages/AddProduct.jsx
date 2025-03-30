import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "../common/SummaryApi";
import Swal from "sweetalert2";

const vegetables = [
  "Potato (আলু)",
  "Sweet Potato (মিষ্টি আলু)",
  "Onion (পেঁয়াজ)",
  "Garlic (রসুন)",
  "Ginger (আদা)",
  "Radish (মূলা)",
  "Beetroot (বিটরুট)",
  "Carrot (গাজর)",
  "Yam (রাঙা আলু)",
  "Spinach (পালং শাক)",
  "Red Amaranth (লাল শাক)",
  "Water Spinach (কলমি শাক)",
  "Mustard Greens (সরিষা শাক)",
  "Coriander Leaves (ধনেপাতা)",
  "Mint Leaves (পুদিনা পাতা)",
  "Lettuce (লেটুস পাতা)",
  "Bottle Gourd (লাউ)",
  "Bitter Gourd (করলা)",
  "Ridge Gourd (ঝিঙা)",
  "Snake Gourd (চিচিঙ্গা)",
  "Pumpkin (কুমড়া)",
  "Ash Gourd (ছোলকুমড়া)",
  "Cabbage (বাঁধাকপি)",
  "Cauliflower (ফুলকপি)",
  "Broccoli (ব্রকলি)",
  "Tomato (টমেটো)",
  "Brinjal (বেগুন)",
  "Green Chili (কাঁচা মরিচ)",
  "Bell Peppers (ক্যাপসিকাম)",
  "Cucumber (শসা)",
  "Okra (ঢেঁড়স)",
  "Beans (শিম)",
  "Drumstick (সজনে ডাটা)",
  "Jackfruit Seeds (কাঁঠাল বীজ)",
  "Peas (মটরশুটি)",
  "Mushroom (মাশরুম)",
  "Bamboo Shoots (বাঁশ কোঁড়ল)",
];

const fruits = [
  "Apple (আপেল)",
  "Banana (কলা)",
  "Orange (কমলা)",
  "Mango (আম)",
  "Grapes (আঙুর)",
  "Watermelon (তরমুজ)",
  "Pineapple (আনারস)",
  "Guava (পেয়ারা)",
  "Papaya (পেঁপে)",
  "Jackfruit (কাঁঠাল)",
  "Litchi (লিচু)",
  "Coconut (নারকেল)",
  "Pomegranate (ডালিম)",
  "Strawberry (স্ট্রবেরি)",
  "Lemon (লেবু)",
  "Lime (পাতি লেবু)",
  "Grapefruit (জাম্বুরা)",
  "Date (খেজুর)",
  "Fig (ডুমুর)",
  "Pear (নাশপাতি)",
  "Plum (আলুবোখরা)",
  "Peach (পীচ)",
  "Apricot (এপ্রিকট)",
  "Cherry (চেরি)",
  "Avocado (অ্যাভোকাডো)",
  "Kiwi (কিউই)",
  "Dragon Fruit (ড্রাগন ফল)",
  "Custard Apple (আতা)",
  "Olive (জলপাই)",
  "Star Fruit (কামরাঙ্গা)",
  "Tamarind (তেঁতুল)",
  "Rose Apple (জামরুল)",
  "Indian Gooseberry (আমলকী)",
  "Wood Apple (বেল)",
  "Java Plum (জাম)",
  "Carambola (কামরাঙা)",
  "Muskmelon (ফুটি)",
  "Raspberry (রাস্পবেরি)",
  "Blueberry (ব্লুবেরি)",
  "Cranberry (ক্র্যানবেরি)",
  "Blackberry (ব্ল্যাকবেরি)",
  "Pomelo (বাতাবি লেবু)",
  "Sapodilla (সপেটা)",
  "Passion Fruit (প্যাশন ফল)",
  "Persimmon (পার্সিমন)",
];

const markets = [
  "Karwan Bazar (কারওয়ান বাজার)",
  "Jatrabari Bazar (যাত্রাবাড়ী বাজার)",
  "Shyambazar (শ্যামবাজার)",
  "Mirpur 1 Vegetable Market (মিরপুর ১ বাজার)",
  "Gabtoli Bazar (গাবতলী বাজার)",
  "Mohammadpur Krishi Market (মোহাম্মদপুর কৃষি বাজার)",
  "Khatunganj Bazar (খাতুনগঞ্জ বাজার)",
  "Reazuddin Bazar (রিয়াজউদ্দিন বাজার)",
  "Bohoddarhat Bazar (বহদ্দারহাট বাজার)",
  "Bandar Bazar (সিলেট বন্দর বাজার)",
  "Shaheb Bazar (সাহেব বাজার)",
  "Port Road Market (পোর্ট রোড বাজার)",
  "Khulna Boro Bazar (খুলনা বড় বাজার)",
  "Cumilla Tomcham Bridge Bazar (কুমিল্লা টমছম ব্রিজ বাজার)",
  "Noakhali Maijdee Bazar (নোয়াখালী মাইজদী বাজার)",
  "Bogura Sathmatha Bazar (বগুড়া সাতমাথা বাজার)",
  "Notun Bazar, Badda (নতুন বাজার, বাড্ডা)",
  "Mohakhali Kacha Bazar (মহাখালী কাঁচাবাজার)",
  "Reazuddin Bazar, Chattogram (রেয়াজুদ্দিন বাজার, চট্টগ্রাম)",
  "Teknaf Bazar, Teknaf (টেকনাফ বাজার, টেকনাফ)",
  "Chawkbazar, Chattogram (চকবাজার, চট্টগ্রাম)",
  "Daulatpur Bazar, Khulna (দৌলতপুর বাজার, খুলনা)",
  "Notun Bazar, Khulna (নতুন বাজার, খুলনা)",
  "Sat Rasta Bazar, Khulna (সাত রাস্তা বাজার, খুলনা)",
  "Baneshwar Bazar, Puthia (বানেশ্বর বাজার, পুঠিয়া)",
  "Upashahar Bazar, Rajshahi (উপশহর বাজার, রাজশাহী)",
  "New Market, Rajshahi (নিউ মার্কেট, রাজশাহী)",
  "Kalighat Bazar, Sylhet (কালীঘাট বাজার, সিলেট)",
  "Ambarkhana Bazar, Sylhet (আম্বরখানা বাজার, সিলেট)",
  "Notun Bazar, Sylhet (নতুন বাজার, সিলেট)",
  "Notun Bazar, Barishal (নতুন বাজার, বরিশাল)",
  "Kaunia Bazar, Barishal (কাউনিয়া বাজার, বরিশাল)",
  "Chawkbazar, Barishal (চকবাজার, বরিশাল)",
  "New Market, Rangpur (নিউ মার্কেট, রংপুর)",
  "jahaj kompani mor bazar, Rangpur (জাহাজ কোম্পানি মোড় বাজার, রংপুর)",
  "Lalbag Bazar, Dinajpur (লালবাগ বাজার, দিনাজপুর)",
  "Mechua Bazar, Mymensingh (মেছুয়া বাজার, ময়মনসিংহ)",
  "Notun Bazar, Mymensingh (নতুন বাজার, ময়মনসিংহ)",
  "Boro Bazar, Jamalpur (বড় বাজার, জামালপুর)",
  "Railway Bazar, Netrokona (রেলওয়ে বাজার, নেত্রকোনা)",
  "Rajganj Bazar, Cumilla (রাজগঞ্জ বাজার, কুমিল্লা)",
  "Shashongacha Bazar, Cumilla (শাসনগাছা বাজার, কুমিল্লা)",
  "New Market, Cumilla (নিউ মার্কেট, কুমিল্লা)",
  "Choumuhani Bazar, Begumganj (চৌমুহনী বাজার, বেগমগঞ্জ)",
  "Sonapur Bazar, Noakhali Sadar (সোনাপুর বাজার, নোয়াখালী সদর)",
  "Datterhat Bazar, Senbag (দত্তেরহাট বাজার, সেনবাগ)",
];

const categories = ["Vegetable", "Fruit"];

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: vegetables[0],
    price: "",
    quantity: "",
    market: markets[0],
    category: categories[0],
    description: "",
    productImage: [],
  });

  const [productsList, setProductsList] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUploadProduct = async (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array

    // Create temporary URLs for preview
    const tempUrls = files.map((file) => URL.createObjectURL(file));

    // Update the product state with temporary URLs
    setProduct((prevProduct) => ({
      ...prevProduct,
      productImage: [...prevProduct.productImage, ...tempUrls], // Append temporary URLs
    }));

    try {
      // Upload images to Cloudinary and get the URLs
      const uploadedUrls = await uploadImage(files);

      // Replace temporary URLs with Cloudinary URLs
      setProduct((prevProduct) => ({
        ...prevProduct,
        productImage: [
          ...prevProduct.productImage.filter((url) => !tempUrls.includes(url)), // Remove temporary URLs
          ...uploadedUrls, // Add Cloudinary URLs
        ],
      }));
    } catch (error) {
      console.error("Error uploading images:", error);

      // Remove temporary URLs if upload fails
      setProduct((prevProduct) => ({
        ...prevProduct,
        productImage: prevProduct.productImage.filter(
          (url) => !tempUrls.includes(url)
        ),
      }));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProductsList([
      ...productsList,
      { ...product, productImage: [...product.productImage] },
    ]); // Preserve productImage
    setProduct({
      name: vegetables[0],
      price: "",
      quantity: "",
      market: markets[0],
      category: categories[0],
      description: "",
      productImage: [], // Reset productImage for the next product
    });
  };
  // console.log("here is the product: ", product);

  const handleRemoveImage = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      productImage: prevProduct.productImage.filter((_, i) => i !== index), // Remove the productImage at the specified index
    }));
  };

  const handleSubmitAllProducts = async () => {
    try {
      const requests = productsList.map(async (prod) => {
        const productData = {
          name: prod.name,
          price: prod.price,
          quantity: prod.quantity,
          market: prod.market,
          category: prod.category,
          description: prod.description,
          productImage: prod.productImage,
        };

        const response = await fetch(SummaryApi.addProducts.url, {
          method: SummaryApi.addProducts.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || "Failed to add product");
        }

        return responseData;
      });

      const results = await Promise.all(requests);

      let successCount = 0;
      let failedCount = 0;

      results.forEach((result) => {
        if (result.success) {
          successCount++;
        } else {
          failedCount++;
        }
      });

      Swal.fire({
        title: "Products Submitted!",
        text: `Successfully added ${successCount} products. Failed: ${failedCount}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear the list and navigate
      setProductsList([]);
      navigate("/");
    } catch (error) {
      console.error("Error submitting products:", error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to submit products. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleClearProducts = () => {
    setProductsList([]);
  };

  const getProductNames = () => {
    if (product.category === "Vegetable") {
      return vegetables;
    } else if (product.category === "Fruit") {
      return fruits;
    } else {
      return [];
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...productsList];
    updatedProducts.splice(index, 1);
    setProductsList(updatedProducts);
  };

  // console.log("here the list: ", productsList);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-green-600">
        📦 Add Your Product
      </h1>
      <form onSubmit={handleAddProduct} className="w-full max-w-lg space-y-6">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <label className="block font-semibold text-gray-700 mb-2">
            📦 Category:
          </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border p-2 w-full bg-white rounded-lg"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <label className="block font-semibold text-gray-700 mb-2">
            🛒 Product Name:
          </label>
          <select
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border p-2 w-full bg-white rounded-lg"
          >
            {getProductNames().map((prodName, index) => (
              <option key={index} value={prodName}>
                {prodName}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <label className="block font-semibold text-gray-700 mb-2">
            💰 Price (BDT):
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter Price"
            value={product.price}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            required
          />
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <label className="block font-semibold text-gray-700 mb-2">
            📊 Quantity (kg):
          </label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter Quantity"
            value={product.quantity}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            required
          />
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <label className="block font-semibold text-gray-700 mb-2">
            🛍️ Market Name:
          </label>
          <select
            name="market"
            value={product.market}
            onChange={handleChange}
            className="border p-2 w-full bg-white rounded-lg"
          >
            {markets.map((market, index) => (
              <option key={index} value={market}>
                {market}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <label className="block font-semibold text-gray-700 mb-2">
            📝 Description:
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <label className="block font-semibold text-gray-700 mb-2">
            🖼️ Images:
          </label>
          <input
            type="file"
            accept="productImage/*"
            onChange={handleUploadProduct}
            multiple
            className="border p-2 w-full rounded-lg"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {product.productImage.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image} // This can be a temporary URL or a Cloudinary URL
                  alt={`preview ${index}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  onClick={() => handleRemoveImage(index)} // Use handleRemoveImage here
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md w-full hover:bg-blue-600 transition"
        >
          ➕ Add Product
        </button>
      </form>

      <div className="mt-6 w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-4">🛒 Added Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsList.map((prod, index) => (
            <div
              key={index}
              className="bg-slate-200 p-6 shadow-lg rounded-lg flex flex-col items-center h-full"
            >
              <div className="flex flex-col justify-between h-full">
                <h3 className="text-xl font-bold mb-2">{prod.name}</h3>
                <p className="mb-1">📊 Quantity: {prod.quantity} kg</p>
                <p className="mb-1">💰 Price: BDT {prod.price}</p>
                <p className="mb-2">📍 Market: {prod.market}</p>
                <p className="mb-2">📝 Description: {prod.description}</p>
                {prod.productImage && prod.productImage.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {prod.productImage.map((productImage, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={productImage}
                        alt={`product ${imgIndex}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleRemoveProduct(index)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                🗑️ Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {productsList.length > 0 && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSubmitAllProducts}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            ✅ Submit All Products
          </button>
          <button
            onClick={handleClearProducts}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            🗑️ Clear Products
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
