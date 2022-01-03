const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter a suitable product name."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Enter a suitable product description."],
  },
  price: {
    type: Number,
    required: [true, "Enter a validproduct price."],
    maxlength: [7, "Price of an item cannot be more than 7 digits."],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  //images is array of objects
  images: [
    {
      id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Choose a valid product category"],
  },
  stock: {
    type: Number,
    required: [true, "Enter a valid product stock"],
    maxlength: [4, "The value of stock cannot exceed more than 4 units"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  publicReviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
