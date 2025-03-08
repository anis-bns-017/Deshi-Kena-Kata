import Product from "../models/Product.js";

const addProductController = async (req, res) => {
  try {
    console.log("Received product data:", req.body);

    const product = new Product(req.body);
    await product.save();

    console.log("Saved product:", product);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

export default addProductController;