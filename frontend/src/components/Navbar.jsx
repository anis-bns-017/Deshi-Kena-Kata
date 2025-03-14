import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link to="/" className="text-xl font-bold hover:text-yellow-300">
          Fruit & Veggie Market
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link
            to="/"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/add-product"
            className="hover:text-pink-300 transition-colors duration-300"
          >
            Add Product
          </Link>
          <Link
            to="/see-product"
            className="hover:text-blue-300 text-xl font-semibold transition-colors duration-300"
          >
            Data Analysis
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;