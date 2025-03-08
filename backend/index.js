import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.js";
 
// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI; // Use environment variable or fallback to local MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Use the product routes
app.use("/api", router); // All product routes will be prefixed with /api
 

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});