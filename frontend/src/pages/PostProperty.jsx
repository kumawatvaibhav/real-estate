import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",               // ✅ Changed from 'name' to 'title'
    price: "",
    location: "",
    description: "",
    type: "buy",
    status: "available",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = "";

      // Upload image to Cloudinary
      if (imageFile) {
        const imgData = new FormData();
        imgData.append("image", imageFile);

        const token = localStorage.getItem("token");

        const res = await axios.post("http://localhost:5000/api/properties/upload", imgData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        imageUrl = res.data.imageUrl;
      }

      // Post property
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/properties",
        {
          ...formData,
          images: [imageUrl], // ✅ Make sure this is 'images' and it's an array
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/");
    } catch (err) {
      console.error("Error uploading property:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error posting property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Post a New Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Posting..." : "Post Property"}
        </button>
      </form>
    </div>
  );
};

export default PostProperty;
