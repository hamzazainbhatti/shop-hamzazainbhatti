import { NavLink } from "react-router";
import { twMerge } from "cn";

export default function Button({ to, flavour, children, className, ...props }) {
  const flavours = {
    iconButton: "flex size-9 items-center justify-center",
    outlinedButton:
      "flex h-9 items-center justify-center rounded-full border-3 border-current/50 px-4", // TODO: Set width height auto wile not breaking Contact Us
    underlinedButton:
      "flex h-9 items-center justify-center hover:underline hover:underline-offset-4 hover:decoration-[1.5px] hover:text-header-foreground-supporting",
    ctaButton:
      "text-center bg-primary outline-primary-foreground text-primary-foreground border-2 rounded-4xl border-primary-foreground hover:bg-primary-foreground hover:text-primary",
  };
  const combinedStyles = twMerge(
    "cursor-pointer",
    flavours[flavour],
    className,
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
