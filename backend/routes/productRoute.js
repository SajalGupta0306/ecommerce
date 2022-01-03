const express = require("express");
const {
  getAllProdcts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");

const router = express.Router();

// routes for the products
router.route("/products").get(getAllProdcts);
router.route("/product/createNewProduct").post(createNewProduct);
router.route("/product/updateProduct/:id").put(updateProduct);
router.route("/product/deleteProduct/:id").delete(deleteProduct);
router.route("/product/getProductDetails/:id").get(getProductDetails);

module.exports = router;