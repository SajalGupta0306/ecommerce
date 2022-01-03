const productSchema = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const handleAsyncError = require("../middleware/handleAsyncError");

// getting all products
exports.getAllProdcts = handleAsyncError(async (req, res) => {
  const products = await productSchema.find();
  res.status(200).json({ message: "Success", products });
});

// creating a new product - Only Admin Accessible
exports.createNewProduct = handleAsyncError(async (req, res) => {
  const product = await productSchema.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// updating a product - Only Admin Accessible
exports.updateProduct = handleAsyncError(async (req, res, next) => {
  // checking if product which needs to updated exists or not
  let productToUpdate = await productSchema.findById(req.params.id);
  if (!productToUpdate) {
    return next(new Errorhandler("Product not found", 404));
  }
  // updating the product based on the id
  productToUpdate = await productSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(201).json({
    success: true,
    productToUpdate,
  });
});

// deleting a product - Only Admin Accessible
exports.deleteProduct = handleAsyncError(async (req, res, next) => {
  // checking if product which needs to deleted exists or not
  let productToDelete = await productSchema.findById(req.params.id);
  if (!productToDelete) {
    return next(new Errorhandler("Product not found", 404));
  }
  productToDelete = await productSchema.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    productToDelete,
  });
});

// getting a specific product
exports.getProductDetails = handleAsyncError(async (req, res, next) => {
  let getProductetails = await productSchema.findById(req.params.id);
  if (!getProductetails) {
    return next(new Errorhandler("Product not found", 404));
  }
  res.status(201).json({
    success: true,
    getProductetails,
  });
});
