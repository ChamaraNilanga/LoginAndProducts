const express = require('express');
const productController = require("../Controllers/ProductController");
const { storage } = require("../dbConfig/cloudinary-config");
const multer = require("multer");
const upload = multer({ storage });
const jwtService = require("../Utils/JWTValidate");

const model = require("../Models/ProductModel");

const router = express.Router();

router
    .get("/", productController.getProducts)
    .get("/:id", productController.getProductByID)
    .post("/",upload.single("image"),jwtService.ValidateAdmin, productController.createProduct)
    .put("/:id",upload.single("image"),jwtService.ValidateAdmin, productController.updateProduct)
    .delete("/:id",jwtService.ValidateAdmin, productController.deleteProduct);

module.exports = router;