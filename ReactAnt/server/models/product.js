const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      text: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      text: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
      type: String,
      enum: ["Apple", "SamSung", "Microsoft", "Lenovo", "ASUS"],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
