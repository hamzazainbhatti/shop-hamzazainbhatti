import { NavLink } from "react-router";
import { twMerge } from "cn";

export default function Button({ to, flavour, children, className, ...props }) {
  const flavours = {
    iconButton: "flex size-9 items-center justify-center",
    outlinedButton:
      "flex h-9 items-center justify-center rounded-full border-2 border-current px-4",
    underlinedButton:
      "flex h-9 items-center justify-center hover:underline hover:underline-offset-4 hover:decoration-[1.5px] hover:text-header-foreground-supporting",
  };
  const combinedStyles = twMerge(
    "cursor-pointer",
    className,
    flavours[flavour],
  );

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          twMerge(
            combinedStyles,
            isActive ? "text-header-foreground-supporting" : "",
          )
        }
        {...props}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
