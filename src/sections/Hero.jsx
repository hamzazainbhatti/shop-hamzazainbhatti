import { useState } from "react";
import "./Hero.css";

// Shared classes: blurred + transparent -> sharp + opaque
const animateBlurText = (visible) =>
  `transition duration-1000 ease-out delay-500 ${
    visible ? "opacity-100 blur-0" : "opacity-0 blur-md"
  }`;

export default function Hero({ children, backgroundImage }) {
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const handleBackgroundLoad = async (event) => {
    try {
      await event.currentTarget.decode();
      setBackgroundReady(true);
    } catch (error) {
      console.error("Failed to decode the hero background image.", error);
    }
  };

  const handleBackgroundAnimationEnd = (event) => {
    if (event.animationName === "hero-background-pan") {
      setContentVisible(true);
    }
  };

  return (
    <div className="dark hero-background h-dvh">
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        onLoad={handleBackgroundLoad}
        onError={(event) =>
          console.error(
            "Failed to load the hero background image.",
            event.currentTarget.src,
          )
        }
        onAnimationEnd={handleBackgroundAnimationEnd}
        className={`hero-background__image ${
          backgroundReady ? "hero-background__image--ready" : ""
        }`}
      />
      {children(contentVisible, animateBlurText)}
    </div>
  );
}
// TODO: SCROLLER + <Company Name> • est. MMXXVI • Islamabad
