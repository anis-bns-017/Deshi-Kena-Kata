import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  market: String,
  category: String,
  description: String,
  productImage: [String],
  createdAt: { type: Date, default: Date.now }, // Added createdAt field
  updatedAt: { type: Date, default: Date.now }, //Added updatedAt field
});

//pre middleware to update the updatedAt field.
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;