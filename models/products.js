const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },

  Photo1: {
    type: String,
    default: "",
  },
  Photo2: { type: String, default: "" },
  Photo3: {
    type: String,
    default: "",
  },
  Photo4: {
    type: String,
    default: "",
  },
  Photo5: {
    type: String,
    default: "",
  },
  Photo6: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Products", ProductsSchema);
