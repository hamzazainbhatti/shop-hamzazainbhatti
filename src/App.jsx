import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet, ScrollRestoration } from "react-router";
import Sidebar from "./components/Sidebar/Sidebar";
import { CartProvider } from "./context/CartContext";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  return (
    <CartProvider>
      <Navbar
        setIsSidebarOpen={setIsSidebarOpen}
        setNavMenuOpen={setNavMenuOpen}
      />
      <Outlet />
      <ScrollRestoration />
      <Footer />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        navMenuOpen={navMenuOpen}
        setNavMenuOpen={setNavMenuOpen}
      />
    </CartProvider>
  );
}
