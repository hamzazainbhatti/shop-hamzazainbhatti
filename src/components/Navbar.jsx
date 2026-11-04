import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search, User, Handbag, Heart, ArrowRight, Menu } from "lucide-react";
import Button from "./ui/Button";

export default function Navbar({ setIsSidebarOpen, setNavMenuOpen }) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-10 flex w-full items-center justify-between gap-[clamp(0.25rem,1.2vw,1rem)] bg-header px-[clamp(1rem,4vw,3rem)] py-[clamp(0.75rem,2vw,1.5rem)] font-sans text-[clamp(0.6875rem,0.9vw,0.875rem)] font-medium text-header-foreground transition-colors duration-300 ease-linear ${
        scrolled ? "dark backdrop-blur-md" : ""
      }`}
    >
      <Button
        flavour="iconButton"
        onClick={() => {
          setNavMenuOpen(true);
          setIsSidebarOpen(true);
        }}
        className="size-[clamp(2rem,3.3vw,2.5rem)] shrink-0 lg:hidden"
      >
        <Menu className="size-[clamp(1rem,1.6vw,1.25rem)]" />
      </Button>

      <nav className="hidden h-9 w-[min(22.5rem,42vw)] shrink items-center justify-between gap-2 lg:flex">
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
      <nav className="contents lg:ml-auto lg:flex lg:h-9 lg:min-w-0 lg:w-[min(32rem,45vw)] lg:max-w-[32rem] lg:justify-between">
        <Button
          flavour="iconButton"
          aria-label="Search"
          className="size-[clamp(2rem,3.3vw,2.5rem)] shrink-0"
        >
          <Search className="size-[clamp(1rem,1.6vw,1.25rem)]" />
        </Button>
        <Button
          flavour="iconButton"
          aria-label="Shopping bag"
          className="size-[clamp(2rem,3.3vw,2.5rem)] shrink-0"
        >
          <Handbag className="size-[clamp(1rem,1.6vw,1.25rem)]" />
        </Button>
        <Button
          flavour="iconButton"
          aria-label="Favorites"
          className="size-[clamp(2rem,3.3vw,2.5rem)] shrink-0"
        >
          <Heart className="size-[clamp(1rem,1.6vw,1.25rem)] hover:text-[#ff4444] hover:fill-current" />
        </Button>
        <Button
          flavour="iconButton"
          aria-label="Account"
          className="size-[clamp(2rem,3.3vw,2.5rem)] shrink-0"
        >
          <User className="size-[clamp(1rem,1.6vw,1.25rem)]" />
        </Button>
        <Button
          flavour="outlinedButton"
          onClick={() => navigate("/#contact")}
          className="group relative hidden lg:flex w-[clamp(8rem,15vw,12rem)] shrink-0 justify-start px-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.625rem,0.85vw,0.8125rem)] transition-[width,color,background] duration-350 ease-out delay-75 hover:w-[clamp(12rem,23vw,18rem)] hover:bg-background/80 hover:text-foreground/80"
        >
          <p className="transition-transform duration-330 group-hover:translate-x-[100%]">
            CONTACT US
          </p>
          <ArrowRight className="absolute right-[clamp(0.5rem,1vw,0.75rem)] size-[clamp(0.875rem,1.4vw,1.125rem)] transition-transform duration-150 ease-out group-hover:-rotate-45" />
        </Button>
      </nav>
    </header>
  );
}
