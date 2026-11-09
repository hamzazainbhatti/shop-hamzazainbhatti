import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router";

export default function NavPanel({ closeSidebar }) {
  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "New Arrival", href: "/new-arrival" },
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Shop", href: "/shop" },
  ];
  return (
    <div className="flex flex-col h-screen text-8xl gap-5 divide-y-2 px-5 pt-5 divide-foreground/20 divide-solid">
      {navigationLinks.map((navigationLink) => (
        <NavLink
          key={navigationLink.name.toLowerCase().replace(/\s+/g, "-")}
          to={navigationLink.href}
          className="flex flex-row justify-between items-center pb-5"
          onClick={() => closeSidebar()}
        >
          <h1 className="">{navigationLink.name}</h1>
          <ArrowRight size={50} className="" />
        </NavLink>
      ))}
    </div>
  );
}
