import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterPage from "./Components/RegisterPage.jsx";
import Category from "./Components/SelectCategoryPage/Category.jsx";
import Homepage from "./Components/Homepage/Homepage.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPage />,
  },
  {
    path: "Category",
    element: <Category />,
  },
  {
    path: "Homepage",
    element: <Homepage />,
  },
  // children: [
  //   {
  //     path: "/Select",
  //     element: <SelectPage />,
  //   },
  // ],
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
