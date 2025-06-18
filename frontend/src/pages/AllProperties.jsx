import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties");
        setProperties(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch properties", err);
      }
    };
    fetchProperties();
  }, []);

  const handleFilter = () => {
    let results = [...properties];

    if (search) {
      results = results.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (location) {
      results = results.filter((p) =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (maxPrice) {
      results = results.filter((p) => p.price <= parseInt(maxPrice));
    }

    setFiltered(results);
  };

  return (
    <div>
      <h2>Search Properties</h2>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={handleFilter}>Apply Filters</button>
      </div>

      {filtered.length === 0 ? (
        <p>No properties found</p>
      ) : (
        filtered.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            {p.images?.[0] && (
              <img src={p.images[0]} alt={p.title} style={{ width: "200px" }} />
            )}

            <Link to={`/property/${p._id}`}>
              <h3>{p.title}</h3>
            </Link>
            <p>
              <strong>Location:</strong> {p.location}
            </p>
            <p>
              <strong>Price:</strong> ₹{p.price}
            </p>
            <p>
              <strong>Posted by:</strong> {p.postedBy?.email || "Unknown"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default AllProperties;
