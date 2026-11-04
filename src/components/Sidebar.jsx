import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { NavLink } from "react-router";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  navMenuOpen,
  setNavMenuOpen,
}) {
  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "New Arrival", href: "/new-arrival" },
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Shop", href: "/shop" },
  ];
  const socialLinks = [
    { name: "Instagram", href: "/" },
    { name: "Facebook", href: "/" },
    { name: "Twitter", href: "/" },
  ];

  return (
    <>
      {isSidebarOpen ? (
        <div
          className={`fixed flex flex-row z-1000 inset-0 w-screen max-w-full backdrop-blur-2xl ${navMenuOpen ? "justify-start" : null}`}
        >
          <div className="flex flex-col w-[80%] h-screen text-foreground font-light bg-background">
            <div className="flex flex-row p-5 justify-end">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setIsSidebarOpen(false);
                  setNavMenuOpen(false);
                }}
              >
                <X size={50} className="place-self-end" />
              </button>
            </div>
            <div className="flex flex-col gap-50 overflow-y-scroll scrollbar-none">
              {navMenuOpen ? (
                <div className="flex flex-col h-screen text-8xl gap-5 divide-y-2 px-5 pt-5 divide-foreground/20 divide-solid">
                  {navigationLinks.map((navigationLink) => (
                    <NavLink
                      to={navigationLink.href}
                      className="flex flex-row justify-between items-center pb-5"
                      onClick={() => {
                        setNavMenuOpen(false);
                        setIsSidebarOpen(false);
                      }}
                    >
                      <h1 className="">{navigationLink.name}</h1>
                      <ArrowRight size={50} className="" />
                    </NavLink>
                  ))}
                </div>
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
