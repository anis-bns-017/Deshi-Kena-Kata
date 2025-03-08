// src/routes.js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
const backendDomain = "http://localhost:5000";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "add-product", element: <AddProduct /> },
      {
        path: "see-product",
        element: <AllProducts />,
      },
    ],
  },
]);

export default Router;
