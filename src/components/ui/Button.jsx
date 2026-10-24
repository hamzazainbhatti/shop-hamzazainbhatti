export default function Button({ href, flavour, children, ...props }) {
  const flavours = {
    iconButton:
      "grid size-6 place-items-center relative after:content-['.'] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[-0.5em] after:text-2xl",
    linkButton: "flex h-6 items-center",
    outlinedButton:
      "flex h-6 items-center rounded-full border border-[2px] border-current px-4 py-4",
    underlinedButton:
      "flex h-6 items-center underline underline-offset-4 decoration-[1.5px] decoration-[-header] hover:underline-offset-[5.5px] hover:text-header-foreground-supporting",
  };
  return (
    <li>
      <button
        className={`${flavours[flavour]} ${href ? "cursor-pointer" : ""}`}
        {...props}
      >
        {children}
      </button>
    </li>
  );
}
