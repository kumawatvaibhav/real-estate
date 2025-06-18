import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TabButton = ({ active, children, onClick }) => (
  <button 
    className={`px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full ${active 
      ? 'bg-white text-gray-900 shadow-md' 
      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const BentoCard = ({ children, className = "", delay = 0 }) => (
  <div 
    className={`bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] ${className}`}
    style={{ 
      animationDelay: `${delay}ms`,
      animation: 'fadeInScale 0.8s ease-out forwards'
    }}
  >
    {children}
  </div>
);

const PropertySlideshow = ({ properties }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Use real properties from backend, fallback to sample if empty
  const displayProperties = properties.length > 0 ? properties.slice(0, 4) : [
    {
      _id: "sample1",
      title: "Modern 3BHK Apartment",
      location: "Bandra West, Mumbai",
      price: 25000000,
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center"],
      type: "Apartment",
      area: 1850,
      bedrooms: 3
    },
    {
      _id: "sample2", 
      title: "Luxury Villa with Garden",
      location: "Whitefield, Bangalore",
      price: 18000000,
      images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center"],
      type: "Villa",
      area: 2400,
      bedrooms: 4
    }
  ];

  useEffect(() => {
    if (displayProperties.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % displayProperties.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [displayProperties.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displayProperties.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + displayProperties.length) % displayProperties.length);
  };

  if (displayProperties.length === 0) {
    return (
      <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <div className="text-4xl mb-4">🏠</div>
          <p>Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full rounded-3xl overflow-hidden bg-gray-100">
      <div className="relative h-full">
        {displayProperties.map((property, index) => (
          <div
            key={property._id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="relative h-full">
              {property.images?.[0] ? (
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-6xl text-gray-400">🏠</div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                    Ready to Move
                  </span>
                  {property.type && (
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 capitalize">
                      {property.type}
                    </span>
                  )}
                </div>
                <h3 className="text-3xl font-semibold mb-3 tracking-tight">{property.title}</h3>
                <p className="text-lg mb-4 flex items-center opacity-90">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {property.location}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">₹{property.price.toLocaleString()}</div>
                  <div className="text-right">
                    {property.area && (
                      <>
                        <div className="text-sm opacity-80 mb-1">Area</div>
                        <div className="font-semibold text-lg">{property.area} sq.ft</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {displayProperties.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {displayProperties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

function Home() {
  const [properties, setProperties] = useState([]);
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [activeTab, setActiveTab] = useState('buy');
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties", {
        params: { location, maxPrice },
      });
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to load properties", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [location, maxPrice]);

  const handleSearch = () => {
    // Apply all filters when searching
    fetchProperties();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <style>{`
        @keyframes fadeInScale {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 pt-16 pb-20">
        
        {/* Bento Grid Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
            
            {/* Main Slideshow - Left Side */}
            <div className="lg:col-span-7 h-96 lg:h-full">
              <PropertySlideshow properties={properties} />
            </div>
            
            {/* Right Side Content */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-6">
              
              {/* Hero Text Card */}
              <BentoCard className="flex flex-col justify-center" delay={200}>
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight">
                    Find Your
                    <span className="block font-medium bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Dream Home
                    </span>
                  </h1>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Browse a variety of properties available for sale and rent. Use filters to find exactly what you're looking for.
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { number: `${properties.length}+`, label: "Properties" },
                      { number: "100+", label: "Cities" },
                      { number: "5M+", label: "Users" }
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoCard>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <BentoCard className="text-center" delay={400}>
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">Verified</h3>
                  <p className="text-xs text-gray-600">All properties verified</p>
                </BentoCard>
                
                <BentoCard className="text-center" delay={500}>
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">AI Powered</h3>
                  <p className="text-xs text-gray-600">Smart recommendations</p>
                </BentoCard>
                
                <BentoCard className="text-center" delay={600}>
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">Zero Fee</h3>
                  <p className="text-xs text-gray-600">No hidden charges</p>
                </BentoCard>
                
                <BentoCard className="text-center" delay={700}>
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">24/7 Support</h3>
                  <p className="text-xs text-gray-600">Always here to help</p>
                </BentoCard>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <BentoCard className="max-w-6xl mx-auto mb-16" delay={800}>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 p-2 bg-gray-100/50 rounded-2xl">
            <TabButton active={activeTab === 'buy'} onClick={() => setActiveTab('buy')}>
              Buy Property
            </TabButton>
            <TabButton active={activeTab === 'rent'} onClick={() => setActiveTab('rent')}>
              Rent Property
            </TabButton>
            <TabButton active={activeTab === 'commercial'} onClick={() => setActiveTab('commercial')}>
              Commercial
            </TabButton>
            <TabButton active={activeTab === 'pg'} onClick={() => setActiveTab('pg')}>
              PG/Co-living
            </TabButton>
          </div>
          
          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="Search by location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select 
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="house">Independent House</option>
                <option value="plot">Plot/Land</option>
                {activeTab === 'commercial' && (
                  <>
                    <option value="office">Office Space</option>
                    <option value="shop">Shop/Showroom</option>
                  </>
                )}
              </select>
            </div>
            
            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              />
            </div>
            
            {/* Bedrooms */}
            {activeTab !== 'commercial' && propertyType !== 'plot' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select 
                  className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option value="">Select BHK</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>
            )}
          </div>
          
          {/* Search Button */}
          <div className="flex justify-center">
            <button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 font-medium text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={handleSearch}
            >
              Search Properties
            </button>
          </div>
        </BentoCard>

        {/* Property Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Available Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {properties.length > 0 
                ? `Showing ${properties.length} properties matching your criteria`
                : "Loading properties..."
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((p, index) => (
              <Link to={`/property/${p._id}`} key={p._id} className="no-underline text-black">
                <BentoCard className="overflow-hidden flex flex-col h-full group" delay={index * 100}>
                  {p.images?.[0] && (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {p.title}
                        </h3>
                        {p.type && (
                          <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                            {p.type}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {p.location}
                      </p>
                      <p className="text-green-600 font-bold text-lg mt-2">
                        ₹{p.price.toLocaleString()}
                      </p>
                    </div>
                    {/* Optional details section */}
                    <div className="flex justify-between text-xs text-gray-700 mt-3">
                      {p.bedrooms && <span>{p.bedrooms} Beds</span>}
                      {p.bathrooms && <span>{p.bathrooms} Baths</span>}
                      {p.area && <span>{p.area} sq.ft</span>}
                    </div>
                  </div>
                </BentoCard>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;