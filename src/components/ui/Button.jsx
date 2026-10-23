export default function Button({ href, flavour, children, ...props }) {
  const flavours = {
    iconButton: "grid size-6 place-items-center",
    linkButton: "flex h-6 items-center",
    outlinedButton:
      "flex h-6 items-center rounded-full border border-current px-2",
  };
  return (
    <li>
      <button
        className={`${flavours[flavour]} ${href ? "cursor-pointer" : ""}`}
        {...props}
      >
        {children}
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer"></a>
        ) : null}
      </button>
    </li>
  );
}
