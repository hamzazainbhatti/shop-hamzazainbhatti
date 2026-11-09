import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import Button from "../ui/Button";
import NavPanel from "./NavPanel";
import CartPanel from "./CartPanel";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  navPanelOpen,
  setNavPanelOpen,
  cartPanelOpen,
  setCartPanelOpen,
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

  return (
    <>
      {isSidebarOpen ? (
        <div
          className={`fixed flex flex-row z-1000 inset-0 w-screen max-w-full backdrop-blur-2xl ${navPanelOpen ? "justify-start" : null} ${cartPanelOpen ? "justify-end" : null}`}
        >
          <div
            className={`flex flex-col w-full  h-screen text-foreground font-light bg-background`}
          >
            <div
              className={`flex flex-row p-5 ${navPanelOpen ? "justify-end" : null} ${cartPanelOpen ? "justify-start" : null} `}
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
                  navPanelOpen ? setNavPanelOpen(false) : null;
                  cartPanelOpen ? setCartPanelOpen(false) : null;
                }}
              />
            </div>
            <div className="flex flex-col gap-50 overflow-y-scroll scrollbar-none">
              {navPanelOpen ? (
                <NavPanel
                  closeSidebar={() => {
                    setNavPanelOpen(false);
                    setIsSidebarOpen(false);
                  }}
                />
              ) : null}
              {cartPanelOpen ? (
                <CartPanel
                  closeSidebar={() => {
                    setCartPanelOpen(false);
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
                    key={socialLink.name + "Link"}
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
