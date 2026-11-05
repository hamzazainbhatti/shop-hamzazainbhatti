export default function ActionMenu({
  actionMenuOpened,
  setActionMenuOpened,
  actionHovered,
  setActionHovered,
}) {
  return actionMenuOpened ? (
    <div
      className={`absolute z-11 top-0 right-0 w-[530px] mx-[48px] bg-[#00000000] border-none transition-transform duration-75 ease-in-out ${actionMenuOpened ? "h-21" : "h-0"}`}
      onMouseLeave={() => {
        setActionMenuOpened(false);
        setActionHovered(null);
      }}
    >
      <div className="absolute z-11 top-18 right-0 p-[22px] w-full bg-card/80 text-card-foreground backdrop-blur-md border-none rounded-2xl">
        {actionHovered === "search" ? "Search" : null}
        {actionHovered === "bag" ? "bag" : null}
        {actionHovered === "heart" ? "heart" : null}
        {actionHovered === "user" ? "user" : null}
      </div>
    </div>
  ) : null;
}
