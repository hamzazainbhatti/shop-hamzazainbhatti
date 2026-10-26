import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";

// Shared classes: blurred + transparent -> sharp + opaque
const animateBlurText = (visible) =>
  `transition duration-1000 ease-out delay-500${
    visible ? "opacity-100 blur-0" : "opacity-0 blur-md"
  }`;

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [textAnimationCompleted, setTextAnimationCompleted] = useState(false);
  useEffect(() => {
    setInterval(() => setVisible(true), 1000);
    setInterval(() => setTextAnimationCompleted(true), 1200);
  }, []);
  return (
    <div className="dark hero-background h-dvh">
      <h1
        className={`font-serif text-foreground absolute bottom-9 right-9 text-7xl w-2xl text-right ${animateBlurText(visible)}`}
      >
        Experiance the <br />
        comfort of Minimal <br />
        and Soft Textures.
      </h1>
      <Button
        flavour="ctaButton"
        to="/shop"
        className={`w-60 py-2 text-2xl font-medium outline-2 absolute bottom-65 right-9 transition-transform duration-300 ease-in-out ${textAnimationCompleted ? "" : "translate-x-70"}`}
      >
        EXPLORE
      </Button>
    </div>
  );
}
// TODO: SCROLLER + <Company Name> • est. MMXXVI • Islamabad
