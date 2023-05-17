import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Carte from "./pages/Carte";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/carte" element={<Carte />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/map/:latitude/:longitude" element={<MapPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
