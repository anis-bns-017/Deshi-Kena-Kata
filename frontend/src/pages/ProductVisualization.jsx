import { useState } from "react";
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
import data from "./data.json"; // Importing JSON data

const ProductVisualization = () => {
  const [selectedProduct, setSelectedProduct] = useState(data[0]?.name || "");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [viewMode, setViewMode] = useState("singleDate"); // 'singleDate' or 'monthly'

  // Extract unique product names
  const uniqueProducts = [...new Set(data.map((item) => item.name))];

  // Extract unique markets
  const uniqueMarkets = [
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

  // Generate all months (e.g., "January 2025", "February 2025", etc.)
  const allMonths = [];
  const startYear = 2025; // Adjust based on your data
  const endYear = 2025; // Adjust based on your data
  for (let year = startYear; year <= endYear; year++) {
    for (let month = 1; month <= 12; month++) {
      const monthName = new Date(`${year}-${month}-01`).toLocaleString(
        "default",
        { month: "long", year: "numeric" }
      );
      allMonths.push(monthName);
    }
  }

  // Convert date from `dd/mm/yyyy` to `yyyy-mm-dd`
  const convertDate = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  // Filter data based on selected product, market, and date/month
  const filteredData = data.filter((item) => {
    const [day, month, year] = item.date.split("/");
    const itemMonth = new Date(`${year}-${month}-01`).toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric",
      }
    );

    if (viewMode === "singleDate") {
      return (
        item.name === selectedProduct &&
        convertDate(item.date) === selectedDate
      );
    } else if (viewMode === "monthly") {
      return item.name === selectedProduct && item.market === selectedMarket && itemMonth === selectedMonth;
    }
    return false;
  });

  // Check if there's data for the selected month
  const hasDataForSelectedMonth = data.some((item) => {
    const [day, month, year] = item.date.split("/");
    const itemMonth = new Date(`${year}-${month}-01`).toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric",
      }
    );
    return itemMonth === selectedMonth && item.name === selectedProduct;
  });

  // Custom Tooltip for Market Info
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="text-sm font-semibold">
            Market: {payload[0].payload.market}
          </p>
          <p className="text-sm text-blue-500">Price: {payload[0].value} Tk</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Graphical View of Product Prices
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        {/* Product Filter */}
        <select
          className="border p-2"
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

        {/* View Mode Radio Buttons */}
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="viewMode"
              value="singleDate"
              checked={viewMode === "singleDate"}
              onChange={() => setViewMode("singleDate")}
            />
            Single Date
          </label>
          <label className="flex items-center gap-2">
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

        {/* Single Date Filter */}
        {viewMode === "singleDate" && (
          <>
            <input
              type="date"
              className="border p-2"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </>
        )}

        {/* Monthly Filter */}
        {viewMode === "monthly" && (
          <>
            <select
              className="border p-2"
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
            <select
              className="border p-2"
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
            {selectedMonth && !hasDataForSelectedMonth && (
              <div className="text-red-500 font-semibold">
                No data available for {selectedProduct} in {selectedMonth} in the {selectedMarket} market.
              </div>
            )}
          </>
        )}
      </div>

      {/* Show Message if No Data */}
      {filteredData.length === 0 ? (
        <div className="text-center text-red-500 font-semibold">
          No data available for {selectedProduct} in{" "}
          {viewMode === "singleDate"
            ? `on ${selectedDate}`
            : `${selectedMonth} ${selectedMarket}`}
          .
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Bar Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="market" />
                <YAxis />
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
          </div>

          {/* Line Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Line Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="market" />
                <YAxis />
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
          </div>

          {/* Area Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Area Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff7300" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="market" />
                <YAxis />
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
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Pie Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={filteredData}
                  dataKey="price"
                  nameKey="market"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
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
          </div>

          {/* Radar Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Radar Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={filteredData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="market" />
                <PolarRadiusAxis />
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
          </div>

          {/* Scatter Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Scatter Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="category" dataKey="market" />
                <YAxis type="number" dataKey="price" />
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVisualization;
