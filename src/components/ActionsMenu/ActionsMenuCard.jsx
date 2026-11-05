import CartMenu from "./CartMenu";
import SearchMenu from "./SearchMenu";
import UserMenu from "./UserMenu";
import FavoritesMenu from "./FavoritesMenu";

export default function ActionsMenu({
  actionMenuOpened,
  setActionMenuOpened,
  actionHovered,
  setActionHovered,
}) {
  return actionMenuOpened ? (
    <div
      className={`absolute z-11 top-0 right-0 w-[calc(100vw-150px)] lg:w-[550px] mr-[22px] bg-[#00000000] border-none transition-all duration-1000 ease-in-out ${actionMenuOpened ? "h-21" : "h-0"}`}
      onMouseLeave={() => {
        setActionMenuOpened(false);
        setActionHovered(null);
      }} // TODO: Fix ActionMenu width on smaller screens
    >
      <div className="absolute z-11 top-18 right-0 p-[10px] w-full bg-card/80 text-card-foreground backdrop-blur-md border-none rounded-2xl">
        {actionHovered === "search" ? <SearchMenu /> : null}
        {actionHovered === "cart" ? <CartMenu /> : null}
        {actionHovered === "favorites" ? <FavoritesMenu /> : null}
        {actionHovered === "user" ? <UserMenu /> : null}
      </div>
    </div>
  ) : null;
}
