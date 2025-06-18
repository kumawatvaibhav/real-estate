import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle } from "lucide-react";

function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
                setProperty(res.data);
            } catch (err) {
                console.error("Failed to load property", err);
            }
        };
        fetchProperty();
    }, [id]);

    if (!property) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
            {/* Left Side */}
            <div className="flex-1">
                <div className="rounded-xl overflow-hidden shadow">
                    <img
                        src={property.images?.[0]}
                        alt={property.title}
                        className="w-full h-[400px] object-cover"
                    />
                </div>

                <div className="flex justify-between items-center mt-6">
                    <h2 className="text-2xl font-bold">{property.title}</h2>
                    <span className="text-xl text-green-600 font-semibold">₹{property.price}</span>
                </div>

                <p className="text-gray-600 mt-2">{property.location}</p>

                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-100 p-4 rounded-xl text-center">
                        <p className="font-semibold text-lg">{property.bedrooms || 2}</p>
                        <p className="text-gray-500 text-sm">Bedrooms</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl text-center">
                        <p className="font-semibold text-lg">{property.bathrooms || 2}</p>
                        <p className="text-gray-500 text-sm">Bathrooms</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl text-center">
                        <p className="font-semibold text-lg">{property.area || "1200 sq.ft"}</p>
                        <p className="text-gray-500 text-sm">Area</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{property.description}</p>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
                        {property.features?.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="text-green-500 w-4 h-4" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Side - Contact Box */}
            <div className="w-full lg:w-[300px] bg-gray-50 p-6 rounded-xl shadow">
                <h3 className="text-lg font-bold mb-4">Contact Owner</h3>
                <p className="text-sm text-gray-700 mb-2">
                    <strong>Owner:</strong> {property.user?.name || "John Smith"}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                    <strong>Email:</strong> {property.user?.email}
                </p>
                <button className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 mb-2">
                    Contact Owner
                </button>
                <button className="border w-full py-2 rounded-md hover:bg-gray-100">
                    Schedule Viewing
                </button>
            </div>
        </div>
    );
}

export default PropertyDetail;
