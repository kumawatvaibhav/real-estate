const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  location: String,
  images: [String],
  type: String, // e.g., "Flat", "Villa", etc.
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", PropertySchema);
