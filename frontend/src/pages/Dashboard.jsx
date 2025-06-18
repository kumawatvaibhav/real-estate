import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [myProperties, setMyProperties] = useState([]);
  const [user, setUser] = useState({ name: "User", email: "user@xyz.abc", joined: "dd-mm-yy" });

  useEffect(() => {
    const fetchMyProps = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/properties/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyProperties(res.data);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      }
    };
    fetchMyProps();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyProperties(myProperties.filter(p => p._id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Dashboard</h2>
        <Link
          to="/Post"
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add New Property
        </Link>
      </div>

      <h3 className="text-xl font-semibold mb-4">My Properties</h3>
      {myProperties.length === 0 ? (
        <p className="text-gray-500">You haven’t listed anything yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {myProperties.map((p) => (
            <div
              key={p._id}
              className="border rounded-2xl shadow p-4 bg-white"
            >
              {p.images?.[0] && (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded-xl mb-2"
                />
              )}
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-gray-600 text-sm">{p.location}</p>
              <p className="text-indigo-600 font-bold mt-1">
                ₹{p.price.toLocaleString()}
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  to={`/edit-property/${p._id}`}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Overview */}
        <div className="border p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Account Overview</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {user.joined}</p>
          <p><strong>Properties:</strong> {myProperties.length}</p>
        </div>

        {/* Quick Actions */}
        <div className="border p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/post" className="block px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
                ➕ Add New Property
              </Link>
            </li>
            <li>
              <Link to="/edit-profile" className="block px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
                🧑 Edit Profile
              </Link>
            </li>
            <li>
              <Link to="/properties" className="block px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
                🔍 Browse Properties
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
