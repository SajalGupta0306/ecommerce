const productSchema = require("../models/productModel");

// getting all products
exports.getAllProdcts = async (req, res) => {
  const products = await productSchema.find();
  res.status(200).json({ message: "Success", products });
};

// creating a new product - Only Admin Accessible
exports.createNewProduct = async (req, res) => {
  const product = await productSchema.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// updating a product - Only Admin Accessible
exports.updateProduct = async (req, res, next) => {
  // checking if product which needs to updated exists or not
  let productToUpdate = await productSchema.findById(req.params.id);
  if (!productToUpdate) {
    return res.status(500).json({
      success: false,
      error: "Product not found.",
    });
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
};

// deleting a product - Only Admin Accessible
exports.deleteProduct = async (req, res) => {
  // checking if product which needs to deleted exists or not
  let productToDelete = await productSchema.findById(req.params.id);
  if (!productToDelete) {
    return res.status(500).json({
      success: false,
      error: "Product not found.",
    });
  }
  productToDelete = await productSchema.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    productToDelete,
  });
};

// getting a specific product 
exports.getProductDetails = async (req, res) => {
  let getProductetails = await productSchema.findById(req.params.id);
  if (!getProductetails) {
    return res.status(500).json({
      success: false, 
      error: "Product not found.",
    });
  }
  res.status(201).json({
    success: true,
    getProductetails,
  });
};
