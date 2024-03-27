const productService = require("../Services/ProductService");

module.exports = {
  getProducts: async (req, res) => {
    try {
        const result = await productService.getProducts();
        if (!result.success) {
        res.status(400).send({
            message: result.message,
        });
        } else {
        res.send(JSON.stringify(result));
        }
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        message: error.message,
      });
    }
  },
  getProductByID: async (req, res) => {
    try {
        const result = await productService.getProductByID(req);
        if (!result.success) {
        res.status(400).send({
            message: result.message,
        });
        } else {
        res.send(JSON.stringify(result));
        }
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        message: error.message,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
        const result = await productService.createProduct(req);
        if (!result.success) {
        res.status(400).send({
            message: result.message,
        });
        } else {
        res.send(JSON.stringify(result));
        }
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        message: error.message,
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
        const result = await productService.updateProduct(req);
        if (!result.success) {
        res.status(400).send({
            message: result.message,
        });
        } else {
        res.send(JSON.stringify(result));
        }
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        message: error.message,
      });
    }
  },
  deleteProduct : async (req, res) => {
    try {
        const result = await productService.deleteProduct(req);
        if (!result.success) {
        res.status(400).send({
            message: result.message,
        });
        } else {
        res.send(JSON.stringify(result));
        }
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        message: error.message,
      });
  }
 }
};
