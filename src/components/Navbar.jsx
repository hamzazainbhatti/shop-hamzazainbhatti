import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Button from "./ui/Button";
import ActionMenu from "@/components/ActionsMenu/ActionsMenuCard";
import { useCart } from "@/context/CartContext";

export default function Navbar({
  setIsSidebarOpen,
  setNavPanelOpen,
  setCartPanelOpen,
}) {
  const { cart } = useCart();
  const currentPage = useLocation().pathname;
  const isLightPage =
    currentPage === "/men" || currentPage.startsWith("/shirt/");
  const bgContrast = isLightPage ? "light" : "dark";
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0);
  const [actionMenuOpened, setActionMenuOpened] = useState(false);
  const [actionHovered, setActionHovered] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);

  const closeActionMenu = () => {
    setActionMenuOpened(false);
    setActionHovered(null);
  };

  const [previousCartLength, setPreviousCartLength] = useState(cart.length);

  useEffect(() => {
    if (cart.length > previousCartLength) {
      setIsBlinking(true);

      const timer = setTimeout(() => {
        setIsBlinking(false);
      }, 270);

      return () => clearTimeout(timer);
    }

    setPreviousCartLength(cart.length);
  }, [cart.length, previousCartLength]);

  useEffect(() => {
    let frameId = null;
    const updateScrolled = () => {
      frameId = null;
      const trigger = document.querySelector("[data-navbar-scroll-trigger]");
      const runwayHeight = trigger?.getBoundingClientRect().height || 0;

      setScrolled(
        trigger
          ? trigger.dataset.navbarTriggerReady === "true" &&
              (runwayHeight <= window.innerHeight
                ? window.scrollY > 0
                : trigger.getBoundingClientRect().bottom <= window.innerHeight)
          : window.scrollY > 0,
      );
    };
    const scheduleUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateScrolled);
      }
    };

    const trigger = document.querySelector("[data-navbar-scroll-trigger]");
    const triggerObserver = trigger
      ? new MutationObserver(scheduleUpdate)
      : null;
    triggerObserver?.observe(trigger, {
      attributes: true,
      attributeFilter: ["data-navbar-trigger-ready"],
    });

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      triggerObserver?.disconnect();
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [currentPage.pathname]);

  return (
    <div className="h-0 sticky inset-x-0 top-0 z-40 overflow-visible">
      <header
        className={`flex items-center justify-between gap-[clamp(0.25rem,1.2vw,1rem)] bg-header px-[clamp(1rem,4vw,3rem)] py-[clamp(0.75rem,2vw,1.5rem)] font-sans text-[clamp(0.6875rem,0.9vw,0.875rem)] font-medium ${bgContrast === "light" ? "text-[#545454] backdrop-blur-md" : "text-header-foreground"} transition-colors duration-300 ease-linear ${
          scrolled ? "dark backdrop-blur-md" : ""
        } ${isLightPage && !scrolled ? "!backdrop-blur-none" : ""}`}
      >
        <Button
          flavour="icon"
          icon="menu"
          iconClassName="size-[clamp(1rem,1.6vw,1.25rem)]"
          aria-label="Open menu"
          onClick={() => {
            setNavPanelOpen(true);
            setIsSidebarOpen(true);
          }}
          className="size-[clamp(2rem,3.3vw,2.5rem)] shrink-0 lg:hidden"
        />

        <nav className="hidden h-9 w-[min(22.5rem,42vw)] shrink items-center justify-between gap-2 lg:flex">
          <Button
            flavour="nav"
            to="/new-arrivals"
            className="text-[clamp(0.6875rem,0.9vw,0.875rem)]"
          >
            NEW ARRIVAL
          </Button>
          <Button
            flavour="nav"
            to="/men"
            className="text-[clamp(0.6875rem,0.9vw,0.875rem)]"
          >
            MEN
          </Button>
          <Button
            flavour="nav"
            to="/women"
            className="text-[clamp(0.6875rem,0.9vw,0.875rem)]"
          >
            WOMEN
          </Button>
          <Button
            flavour="nav"
            to="/shirts"
            className="text-[clamp(0.6875rem,0.9vw,0.875rem)]"
          >
            SHIRTS
          </Button>
        </nav>
        <nav className="contents lg:ml-auto lg:flex lg:h-9 lg:min-w-0 lg:w-[min(32rem,45vw)] lg:max-w-[32rem] lg:justify-between">
          <Button
            flavour="icon"
            icon="search"
            iconClassName="size-[clamp(1rem,1.6vw,1.25rem)]"
            aria-label="Search"
            className="size-[clamp(2rem,3.3vw,2.5rem)] shrink-0 z-12"
            onMouseEnter={() => {
              setActionMenuOpened(true);
              setActionHovered("search");
            }}
          />
          <div className="relative size-[clamp(2rem,3.3vw,2.5rem)] shrink-0 z-12">
            {cart.length > 0 ? (
              <div className="flex flex-col absolute w-4 h-4 top-[2px] right-[2px] rounded-4xl text-[12px] bg-[#ffbb99aa] text-center justify-center">
                <p>{cart.length}</p>
              </div>
            ) : null}
            <Button
              flavour="icon"
              icon="bag"
              iconClassName={`size-[clamp(1rem,1.6vw,1.25rem)] transition-transform ease-in-out duration-270 ${
                isBlinking ? "!stroke-[2.4]" : ""
              }`}
              aria-label="Shopping bag"
              className={`size-full transition-all ease-in-out duration-270 ${
                isBlinking ? "!text-[#ffbb99] scale-[1.2]" : ""
              }`}
              onMouseEnter={() => {
                setActionMenuOpened(true);
                setActionHovered("cart");
              }}
              onClick={() => {
                setCartPanelOpen(true);
                setIsSidebarOpen(true);
                closeActionMenu();
              }}
            />
          </div>
          <Button
            flavour="icon"
            icon="heart"
            iconClassName="size-[clamp(1rem,1.6vw,1.25rem)] hover:text-[#ff4444] hover:fill-current"
            aria-label="Favorites"
            className="size-[clamp(2rem,3.3vw,2.5rem)] shrink-0 z-12"
            onMouseEnter={() => {
              setActionMenuOpened(true);
              setActionHovered("favorites");
            }}
          />
          <Button
            flavour="icon"
            icon="user"
            iconClassName="size-[clamp(1rem,1.6vw,1.25rem)]"
            aria-label="Account"
            className="size-[clamp(2rem,3.3vw,2.5rem)] shrink-0 z-12"
            onMouseEnter={() => {
              setActionMenuOpened(true);
              setActionHovered("user");
            }}
          />
          <Button
            flavour="outline"
            icon="arrowRight"
            to="/#contact"
            iconClassName="absolute right-[clamp(0.5rem,1vw,0.75rem)] size-[clamp(0.875rem,1.4vw,1.125rem)] transition-transform duration-150 ease-out group-hover:-rotate-45"
            iconPosition="end"
            labelAlign="start"
            labelClassName="transition-transform duration-330 group-hover:translate-x-[100%]"
            className={`group relative hidden lg:flex w-[clamp(8rem,15vw,12rem)] shrink-0 justify-start px-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.625rem,0.85vw,0.8125rem)] border-current/50 transition-[width,color,background] duration-350 ease-out hover:w-[clamp(12rem,23vw,18rem)] hover:bg-background/80 hover:text-foreground/80 ${bgContrast === "light" ? "dark" : null} z-12`}
          >
            CONTACT US
          </Button>
        </nav>
        <ActionMenu
          actionMenuOpened={actionMenuOpened}
          setActionMenuOpened={setActionMenuOpened}
          actionHovered={actionHovered}
          setActionHovered={setActionHovered}
          closeActionMenu={closeActionMenu}
          setCartPanelOpen={setCartPanelOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </header>
    </div>
  );
}
