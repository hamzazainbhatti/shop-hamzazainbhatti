/*
  Usage:
    <Button>Explore</Button>
    <Button flavour="outline" icon="plus" labelAlign="start">Add to Cart</Button>
    <Button to="/shop">Shop</Button>
    <Button href="https://example.com">Visit site</Button>
    <Button flavour="icon" icon="search" aria-label="Search" />

  Props:
    - to: internal route; renders a React Router NavLink.
    - href: link destination; renders an anchor when "to" is not provided.
    - type: native button type ("button" by default; use "submit" for forms).
    - flavour: visual treatment: solid, outline, nav, link, or icon.
    - size: sm, md, or lg; its classes depend on the selected flavour.
    - weight: named font weight; also tunes border, underline, and icon strokes.
    - icon: icon name from the icons map; icons are rendered inside Button.
    - iconPosition: "start" or "end" relative to the label.
    - iconClassName: extra classes for the icon.
    - labelAlign: "start", "center", or "end" alignment for the contents.
    - labelClassName: extra classes for the label span.
    - children: visible label content; omit for icon-only buttons.
    - className: extra button/link classes, including layout and color overrides.
    - style: inline styles. (TODO: Test if these override Tailwind classes and classnames.)
    - remaining props (such as onClick and aria-label)
      are forwarded to the rendered element.
*/

// Imports: supported icons, router link, and Tailwind-aware class merging.
import {
  ArrowRight,
  Handbag,
  Heart,
  Menu,
  Plus,
  Search,
  User,
  X,
} from "lucide-react";
import { NavLink } from "react-router";
import { twMerge } from "cn";

// Icon names exposed to callers and the Lucide components they render.
const icons = {
  arrowRight: ArrowRight,
  bag: Handbag,
  close: X,
  heart: Heart,
  menu: Menu,
  plus: Plus,
  search: Search,
  user: User,
};

// Visual treatments shared by each button flavour.
const flavours = {
  solid:
    "inline-flex items-center gap-[0.5em] rounded-full border-background bg-foreground text-background hover:border-foreground hover:bg-background hover:text-foreground",
  outline:
    "inline-flex items-center gap-[0.5em] rounded-full border-current text-current",
  nav: "inline-flex items-center gap-[0.5em] hover:underline underline-offset-4",
  link: "inline-flex items-center gap-[0.5em] underline underline-offset-4",
  icon: "inline-flex items-center justify-center rounded-full hover:bg-foreground/5",
};

// Size presets: each flavour uses the matching type of dimensions.
const sizes = {
  sm: {
    button: "min-h-8 px-3 py-1.5 text-sm",
    control: "h-8 px-3 text-sm",
    nav: "h-8 text-sm",
    link: "text-sm",
    icon: "size-8 text-sm",
  },
  md: {
    button: "min-h-9 px-4 py-2 text-base",
    control: "h-9 px-4 text-base",
    nav: "h-9 text-base",
    link: "text-base",
    icon: "size-9 text-base",
  },
  lg: {
    button: "min-h-11 px-5 py-2.5 text-lg",
    control: "h-11 px-5 text-lg",
    nav: "h-11 text-lg",
    link: "text-lg",
    icon: "size-11 text-lg",
  },
};

// Font weight and matching border, underline, and icon-stroke calibration.
const weights = {
  thin: {
    className: "font-thin",
    borderStrokeClassName: "border-[0.1248em]",
    decorationStrokeClassName: "decoration-[0.078em]",
    strokeScale: 0.78,
  },
  extralight: {
    className: "font-extralight",
    borderStrokeClassName: "border-[0.1344em]",
    decorationStrokeClassName: "decoration-[0.084em]",
    strokeScale: 0.84,
  },
  light: {
    className: "font-light",
    borderStrokeClassName: "border-[0.144em]",
    decorationStrokeClassName: "decoration-[0.09em]",
    strokeScale: 0.9,
  },
  normal: {
    className: "font-normal",
    borderStrokeClassName: "border-[0.1536em]",
    decorationStrokeClassName: "decoration-[0.096em]",
    strokeScale: 0.96,
  },
  medium: {
    className: "font-medium",
    borderStrokeClassName: "border-[0.16em]",
    decorationStrokeClassName: "decoration-[0.1em]",
    strokeScale: 1,
  },
  semibold: {
    className: "font-semibold",
    borderStrokeClassName: "border-[0.1728em]",
    decorationStrokeClassName: "decoration-[0.108em]",
    strokeScale: 1.08,
  },
  bold: {
    className: "font-bold",
    borderStrokeClassName: "border-[0.1856em]",
    decorationStrokeClassName: "decoration-[0.116em]",
    strokeScale: 1.16,
  },
  extrabold: {
    className: "font-extrabold",
    borderStrokeClassName: "border-[0.1984em]",
    decorationStrokeClassName: "decoration-[0.124em]",
    strokeScale: 1.24,
  },
  black: {
    className: "font-black",
    borderStrokeClassName: "border-[0.2112em]",
    decorationStrokeClassName: "decoration-[0.132em]",
    strokeScale: 1.32,
  },
};

// Content alignment choices and allowed icon positions.
const alignments = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

const iconPositions = ["start", "end"];

// Read the API props and apply defaults before resolving styles and content.
export default function Button({
  to,
  href,
  type = "button",
  flavour = "solid",
  size = "md",
  weight = "medium",
  icon,
  iconPosition = "end",
  iconClassName,
  labelAlign = "center",
  labelClassName,
  children,
  className,
  style,
  ...props
}) {
  // Validate prop values and resolve a requested icon name.
  const hasValidFlavour = Object.hasOwn(flavours, flavour);
  const hasValidSize = Object.hasOwn(sizes, size);
  const hasValidWeight = Object.hasOwn(weights, weight);
  const hasValidAlignment = Object.hasOwn(alignments, labelAlign);
  const hasValidIcon = icon == null || Object.hasOwn(icons, icon);
  const Icon = icon && hasValidIcon ? icons[icon] : null;
  const hasValidIconPosition = iconPositions.includes(iconPosition);

  // Report invalid or incomplete usage without stopping rendering.
  if (!hasValidFlavour) {
    console.error(
      `Unknown Button flavour "${flavour}". Available flavours: ${Object.keys(flavours).join(", ")}.`,
    );
  }
  if (!hasValidSize) {
    console.error(
      `Unknown Button size "${size}". Available sizes: ${Object.keys(sizes).join(", ")}.`,
    );
  }
  if (!hasValidWeight) {
    console.error(
      `Unknown Button weight "${weight}". Available weights: ${Object.keys(weights).join(", ")}.`,
    );
  }
  if (!hasValidAlignment) {
    console.error(
      `Unknown Button label alignment "${labelAlign}". Available alignments: ${Object.keys(alignments).join(", ")}.`,
    );
  }
  if (!hasValidIconPosition) {
    console.error('Button "iconPosition" must be "start" or "end".');
  }
  if (!hasValidIcon) {
    console.error(
      `Unknown Button icon "${icon}". Available icons: ${Object.keys(icons).join(", ")}.`,
    );
  }
  if (flavour === "icon" && !Icon) {
    console.error('The "icon" flavour requires an icon name.');
  }
  if (flavour === "icon" && children != null) {
    console.error('The "icon" flavour is icon-only; use the "icon" prop.');
  }
  if (flavour === "icon" && !props["aria-label"] && !props["aria-labelledby"]) {
    console.error(
      'The "icon" flavour requires "aria-label" or "aria-labelledby".',
    );
  }

  // Fall back to safe map keys, then select the size classes for this flavour.
  const resolvedFlavour = hasValidFlavour ? flavour : "solid";
  const resolvedSize = hasValidSize ? size : "md";
  const resolvedWeight = hasValidWeight ? weight : "medium";
  const resolvedAlignment = hasValidAlignment ? labelAlign : "center";
  const strokeScale = weights[resolvedWeight].strokeScale;
  let sizeClassName = sizes[resolvedSize].button;
  if (resolvedFlavour === "icon") sizeClassName = sizes[resolvedSize].icon;
  if (resolvedFlavour === "outline")
    sizeClassName = sizes[resolvedSize].control;
  if (resolvedFlavour === "nav") sizeClassName = sizes[resolvedSize].nav;
  if (resolvedFlavour === "link") sizeClassName = sizes[resolvedSize].link;

  // Combine shared, flavour, size, weight, stroke, alignment, and caller styles.
  const buttonClassName = twMerge(
    "cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50",
    flavours[resolvedFlavour],
    sizeClassName,
    weights[resolvedWeight].className,
    resolvedFlavour === "solid" || resolvedFlavour === "outline"
      ? weights[resolvedWeight].borderStrokeClassName
      : "",
    resolvedFlavour === "nav" || resolvedFlavour === "link"
      ? weights[resolvedWeight].decorationStrokeClassName
      : "",
    alignments[resolvedAlignment],
    className,
  );

  // Build the optional icon and label, then place the icon at the requested side.
  const iconElement = Icon ? (
    <Icon
      aria-hidden="true"
      className={twMerge(
        resolvedFlavour === "icon" ? "size-[1.25em]" : "size-[1.1em] shrink-0",
        iconClassName,
      )}
      strokeWidth={2 * strokeScale}
    />
  ) : null;
  const labelElement =
    children != null ? (
      <span className={labelClassName}>{children}</span>
    ) : null;

  const content =
    iconPosition === "start" ? (
      <>
        {iconElement}
        {resolvedFlavour === "icon" ? null : labelElement}
      </>
    ) : (
      <>
        {resolvedFlavour === "icon" ? null : labelElement}
        {iconElement}
      </>
    );

  // Only navigation-flavoured links receive an active-route underline.
  const getClassName = (isActive = false) =>
    twMerge(
      buttonClassName,
      isActive && resolvedFlavour === "nav" ? "underline" : "",
    );

  // Render the semantic element matching the destination or action.
  if (to != null) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => getClassName(isActive)}
        style={style}
        {...props}
      >
        {content}
      </NavLink>
    );
  }

  if (href != null) {
    return (
      <a href={href} className={buttonClassName} style={style} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={buttonClassName} style={style} {...props}>
      {content}
    </button>
  );
}
