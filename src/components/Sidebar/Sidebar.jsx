import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import Button from "../ui/Button";
import NavMenu from "./NavMenu";
import CartMenu from "./CartMenu";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  navMenuOpen,
  setNavMenuOpen,
  cartMenuOpen = true,
  setCartMenuOpen,
  cartIDsAndAmounts = [
    { teeID: "black", amount: 1 },
    { teeID: "dark-gray", amount: 1 },
    { teeID: "maroon", amount: 1 },
    { teeID: "dark-ash", amount: 1 },
    { teeID: "white", amount: 1 },
    { teeID: "olive", amount: 1 },
    { teeID: "mint", amount: 1 },
  ],
}) {
  useEffect(() => {
    isSidebarOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isSidebarOpen]);

  const socialLinks = [
    { name: "Instagram", href: "/" },
    { name: "Facebook", href: "/" },
    { name: "Twitter", href: "/" },
  ];

  isSidebarOpen = true; // Testing

  return (
    <>
      {isSidebarOpen ? (
        <div
          className={`fixed flex flex-row z-1000 inset-0 w-screen max-w-full backdrop-blur-2xl ${navMenuOpen ? "justify-start" : null} ${cartMenuOpen ? "justify-end" : null}`}
        >
          <div
            className={`flex flex-col ${navMenuOpen ? "w-full md:w-[80%]" : null} ${cartMenuOpen ? "w-full md:w-[40%]" : null} h-screen text-foreground font-light bg-background`}
          >
            <div
              className={`flex flex-row p-5 ${navMenuOpen ? "justify-end" : null} ${cartMenuOpen ? "justify-start" : null} `}
            >
              <Button
                flavour="icon"
                size="lg"
                icon="close"
                iconClassName="size-[50px]"
                aria-label="Close menu"
                className="size-[50px]"
                onClick={() => {
                  setIsSidebarOpen(false);
                  navMenuOpen ? setNavMenuOpen(false) : null;
                  cartMenuOpen ? setCartMenuOpen(false) : null;
                }}
              />
            </div>
            <div className="flex flex-col gap-50 overflow-y-scroll scrollbar-none">
              {navMenuOpen ? (
                <NavMenu
                  closeSidebar={() => {
                    setNavMenuOpen(false);
                    setIsSidebarOpen(false);
                  }}
                />
              ) : null}
              {cartMenuOpen ? (
                <CartMenu
                  cartIDsAndAmounts={cartIDsAndAmounts}
                  closeSidebar={() => {
                    setCartMenuOpen(false);
                    setIsSidebarOpen(false);
                  }}
                />
              ) : null}
              <div className="p-5">
                <h1 className="mb-5 font-medium text-2xl text-foreground/50">
                  SOCIALS
                </h1>
                {socialLinks.map((socialLink) => (
                  <a
                    href={`${socialLink.href}`}
                    className="flex items-center gap-2 font-medium text-2xl"
                  >
                    <ArrowUpRight size={24} />
                    {socialLink.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
