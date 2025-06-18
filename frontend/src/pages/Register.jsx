import { useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!form.agreeToTerms) {
      setError("You must agree to the terms");
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link to="/login" className="font-medium text-emerald-600 hover:underline">
              sign in to your existing account
            </Link>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white py-8 px-6 shadow rounded-xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Register</h3>
          <p className="text-sm text-gray-500 mb-6">
            Create a new account to start using our platform
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={form.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  privacy policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
