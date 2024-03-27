const Product = require("../Models/ProductModel");
const imageUploader = require("../Utils/ImageUploader");

module.exports = {
  getProductByID: async (req) => {
    try {
      const id = req.params.id;
      const products = await Product.findById(id);
      if (products) {
        return { data: products, statusCode: 200, success: true , message: "Products get successfully"};
      } else {
        return { success: false, statusCode: 400, message: "Products not found" };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getProducts: async (req) => {
    try {
      const products = await Product.find();
      if (products) {
        return { data: products, statusCode: 200, success: true , message: "Products get successfully"};
      } else {
        return { success: false, statusCode: 400, message: "Products not found" };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createProduct: async (req) => {
    const { name, price, description , size , color } = req.body;
    try {
      const existProduct = await Product.findOne({ name , description });
      if (existProduct === null) {
        const image = await imageUploader.imageUploader(req);
        console.log("imgee:",image);
        const product = new Product(
            {
                name: name,
                price: price,
                description: description,
                size: size,
                color: color,
                image: image
            }
        );
        const data = await product.save();
        return { data: data, statusCode: 201, success: true };
      } else {
        return { success: false, message: "Product already exists" };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateProduct: async (req) => {
    const { name, price, description } = req.body;
    const id = req.params.id;
    const image = await imageUploader.imageUploader(req);
    try {
        let updateQuery = {};
        if (name) {
            updateQuery.name = name;
        }
        if (price) {
            updateQuery.price = price;
        }
        if (description) {
            updateQuery.description = description;
        }
        if (image!=null || image!=undefined || image!="") {
            updateQuery.image = image;
        }
      const product = await Product.findOneAndUpdate(
        { _id: id },
        updateQuery,
        { new: true }
      );
      if (product) {
        return { data: product, statusCode: 201, success: true , message: "Product updated successfully" };
      } else {
        return { success: false, statusCode: 400, message: "Product not found" };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteProduct: async (req) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (product) {
            return { data: product, statusCode: 200, success: true , message: "Product deleted successfully"};
        } else {
            return { success: false, statusCode: 400, message: "Product not found" };
        }
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  getProductByID: async (id) => {
      const product = await Product.findById(id);
      return product
  }
};
