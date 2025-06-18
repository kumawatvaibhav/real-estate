const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");

// Multer setup for memory storage (buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Upload image to Cloudinary
router.post("/upload", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "property_images",
    });

    res.status(200).json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error("❌ Cloudinary upload failed:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// ✅ Create a new property
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, price, location, images } = req.body;

    if (!title || !price || !location || !images || images.length === 0) {
      return res.status(400).json({ message: "All fields and at least one image are required" });
    }

    const property = new Property({
      title,
      description,
      price,
      location,
      images: Array.isArray(images) ? images : [images], // Ensure array
      postedBy: req.user.id,
    });

    await property.save();
    res.status(201).json(property);
  } catch (err) {
    console.error("❌ Error creating property:", err);
    res.status(400).json({ message: "Failed to create property", error: err.message });
  }
});

// ✅ Get properties posted by logged-in user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find({ postedBy: req.user.id });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Failed to load user properties", error: err.message });
  }
});

// ✅ Get all properties with optional filters
router.get("/", async (req, res) => {
  try {
    const { location, maxPrice } = req.query;

    let query = {};
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (maxPrice) {
      query.price = { $lte: parseInt(maxPrice) };
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

// ✅ Get a single property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("postedBy", "email");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Error fetching property", error: err.message });
  }
});

// ✅ Update property
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// ✅ Delete property
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: "Property not found" });

    if (prop.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await prop.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;
