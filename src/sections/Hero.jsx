import { useState } from "react";

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

  const handleBackgroundTransitionEnd = (event) => {
    if (event.propertyName === "scale") {
      setContentVisible(true);
    }
  };

  return (
    <div className="dark relative h-dvh overflow-hidden">
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
        onTransitionEnd={handleBackgroundTransitionEnd}
        className={`absolute inset-0 size-full object-cover transition-[object-position,filter,scale] duration-1000 ease-in-out delay-500 ${
          backgroundReady
            ? "visible object-center blur-0 scale-100"
            : "invisible object-[center_bottom] blur-[10px] scale-[1.2]"
        }`}
      />
      {children(contentVisible, animateBlurText)}
    </div>
  );
}
// TODO: SCROLLER + <Company Name> • est. MMXXVI • Islamabad
