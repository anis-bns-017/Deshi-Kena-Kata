import express from "express";
const router = express.Router();

import addProductController from "../controllers/addProductController.js";
import { getProductController } from "../controllers/getProductController.js";
 
router.post("/add-products", addProductController);
router.get("/get-products", getProductController);

export default router;