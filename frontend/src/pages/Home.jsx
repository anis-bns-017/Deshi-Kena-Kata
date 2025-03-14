import { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductModal from "../components/ProductModal";

const markets = [
  "Karwan Bazar (কারওয়ান বাজার)",
  "Jatrabari Bazar (যাত্রাবাড়ী বাজার)",
  "Shyambazar (শ্যামবাজার)",
  "Mirpur 1 Vegetable Market (মিরপুর ১ বাজার)",
  "Gabtoli Bazar (গাবতলী বাজার)",
  "Mohammadpur Krishi Market (মোহাম্মদপুর কৃষি বাজার)",
  "Khatunganj Bazar (খাতুনগঞ্জ বাজার)",
  "Reazuddin Bazar (রিয়াজউদ্দিন বাজার)",
  "Bohoddarhat Bazar (বহদ্দারহাট বাজার)",
  "Bandar Bazar (সিলেট বন্দর বাজার)",
  "Shaheb Bazar (সাহেব বাজার)",
  "Port Road Market (পোর্ট রোড বাজার)",
  "Khulna Boro Bazar (খুলনা বড় বাজার)",
  "Cumilla Tomcham Bridge Bazar (কুমিল্লা টমছম ব্রিজ বাজার)",
  "Noakhali Maijdee Bazar (নোয়াখালী মাইজদী বাজার)",
  "Bogura Sathmatha Bazar (বগুড়া সাতমাথা বাজার)",
  "Notun Bazar, Badda (নতুন বাজার, বাড্ডা)",
  "Mohakhali Kacha Bazar (মহাখালী কাঁচাবাজার)",
  "Reazuddin Bazar, Chattogram (রেয়াজুদ্দিন বাজার, চট্টগ্রাম)",
  "Teknaf Bazar, Teknaf (টেকনাফ বাজার, টেকনাফ)",
  "Chawkbazar, Chattogram (চকবাজার, চট্টগ্রাম)",
  "Daulatpur Bazar, Khulna (দৌলতপুর বাজার, খুলনা)",
  "Notun Bazar, Khulna (নতুন বাজার, খুলনা)",
  "Sat Rasta Bazar, Khulna (সাত রাস্তা বাজার, খুলনা)",
  "Baneshwar Bazar, Puthia (বানেশ্বর বাজার, পুঠিয়া)",
  "Upashahar Bazar, Rajshahi (উপশহর বাজার, রাজশাহী)",
  "New Market, Rajshahi (নিউ মার্কেট, রাজশাহী)",
  "Kalighat Bazar, Sylhet (কালীঘাট বাজার, সিলেট)",
  "Ambarkhana Bazar, Sylhet (আম্বরখানা বাজার, সিলেট)",
  "Notun Bazar, Sylhet (নতুন বাজার, সিলেট)",
  "Notun Bazar, Barishal (নতুন বাজার, বরিশাল)",
  "Kaunia Bazar, Barishal (কাউনিয়া বাজার, বরিশাল)",
  "Chawkbazar, Barishal (চকবাজার, বরিশাল)",
  "New Market, Rangpur (নিউ মার্কেট, রংপুর)",
  "jahaj kompani mor bazar, Rangpur (জাহাজ কোম্পানি মোড় বাজার, রংপুর)",
  "Lalbag Bazar, Dinajpur (লালবাগ বাজার, দিনাজপুর)",
  "Mechua Bazar, Mymensingh (মেছুয়া বাজার, ময়মনসিংহ)",
  "Notun Bazar, Mymensingh (নতুন বাজার, ময়মনসিংহ)",
  "Boro Bazar, Jamalpur (বড় বাজার, জামালপুর)",
  "Railway Bazar, Netrokona (রেলওয়ে বাজার, নেত্রকোনা)",
  "Rajganj Bazar, Cumilla (রাজগঞ্জ বাজার, কুমিল্লা)",
  "Shashongacha Bazar, Cumilla (শাসনগাছা বাজার, কুমিল্লা)",
  "New Market, Cumilla (নিউ মার্কেট, কুমিল্লা)",
  "Choumuhani Bazar, Begumganj (চৌমুহনী বাজার, বেগমগঞ্জ)",
  "Sonapur Bazar, Noakhali Sadar (সোনাপুর বাজার, নোয়াখালী সদর)",
  "Datterhat Bazar, Senbag (দত্তেরহাট বাজার, সেনবাগ)",
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState({ field: "name", order: "asc" });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMarket, setSelectedMarket] = useState("all");
  const [selectedDate, setSelectedDate] = useState(""); // State for date filter
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const fetchProducts = async () => {
    try {
      const response = await fetch(SummaryApi.getProducts.url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response");
      }

      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
        toast.success("Products loaded successfully! 🎉");
      } else {
        toast.error(`Failed to fetch products: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error fetching products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Here is the productList: ", products);
  

  // Filter products based on search query, category, market, and date
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesMarket =
      selectedMarket === "all" || product.market === selectedMarket;

    // Date filtering logic
    const matchesDate =
      !selectedDate ||
      new Date(product.createdAt).toISOString().split("T")[0] === selectedDate;

    return matchesSearch && matchesCategory && matchesMarket && matchesDate;
  });

  // Sort products based on the selected field and order
  const sortedProducts = filteredProducts.sort((a, b) => {
    const { field, order } = sortBy;

    if (field === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    } else if (field === "quantity") {
      return order === "asc"
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    } else {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open product details modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  // Close product details modal
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Product List
      </h1>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Fruit">Fruit</option>
        </select>

        <select
          value={selectedMarket}
          onChange={(e) => setSelectedMarket(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Markets</option>
          {markets.map((market, index) => (
            <option key={index} value={market}>
              {market}
            </option>
          ))}
        </select>

        {/* Date Filter */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Sort Dropdown */}
        <select
          value={`${sortBy.field}-${sortBy.order}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split("-");
            setSortBy({ field, order });
          }}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name-asc">Sort by Name (A-Z)</option>
          <option value="name-desc">Sort by Name (Z-A)</option>
          <option value="price-asc">Sort by Price (Low to High)</option>
          <option value="price-desc">Sort by Price (High to Low)</option>
          <option value="quantity-asc">Sort by Quantity (Low to High)</option>
          <option value="quantity-desc">Sort by Quantity (High to Low)</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Display products in cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  {product.name}
                </h2>
                <p className="text-gray-700 font-medium">
                  Price: ${product.price}
                </p>
                <p className="text-gray-700">Quantity: {product.quantity}</p>
                <p className="text-gray-700">Market: {product.market}</p>
                <p className="text-gray-700">Category: {product.category}</p>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-gray-600 text-sm">
                  Date: {new Date(product.createdAt).toLocaleDateString()}
                </p>{" "}
                {/* Display product date */}
                <div className="mt-4">
                  <span className="font-medium">Images:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.productImage.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-20 h-20 object-cover rounded border border-gray-300"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from(
              { length: Math.ceil(sortedProducts.length / productsPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-4 py-2 rounded-lg ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(sortedProducts.length / productsPerPage)
              }
              className="mx-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeProductModal} />
      )}
    </div>
  );
};

export default Home;
