const express = require('express');
const productController = require("../Controllers/ProductController");
const { storage } = require("../dbConfig/cloudinary-config");
const multer = require("multer");
const upload = multer({ storage });

const model = require("../Models/ProductModel");

const router = express.Router();

router
    .get("/", productController.getProducts)
    .get("/:id", productController.getProductByID)
    .post("/",upload.single("image"), productController.createProduct)
    .put("/:id",upload.single("image"), productController.updateProduct)
    .delete("/:id", productController.deleteProduct);

module.exports = router;