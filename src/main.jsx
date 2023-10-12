import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterPage from "./Components/RegisterPage.jsx";
import Category from "./Components/SelectCategoryPage/Category.jsx";
import Homepage from "./Components/Homepage/Homepage.jsx";
import { store } from "./store/store.js";
import Entertainment from "./Components/EntertainmentPage/Entertainment.jsx";

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
  {
    path: "Enterainment",
    element: <Entertainment />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
);
