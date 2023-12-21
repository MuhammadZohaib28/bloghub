import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import UserAuth from "./pages/UserAuth.jsx";
import Editor from "./pages/Editor.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/editor" element={<Editor />} />
      <Route path="/" element={<Layout />}>
        <Route path="signin" element={<UserAuth type="Sign-In" />} />
        <Route path="signup" element={<UserAuth type="Sign Up" />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
