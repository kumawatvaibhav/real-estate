import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostProperty from "./pages/PostProperty";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AllProperties from "./pages/AllProperties";
import PropertyDetail from "./pages/PropertyDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* ✅ Always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<PostProperty />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/properties" element={<AllProperties />} /> 
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
