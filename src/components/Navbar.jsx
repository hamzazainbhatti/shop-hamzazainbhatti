import { useState, useEffect } from "react";
import { Search, User, Handbag, Heart, ArrowRight } from "lucide-react";
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
      <nav className="flex h-9 w-90 shrink-0 items-center justify-between pl-6">
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
      <nav className="flex h-9 w-120 shrink-0 items-center justify-between pl-6">
        <Button flavour="iconButton" className="shrink-0">
          <Search size={24} />
        </Button>
        <Button flavour="iconButton" className="shrink-0">
          <Handbag size={24} />
        </Button>
        <Button flavour="iconButton" className="shrink-0">
          <Heart
            size={24}
            className="hover:text-[#ff4444] hover:fill-current"
          />
        </Button>
        <Button flavour="iconButton" className="shrink-0">
          <User size={24} />
        </Button>
        <Button
          flavour="outlinedButton"
          to="/about"
          className="relative justify-start w-48 shrink-0 group transition-[width,color,background] duration-300 ease-out hover:w-72 hover:bg-background/80 hover:text-foreground/80"
        >
          <p className="transition-transform duration-150 ease-out group-hover:translate-x-[90%]">
            CONTACT US
          </p>
          <ArrowRight
            size={24}
            className="absolute right-2 transition-transform duration-150 ease-out group-hover:-rotate-45"
          />
        </Button>
      </nav>
    </header>
  );
}
