import Product from "../models/Product.js";

export const getProductController = async (req, res) => {
  console.log("Request received at /get-products"); // ✅ Debugging log

  try {
    const products = await Product.find();
    console.log("Fetched Products:", products); // ✅ Log output

    
    res.json({
      message: "Products fetched successfully",
      data: products,
      success: true,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};
