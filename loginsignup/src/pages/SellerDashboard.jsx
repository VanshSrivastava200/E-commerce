import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SellerDashboard = () => {
  const [productData, setProductData] = useState({
    name: "",
    seller: "",
    price: "",
    stock: "",
    images: [],
    category: [],
    description: ""
  });

  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cat, setCat] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  // Fetch seller data and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductsLoading(true);
        const useremail = JSON.parse(localStorage.getItem("user"));
        if (!useremail) {
          console.log("You are logged out");
          return;
        }

        const userRes = await axios.post("http://localhost:3000/sellerdashboard", {
          email: useremail,
        });

        const sellerName = userRes.data.firstName;
        setProductData((prev) => ({ ...prev, seller: sellerName }));

        const productRes = await axios.get("http://localhost:3000/get-products", {
          params: { search: sellerName },
        });

        setMyProducts(productRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products");
      } finally {
        setProductsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate price and stock to be numbers
    if (name === 'price' || name === 'stock') {
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setProductData({ ...productData, [name]: value });
      }
    } else {
      setProductData({ ...productData, [name]: value });
    }
    
    // Clear messages when user starts typing
    if (error || success) {
      setError("");
      setSuccess("");
    }
  };

  const handleCategory = (e) => {
    e.preventDefault();
    if (cat.trim() === "" || productData.category.includes(cat.trim())) {
      setCat("");
      return;
    }
    setProductData({ ...productData, category: [...productData.category, cat.trim()] });
    setCat("");
  };

  const handleImages = (e) => {
    e.preventDefault();
    if (img.trim() === "" || productData.images.includes(img.trim())) {
      setImg("");
      return;
    }
    setProductData({ ...productData, images: [...productData.images, img.trim()] });
    setImg("");
  };

  const removeCategory = (indexToRemove) => {
    setProductData({
      ...productData,
      category: productData.category.filter((_, index) => index !== indexToRemove)
    });
  };

  const removeImage = (indexToRemove) => {
    setProductData({
      ...productData,
      images: productData.images.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (!productData.name || !productData.price || !productData.stock || !productData.description) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (productData.images.length === 0) {
      setError("Please add at least one image");
      setLoading(false);
      return;
    }

    if (productData.category.length === 0) {
      setError("Please add at least one category");
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post("http://localhost:3000/add-product", productData);
      console.log(result);
      
      setSuccess("Product added successfully!");
      
      // Reset form but keep seller name
      setProductData({
        name: "",
        seller: productData.seller,
        price: "",
        stock: "",
        images: [],
        category: [],
        description: ""
      });
      
      // Refresh products list
      const productRes = await axios.get("http://localhost:3000/get-products", {
        params: { search: productData.seller },
      });
      setMyProducts(productRes.data);
      
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.log("Failed to upload", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Seller Dashboard
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage your products and inventory
            </p>
          </div>
          <button 
            onClick={() => {    
              localStorage.clear();
              navigate("/login");
            }} 
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium transition-colors w-full sm:w-auto text-center"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* My Products Section */}
          <div className="bg-white shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 order-2 xl:order-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Products</h2>
              <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full w-fit">
                {myProducts.length} items
              </span>
            </div>

            {productsLoading ? (
              <div className="flex justify-center items-center h-32 sm:h-40">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : myProducts.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-3 sm:mb-4">📦</div>
                <p className="text-gray-500 text-base sm:text-lg mb-1">No products yet</p>
                <p className="text-gray-400 text-sm">Add your first product to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                {myProducts.map((prod, index) => (
                  <div 
                    key={index} 
                    className="rounded-lg border border-gray-200 flex flex-col overflow-hidden shadow-sm bg-white hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    <div className="relative">
                      <img 
                        className="aspect-square object-cover w-full"
                        src={prod.images[0]} 
                        alt={prod.name}
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        ${prod.price}
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2 line-clamp-1">
                        {prod.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 flex-1">
                        {prod.description}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          parseInt(prod.stock) > 10 
                            ? 'bg-green-100 text-green-800' 
                            : parseInt(prod.stock) > 0 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          Stock: {prod.stock}
                        </span>
                        {prod.category && prod.category.length > 0 && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded truncate max-w-[80px]">
                            {prod.category[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Product Section */}
          <div className="bg-white shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 order-1 xl:order-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Add New Product
            </h2>

            {/* Status Messages */}
            {error && (
              <div className="mb-3 sm:mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center text-sm">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            )}
            {success && (
              <div className="mb-3 sm:mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center text-sm">
                <span className="mr-2">✅</span>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={productData.name}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter product description"
                    value={productData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Price and Stock */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($) *
                    </label>
                    <input
                      type="text"
                      name="price"
                      placeholder="0.00"
                      value={productData.price}
                      onChange={handleChange}
                      className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock *
                    </label>
                    <input
                      type="text"
                      name="stock"
                      placeholder="Quantity"
                      value={productData.stock}
                      onChange={handleChange}
                      className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categories *
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add category"
                      value={cat}
                      onChange={(e) => setCat(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCategory(e)}
                      className="flex-1 p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base sm:rounded-r-none"
                    />
                    <button 
                      type="button"
                      onClick={handleCategory}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-l-none transition-colors text-sm sm:text-base"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 min-h-[40px] sm:min-h-[48px]">
                    {productData.category.map((val, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200 transition-colors"
                        onClick={() => removeCategory(index)}
                      >
                        {val}
                        <span className="text-blue-600 hover:text-blue-800 text-sm">×</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URLs *
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add image URL"
                      value={img}
                      onChange={(e) => setImg(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleImages(e)}
                      className="flex-1 p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base sm:rounded-r-none"
                    />
                    <button 
                      type="button"
                      onClick={handleImages}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-l-none transition-colors text-sm sm:text-base"
                    >
                      Add
                    </button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2 min-h-[60px] sm:min-h-[80px]">
                    {productData.images.map((val, index) => (
                      <div 
                        key={index} 
                        className="relative group cursor-pointer"
                        onClick={() => removeImage(index)}
                      >
                        <img 
                          className="w-full h-12 sm:h-16 object-cover rounded-lg border-2 border-gray-200 group-hover:border-red-300 transition-colors"
                          src={val} 
                          alt={`Preview ${index + 1}`}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-lg sm:text-xl font-bold">×</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 sm:py-4 px-6 rounded-lg font-semibold text-white transition-all text-sm sm:text-base ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:translate-y-[-1px]'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                    Adding Product...
                  </div>
                ) : (
                  'Add Product'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};