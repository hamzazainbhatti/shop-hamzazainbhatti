import { ArrowUpRight } from "lucide-react";
import Button from "./ui/Button";
import NavMenu from "./NavMenu";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  navMenuOpen,
  setNavMenuOpen,
}) {
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
              <Button
                flavour="icon"
                size="lg"
                icon="close"
                iconClassName="size-[50px] place-self-end"
                aria-label="Close menu"
                className="size-[50px]"
                onClick={() => {
                  setIsSidebarOpen(false);
                  setNavMenuOpen(false);
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
