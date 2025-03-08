import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  market: String,
  category: String,
  description: String,
  productImage: [String],
});

const Product = mongoose.model("Product", productSchema);
export default Product;
