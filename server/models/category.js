const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categoryShema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: "Name is required",
      minlength: [3, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categoryShema);
