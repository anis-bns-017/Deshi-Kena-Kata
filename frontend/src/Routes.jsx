// src/routes.js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductVisualization from "./pages/ProductVisualization";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "add-product", element: <AddProduct /> },
      {
        path: "see-product",
        element: <ProductVisualization />,
      },
    ],
  },
]);

export default Router;
