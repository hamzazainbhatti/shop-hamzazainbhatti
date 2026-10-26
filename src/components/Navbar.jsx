import { useState, useEffect } from "react";
import { Search, User, Handbag, Heart } from "lucide-react";
import Button from "./ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-10 flex w-dvw items-center justify-between px-12 py-6 font-sans text-sm font-medium transition-colors duration-300 ease-linear bg-header text-header-foreground ${
        scrolled ? "dark backdrop-blur-md" : ""
      }`}
    >
      <nav className="flex h-9 items-center gap-6">
        <Button flavour="underlinedButton" to="/new-arrivals">
          NEW ARRIVAL
        </Button>
        <Button flavour="underlinedButton" to="/men">
          MEN
        </Button>
        <Button flavour="underlinedButton" to="/women">
          WOMEN
        </Button>
        <Button flavour="underlinedButton" to="/shop">
          SHOP
        </Button>
      </nav>
      <nav className="flex items-center gap-6">
        <Button flavour="iconButton">
          <Search size={24} />
        </Button>
        <Button flavour="iconButton">
          <Handbag size={24} />
        </Button>
        <Button flavour="iconButton">
          <Heart size={24} />
        </Button>
        <Button flavour="iconButton">
          <User size={24} />
        </Button>
        <Button flavour="outlinedButton" to="/about">
          CONTACT US
        </Button>
      </nav>
    </header>
  );
}
