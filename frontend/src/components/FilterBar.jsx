// src/components/FilterBar.js
import React from "react";

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

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedMarket,
  setSelectedMarket,
}) => {
  return (
    <div className="mb-6 flex gap-4 flex-wrap">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filter by Category */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Categories</option>
        <option value="Category X">Category X</option>
        <option value="Category Y">Category Y</option>
      </select>

      {/* Filter by Market */}
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
    </div>
  );
};

export default FilterBar;
