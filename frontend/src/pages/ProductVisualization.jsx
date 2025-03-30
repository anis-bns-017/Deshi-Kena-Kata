import { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  BarChart,                                                                                                 
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,             
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";
import { formatISODate, generateAllMonths } from "../helpers/utils";

const ProductVisualization = () => {
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("singleDate"); // 'singleDate' or 'monthly'
  const [priceRange, setPriceRange] = useState([0, 10000]); // Price range filter
  const [quantityRange, setQuantityRange] = useState([0, 10000]); // Quantity range filter
  const [darkMode, setDarkMode] = useState(false); // Dark mode toggle

  // Fetch products from the API
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
        setData(data.data);
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

  const [selectedProduct, setSelectedProduct] = useState(data[0]?.name || "");

  // Extract unique product names
  const uniqueProducts = [...new Set(data.map((item) => item.name))];

  // Extract unique markets
  const uniqueMarkets = [...new Set(data.map((item) => item.market))];

  // Generate all months (e.g., "January 2025", "February 2025", etc.)
  const allMonths = generateAllMonths(2025, 2025);

  // Filter data based on selected product, market, date/month, price, and quantity
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (!item.createdAt) return false; // Skip if date is undefined or null

      const itemDate = formatISODate(item.createdAt); // `yyyy-mm-dd`
      const matchesPrice =
        item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesQuantity =
        item.quantity >= quantityRange[0] && item.quantity <= quantityRange[1];

      if (viewMode === "singleDate") {
        return (
          item.name === selectedProduct &&
          itemDate === selectedDate &&
          matchesPrice &&
          matchesQuantity
        );
      } else if (viewMode === "monthly") {
        const itemMonth = new Date(item.createdAt).toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        return (
          item.name === selectedProduct &&
          item.market === selectedMarket &&
          itemMonth === selectedMonth &&
          matchesPrice &&
          matchesQuantity
        );
      }
      return false;
    });
  }, [
    data,
    selectedProduct,
    selectedMarket,
    selectedDate,
    selectedMonth,
    priceRange,
    quantityRange,
  ]);

  const hasDataForSelectedMonth = data.some((item) => {
    if (!item.createdAt) return false; // Skip if date is undefined or null

    const itemMonth = new Date(item.createdAt).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    return itemMonth === selectedMonth && item.name === selectedProduct;
  });

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedProduct("");
    setSelectedMarket("");
    setSelectedDate("");
    setSelectedMonth("");
    setPriceRange([0, 10000]);
    setQuantityRange([0, 10000]);
  };

  // Export chart as an image
  const chartRef = useRef(null);

  const handleExportChart = () => {
    if (chartRef.current) {
      const chartElement = chartRef.current.container;
      if (chartElement) {
        const svgElement = chartElement.querySelector("svg");
        if (svgElement) {
          const svgData = new XMLSerializer().serializeToString(svgElement);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas dimensions
          canvas.width = svgElement.clientWidth;
          canvas.height = svgElement.clientHeight;

          // Create an image from the SVG data
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "chart.png";
            link.click();
          };
          img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        } else {
          toast.error("SVG element not found!");
        }
      } else {
        toast.error("Chart container not found!");
      }
    }
  };

  // Custom Tooltip for Market Info
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-4 rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          <p className="font-semibold">{payload[0].payload.name}</p>
          <p>Market: {payload[0].payload.market}</p>
          <p className="text-blue-500">Price: {payload[0].value} Tk</p>
          <p>Quantity: {payload[0].payload.quantity} kg</p>
        </div>
      );
    }
    return null;
  };

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`p-6 min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Product Visualization
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze product prices across markets and time periods.
        </p>
      </div>

      {/* Filters */}
      <div
        className={`p-6 rounded-lg shadow-md mb-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Product Filter */}
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              Product
            </label>
            <select
              className={`w-full p-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-50 text-gray-900 border-gray-300"
              }`}
              onChange={(e) => setSelectedProduct(e.target.value)}
              value={selectedProduct}
            >
              <option value="">Select Product</option>
              {uniqueProducts.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              View Mode
            </label>
            <div className="flex gap-2">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="viewMode"
                  value="singleDate"
                  checked={viewMode === "singleDate"}
                  onChange={() => setViewMode("singleDate")}
                />
                Single Date
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="viewMode"
                  value="monthly"
                  checked={viewMode === "monthly"}
                  onChange={() => setViewMode("monthly")}
                />
                Monthly
              </label>
            </div>
          </div>

          {/* Date Filter */}
          {viewMode === "singleDate" && (
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-1`}
              >
                Date
              </label>
              <input
                type="date"
                className={`w-full p-2 border rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 text-gray-900 border-gray-300"
                }`}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          )}

          {/* Market Filter */}
          {viewMode === "monthly" && (
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-1`}
              >
                Market
              </label>
              <select
                className={`w-full p-2 border rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 text-gray-900 border-gray-300"
                }`}
                onChange={(e) => setSelectedMarket(e.target.value)}
                value={selectedMarket}
              >
                <option value="">Select Market</option>
                {uniqueMarkets.map((market, index) => (
                  <option key={index} value={market}>
                    {market}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Month Filter */}
          {viewMode === "monthly" && (
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-1`}
              >
                Month
              </label>
              <select
                className={`w-full p-2 border rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 text-gray-900 border-gray-300"
                }`}
                onChange={(e) => setSelectedMonth(e.target.value)}
                value={selectedMonth}
              >
                <option value="">Select Month</option>
                {allMonths.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price Range Filter */}
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              Price Range (BDT)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
                className={`w-1/2 p-2 border rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 text-gray-900 border-gray-300"
                }`}
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                className={`w-1/2 p-2 border rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 text-gray-900 border-gray-300"
                }`}
              />
            </div>
          </div>

          {/* Quantity Range Filter */}
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              Quantity Range (kg)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={quantityRange[0]}
                onChange={(e) =>
                  setQuantityRange([e.target.value, quantityRange[1]])
                }
                className={`w-1/2 p-2 border rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 text-gray-900 border-gray-300"
                }`}
              />
              <input
                type="number"
                placeholder="Max"
                value={quantityRange[1]}
                onChange={(e) =>
                  setQuantityRange([quantityRange[0], e.target.value])
                }
                className={`w-1/2 p-2 border rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 text-gray-900 border-gray-300"
                }`}
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="sm:col-span-2 lg:col-span-4">
            <button
              onClick={handleClearFilters}
              className={`w-full px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-red-500 hover:bg-red-600"
              } text-white transition`}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {filteredData.length === 0 ? (
        <div className="text-center text-red-500 font-semibold">
          No data available for {selectedProduct} in{" "}
          {viewMode === "singleDate"
            ? `on ${selectedDate}`
            : `${selectedMonth} ${selectedMarket}`}
          .
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div
            id="barChart"
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Bar Chart</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filteredData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#4A5568" : "#E2E8F0"}
                />
                <XAxis
                  dataKey="market"
                  stroke={darkMode ? "#CBD5E0" : "#4A5568"}
                />
                <YAxis stroke={darkMode ? "#CBD5E0" : "#4A5568"} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="price"
                  fill="#8884d8"
                  isAnimationActive={true}
                  animationDuration={500}
                >
                  {filteredData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        [
                          "#8884d8",
                          "#83a6ed",
                          "#8dd1e1",
                          "#82ca9d",
                          "#a4de6c",
                          "#d0ed57",
                          "#ffc658",
                          "#ff7300",
                          "#e74c3c",
                          "#3498db",
                          "#2ecc71",
                          "#f39c12",
                          "#9b59b6",
                          "#1abc9c",
                        ][index % 14]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <button
              onClick={() => handleExportChart("barChart")}
              className={`mt-4 w-full px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition`}
            >
              Export as Image
            </button>
          </div>

          {/* Line Chart */}
          <div
            id="lineChart"
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Line Chart</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#4A5568" : "#E2E8F0"}
                />
                <XAxis
                  dataKey="market"
                  stroke={darkMode ? "#CBD5E0" : "#4A5568"}
                />
                <YAxis stroke={darkMode ? "#CBD5E0" : "#4A5568"} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={{
                    stroke: "#82ca9d",
                    strokeWidth: 2,
                    r: 6,
                    fill: "#fff",
                  }}
                  activeDot={{
                    stroke: "#82ca9d",
                    strokeWidth: 2,
                    r: 8,
                    fill: "#fff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
            <button
              onClick={() => handleExportChart("lineChart")}
              className={`mt-4 w-full px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition`}
            >
              Export as Image
            </button>
          </div>

          {/* Area Chart */}
          <div
            id="areaChart"
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Area Chart</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff7300" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#4A5568" : "#E2E8F0"}
                />
                <XAxis
                  dataKey="market"
                  stroke={darkMode ? "#CBD5E0" : "#4A5568"}
                />
                <YAxis stroke={darkMode ? "#CBD5E0" : "#4A5568"} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#ff7300"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <button
              onClick={() => handleExportChart("areaChart")}
              className={`mt-4 w-full px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition`}
            >
              Export as Image
            </button>
          </div>

          {/* Pie Chart */}
          <div
            id="pieChart"
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Pie Chart</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={filteredData}
                  dataKey="price"
                  nameKey="market"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                >
                  {filteredData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        [
                          "#8884d8",
                          "#83a6ed",
                          "#8dd1e1",
                          "#82ca9d",
                          "#a4de6c",
                          "#d0ed57",
                          "#ffc658",
                          "#ff7300",
                          "#e74c3c",
                          "#3498db",
                          "#2ecc71",
                          "#f39c12",
                          "#9b59b6",
                          "#1abc9c",
                        ][index % 14]
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <button
              onClick={() => handleExportChart("pieChart")}
              className={`mt-4 w-full px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition`}
            >
              Export as Image
            </button>
          </div>

          {/* Radar Chart */}
          <div
            id="radarChart"
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Radar Chart</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={filteredData}>
                <PolarGrid stroke={darkMode ? "#4A5568" : "#E2E8F0"} />
                <PolarAngleAxis
                  dataKey="market"
                  stroke={darkMode ? "#CBD5E0" : "#4A5568"}
                />
                <PolarRadiusAxis stroke={darkMode ? "#CBD5E0" : "#4A5568"} />
                <Tooltip />
                <Legend />
                <Radar
                  dataKey="price"
                  stroke="#ff7300"
                  fill="#ff7300"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
            <button
              onClick={() => handleExportChart("radarChart")}
              className={`mt-4 w-full px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition`}
            >
              Export as Image
            </button>
          </div>

          {/* Scatter Chart */}
          <div
            id="scatterChart"
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Scatter Chart</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid stroke={darkMode ? "#4A5568" : "#E2E8F0"} />
                <XAxis
                  type="category"
                  dataKey="market"
                  stroke={darkMode ? "#CBD5E0" : "#4A5568"}
                />
                <YAxis
                  type="number"
                  dataKey="price"
                  stroke={darkMode ? "#CBD5E0" : "#4A5568"}
                />
                <Tooltip />
                <Legend />
                <Scatter name="Market Prices" data={filteredData}>
                  {filteredData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        [
                          "#8884d8",
                          "#83a6ed",
                          "#8dd1e1",
                          "#82ca9d",
                          "#a4de6c",
                          "#d0ed57",
                          "#ffc658",
                          "#ff7300",
                          "#e74c3c",
                          "#3498db",
                          "#2ecc71",
                          "#f39c12",
                          "#9b59b6",
                          "#1abc9c",
                        ][index % 14]
                      }
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <button
              onClick={() => handleExportChart("scatterChart")}
              className={`mt-4 w-full px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition`}
            >
              Export as Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVisualization;
