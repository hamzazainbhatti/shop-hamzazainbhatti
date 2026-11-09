import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet, ScrollRestoration } from "react-router";
import Sidebar from "./components/Sidebar/Sidebar";
import { CartProvider } from "./context/CartContext";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [cartPanelOpen, setCartPanelOpen] = useState(false);
  return (
    <CartProvider>
      <Navbar
        setIsSidebarOpen={setIsSidebarOpen}
        setNavPanelOpen={setNavPanelOpen}
        setCartPanelOpen={setCartPanelOpen}
      />
      <Outlet />
      <ScrollRestoration />
      <Footer />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        navPanelOpen={navPanelOpen}
        setNavPanelOpen={setNavPanelOpen}
        cartPanelOpen={cartPanelOpen}
        setCartPanelOpen={setCartPanelOpen}
      />
    </CartProvider>
  );
}
