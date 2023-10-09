import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterPage from "./Components/RegisterPage.jsx";
import SelectPage from "./Components/SelectPage.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPage />,
  },
  {
    path: "select",
    element: <SelectPage />,
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
