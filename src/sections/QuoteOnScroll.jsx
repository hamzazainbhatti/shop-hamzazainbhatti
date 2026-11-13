import { cloneElement, isValidElement } from "react";

function getText(content) {
  if (typeof content === "string" || typeof content === "number") {
    return String(content);
  }

  if (Array.isArray(content)) {
    return content.map(getText).join("");
  }

  if (isValidElement(content)) {
    return getText(content.props.children);
  }

  return "";
}

function animateText(content, index) {
  if (typeof content === "string" || typeof content === "number") {
    return Array.from(String(content), (char) => {
      const currentIndex = index.value++;

      return /\s/.test(char) ? (
        char
      ) : (
        <span
          key={currentIndex}
          className="quote-letter"
          style={{ "--i": currentIndex }}
        >
          {char}
        </span>
      );
    });
  }

  if (Array.isArray(content)) {
    return content.map((child, childIndex) => {
      const animatedChild = animateText(child, index);

      return isValidElement(animatedChild)
        ? cloneElement(animatedChild, { key: animatedChild.key ?? childIndex })
        : animatedChild;
    });
  }

  if (isValidElement(content) && content.props.children != null) {
    return cloneElement(
      content,
      undefined,
      animateText(content.props.children, index),
    );
  }

  return content;
}

export default function QuoteOnScroll({
  children,
  className = "min-h-[calc(70vh)] px-[10vw] py-20 font-serif font-light leading-tight text-[2rem] flex items-center justify-center bg-secondary bg-linear-65 from-secondary to-white/2 text-center",
}) {
  const quoteLength = Array.from(getText(children)).length;
  const index = { value: 0 };
  const animatedContent = animateText(children, index);

  return (
    <blockquote
      className={`quote-scroll ${className}`}
      style={{ "--n": quoteLength }}
    >
      <div className="sr-only">{children}</div>
      <div aria-hidden="true">{animatedContent}</div>
    </blockquote>
  );
}
