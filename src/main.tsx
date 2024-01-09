import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import Home from "./views/Home/Home.tsx";
import Inventory from "./views/Inventory/Inventory.tsx";
import Analysis from "./views/Analysis/Analysis.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Use the "element" prop to render components */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/inventory" element={<App />}>
          <Route index element={<Inventory />} />
        </Route>
        <Route path="/analysis/:MODEL_NAME" element={<App />}>
          <Route index element={<Analysis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
