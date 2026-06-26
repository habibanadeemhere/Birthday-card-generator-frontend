import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreatePage from "./pages/CreatePage";
import GalleryPage from "./pages/GalleryPage";
import SharedCardPage from "./pages/SharedCardPage";

export default function App() {
  return (
    <>
      <div className="bg-glow" />
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<CreatePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/card/:id" element={<SharedCardPage />} />
        </Routes>
        <footer className="site-footer">Made with WishCard — your own birthday card generator.</footer>
      </div>
    </>
  );
}
