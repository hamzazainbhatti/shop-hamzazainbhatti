import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet, ScrollRestoration } from "react-router";

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
      <Footer />
    </>
  );
}
