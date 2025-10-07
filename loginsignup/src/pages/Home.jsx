import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaClipboardList,
  FaSignOutAlt,
  FaArrowLeft,
  FaTimes,
  FaBars,
} from "react-icons/fa";

export const Home = () => {
  const [isUser, setIsUser] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [search, setSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const useremail = JSON.parse(localStorage.getItem("user"));
    if (useremail) {
      setIsUser(true);
      axios
        .post("http://localhost:3000/home", { email: useremail })
        .then((res) => {
          setCurrUser(res.data);
        })
        .catch((err) => {
          console.log("Failed to fetch user", err);
        });
    }
  }, []);

  const handlelogout = () => {
    localStorage.clear();
    setIsUser(false);
    navigate(0);
  };

  const handlelogin = () => {
    navigate("/login");
  };

  const handlesearchchange = (e) => {
    setSearchVal(e.target.value);
  };

  const handlesearch = async (e) => {
    e.preventDefault();
    if (searchVal.trim() !== "") {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/home-search", {
          params: { search: searchVal },
        });
        setSearch(res.data);
      } catch (err) {
        console.log("Failed to fetch data", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const clearSearch = () => {
    setSearchVal("");
    setSearch([]);
  };

  const categories = [
    {
      name: "ELECTRONICS",
      image: "https://cdn.wccftech.com/wp-content/uploads/2025/03/iPhone-17-3-1.jpg",
    },
    {
      name: "ELECTRICALS",
      image: "https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2024/09/lgscreensaverad_5-copy.jpg",
    },
    {
      name: "MEN'S FASHION",
      image: "https://api.raymond.in/uploads/brand/1661149094350Made%20to%20mesure.jpg",
    },
    {
      name: "WOMEN'S FASHION",
      image: "https://www.medianews4u.com/wp-content/uploads/2021/10/Nykaa-Fashion-announces-Alaya-F-as-the-New-Face-of-The-Brand.jpg",
    },
    {
      name: "WATCHES",
      image: "https://www.watchonista.com/sites/default/files/watchographer/2914/articles/436874/front/fossil-ad_rectangle.jpg",
    },
    {
      name: "FOOTWEAR",
      image: "https://i.pinimg.com/originals/c5/17/52/c517521e4f7b1b6bd11f064d8eddbfd6.jpg",
    },
    {
      name: "SPORTS WEAR",
      image: "https://www.blockchaingamer.biz/wp-content/uploads/2022/11/adidas-impossible-is-nothing.jpg",
    },
    {
      name: "ACCESSORIES",
      image: "https://s24.q4cdn.com/131595232/files/doc_multimedia/Untitled.jpg",
    },
    {
      name: "KITCHENWARE",
      image: "https://newspaperads.ads2publish.com/wp-content/uploads/2019/09/ellementry-com-kitchenware-tableware-ad-delhi-times-04-09-2019.png",
    },
    {
      name: "FURNITURE",
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/635743100801015.5f1085a028fe8.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebar(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaBars className="text-gray-600 text-lg" />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              <h1 className="text-xl font-bold text-gray-800">ShopEase</h1>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handlesearch} className="flex w-full">
                <input
                  onChange={handlesearchchange}
                  value={searchVal}
                  className="flex-1 border-l outline-none placeholder:text-gray-400 bg-white p-3 text-sm border-t border-b border-gray-300 rounded-l-lg"
                  placeholder="Search for products, brands and more..."
                  type="text"
                />
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-900 transition-colors text-white px-6 rounded-r-lg"
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isUser ? (
                <>
                  <button className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                    <FaUser className="text-sm" />
                    <span className="text-sm">Account</span>
                  </button>
                  <button className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                    <FaClipboardList className="text-sm" />
                    <span className="text-sm">Orders</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                    <FaShoppingCart className="text-sm" />
                    <span className="text-sm hidden sm:inline">Cart</span>
                  </button>
                  <button
                    onClick={handlelogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <FaSignOutAlt className="text-sm" />
                    <span className="text-sm hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handlelogin}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden mt-3">
            <form onSubmit={handlesearch} className="flex w-full">
              <input
                onChange={handlesearchchange}
                value={searchVal}
                className="flex-1 border-l outline-none placeholder:text-gray-400 bg-white p-3 text-sm border-t border-b border-gray-300 rounded-l-lg"
                placeholder="Search for products..."
                type="text"
              />
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 transition-colors text-white px-4 rounded-r-lg"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {search.length === 0 ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">ShopEase</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                Discover amazing products across all categories. Fast delivery, great prices, and exceptional service.
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      src={category.image}
                      alt={category.name}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base text-center group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Search Results */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Search Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Search Results for "{searchVal}"
                </h2>
                <p className="text-sm text-gray-600">
                  {search.length} product{search.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {search.map((prod, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        src={prod.images[0]}
                        alt={prod.name}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 text-lg mb-2">
                        {prod.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {prod.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500">
                          {prod.stock} remaining
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xs">
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-800">
                          ${prod.price}
                        </span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transform ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setSidebar(false)}
        ></div>

        {/* Sidebar Content */}
        <div className="relative w-80 h-full bg-white">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button
                onClick={() => setSidebar(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-600" />
              </button>
            </div>
            
            {isUser && currUser && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {currUser.name ? currUser.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {currUser.name || 'User'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currUser.email || ''}
                  </p>
                </div>
              </div>
            )}
          </div>

          <nav className="p-4">
            {isUser ? (
              <div className="space-y-2">
                <button className="flex items-center space-x-3 w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <FaUser className="text-gray-400" />
                  <span>Account</span>
                </button>
                <button className="flex items-center space-x-3 w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <FaClipboardList className="text-gray-400" />
                  <span>Orders</span>
                </button>
                <button className="flex items-center space-x-3 w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <FaShoppingCart className="text-gray-400" />
                  <span>Cart</span>
                </button>
                <button
                  onClick={handlelogout}
                  className="flex items-center space-x-3 w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors text-red-600"
                >
                  <FaSignOutAlt className="text-red-400" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handlelogin}
                className="flex items-center space-x-3 w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <FaUser className="text-gray-400" />
                <span>Login</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};