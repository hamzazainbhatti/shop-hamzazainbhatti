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
    <>
      <header
        className={`fixed z-10 flex w-dvw items-center justify-between px-15 py-6  font-sans text-sm font-medium transition-colors duration-300 ease-linear ${
          scrolled
            ? "bg-header text-[#100f0f] backdrop-blur-md"
            : "bg-transparent text-header"
        }`}
      >
        <nav>
          <ul className="flex gap-6 h-6">
            <Button flavour="linkButton" href="/">
              NEW ARRIVAL
            </Button>
            <Button flavour="linkButton" href="/">
              MEN
            </Button>
            <Button flavour="linkButton" href="/">
              WOMEN
            </Button>
            <Button flavour="linkButton" href="/shop">
              SHOP
            </Button>
          </ul>
        </nav>
        <nav>
          <ul className="flex gap-6">
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
            <Button flavour="outlinedButton" href="/">
              CONTACT US
            </Button>
          </ul>
        </nav>
      </header>
    </>
  );
}
