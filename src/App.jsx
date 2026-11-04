import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet, ScrollRestoration } from "react-router";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  useEffect(() => {
    isSidebarOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isSidebarOpen]);
  return (
    <>
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
    </>
  );
}
