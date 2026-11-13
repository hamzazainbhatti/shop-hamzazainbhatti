/**
 * -------------------------------------- GUIDE TO RENDER YOUR FIRST EVER HERO SECTION --------------------------------------
 *
 *  - To enable scrolling Hero Image, add "scrollEffect" to the attributes of the rendered Hero section:
 *    FROM: <Hero backgroundImage={"/assets/my-beautifull-hero-image.jpg"}> ... </Hero>
 *    TO:   <Hero backgroundImage={"/assets/my-beautifull-hero-image.jpg"} scrollEffect> ... </Hero>
 *                                                                         ^^^^^^^^^^^^
 *
 *  - ANYTHING that comes after Hero Section (IF "scrollEffect" is added) is wrapped in a wrapper(we will call it "everything else wrapper")
 *    with STYLES "relative z-0 bg-[something that is not transparent]".
 *      "relative z-0": This stacks "everything else" (that is in "everything else wrapper") that comes after Hero ABOVE Hero.
 *      "bg-[xxxxxxff]": This is ANY color given with FULL Opacity.
 *
 *  - Whenever you enable "scrollEffect", MUST ALSO add something like "relative z-0 (stacked above Hero)" + Opaque BG to OTHER
 *    sections' wrappers so WHATEVER that didn't get rendered into this "everything else wrapper", after Hero section, stacks
 *    above Hero Section
 *
 *  --------------- [ IMAGE SIZE CALCULATION /  CHANGE IMAGE SIZE ] IF scrollEffect is enabled in Hero Section ---------------
 *
 *  - When scrollEffect is enabled, the Hero image follows the width of its in-flow runway.
 *    Avoid viewport width units here because they can include a classic scrollbar gutter.
 *  - Now There may be some leftover Image height that goes under Screen that could be scrolled.
 *  - Image height will NOT be set automaticly. We will set it. And we will set it in a way where
 *    The ORIGIONAL ratio w:h of screen is preserved.
 *
 *
 *
 *
 */

import { useEffect, useRef, useState } from "react";

// Shared classes: blurred + transparent -> sharp + opaque
const animateBlurText = (visible) =>
  `transition duration-1000 ease-out delay-500 ${
    visible ? "opacity-100 blur-0" : "opacity-0 blur-md"
  }`;

/**
 *  Image size calculation braincells lies here. RIP.
 *
 *  We need to find Changed Height. to change the Image Height in such a way that it's Image Width stays equal to Screen Width.
 *
 *    Origional Width / Origional Height = Changed Width / Changed Height
 *    Origional Width / Origional Height = runwayWidth / Changed Height
 *    Changed Height = runwayWidth x (Origional Height / Origional Width)
 *
 *  "Changed Height" can be set as Image's Height
 *  "runwayWidth" can be set as Image's Width
 *
 *  IF IMAGE HEIGHT < WHAT SCREEN CAN PROVIDE US: Use screen Height instead.
 */
function getImageHeight(image, runwayWidth, viewportHeight) {
  return Math.max(
    (runwayWidth * image.naturalHeight) / image.naturalWidth,
    viewportHeight,
  );
}

export default function Hero({
  children,
  backgroundImage,
  scrollEffect = false,
}) {
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [runwayHeight, setRunwayHeight] = useState(0);
  const [heroWidth, setHeroWidth] = useState(
    () => document.documentElement.clientWidth,
  );
  const runwayWrapperRef = useRef(null);
  const heroWrapperRef = useRef(null);
  const imageRef = useRef(null);

  const handleBackgroundLoad = async (event) => {
    const image = event.currentTarget;
    try {
      await image.decode();

      if (scrollEffect) {
        const runwayWidth =
          runwayWrapperRef.current?.getBoundingClientRect().width ??
          document.documentElement.clientWidth;

        setHeroWidth(runwayWidth);
        setRunwayHeight(
          getImageHeight(image, runwayWidth, window.innerHeight),
        );
      }

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

  //  ----------------- UseEffect [SCROLL EFFECT] ( Will only run if scrollEffect is Activated ) -----------------
  useEffect(() => {
    if (!scrollEffect || !backgroundReady) return;

    const runwayWrapper = runwayWrapperRef.current;
    const heroWrapper = heroWrapperRef.current;
    const image = imageRef.current;

    if (!runwayWrapper || !heroWrapper || !image) return;

    let frameId = null;
    const updateScrollEffect = () => {
      frameId = null;

      /**
       *  SET the Image Width as the Runway Width.
       *  CALCULATE the Image Height based on what the Image Width was calculated as. (Preserving the Image's Aspect Ratio)
       *
       *  */
      const viewportHeight = window.innerHeight;
      const runwayWidth = runwayWrapper.getBoundingClientRect().width;

      const imageHeight = getImageHeight(image, runwayWidth, viewportHeight);
      setHeroWidth((currentWidth) =>
        currentWidth === runwayWidth ? currentWidth : runwayWidth,
      );

      // Measure scroll progress and clamp the image pan to its available height.
      const runwayTop =
        runwayWrapper.getBoundingClientRect().top + window.scrollY; //  ( (Distance TO Top edge of runwayWrapper − Distance TO Viewport's top edge) + Distance TO Viewport's top edge ) = Distance TO Top edge of runwayWrapper
      const panDistance = imageHeight - viewportHeight; // panDistance = Amount of Image Height that was set Off-Screen (Amount of Image height that COULD be scrolled) [FIXED AMOUNT]
      const scrollProgress = Math.max(0, window.scrollY - runwayTop); // scrollProgress = Distance from top of Runway to window.scrollY
      const imageOffset = Math.min(scrollProgress, panDistance); // imageOffset = EQUAL to scrollProgress OR Amount of Off-screen Image (If Screen Progress tries to progress BEYOND)

      // Begin blurring only after the image has finished panning.
      const blurProgress = Math.min(
        1,
        Math.max(0, (scrollProgress - panDistance) / viewportHeight),
      );

      /**
       *  Keep the Runway Wrapper's Height and Image's Height in sync.
       *  Meaning Runway Wrapper's Height should always be equal to Image's Height.
       *  NOTE: As we will see later, Image and Runway are same height and it is set that way using the Setter Function below.
       *        HeroWrapper on the other hand will ALWAYS be 100vh, The wrapper that contains Children.
       *        Children such as Animated Text, Call to Action Button, Small Product Cards.
       *
       *  */
      setRunwayHeight((currentRunwayHeight) =>
        currentRunwayHeight === imageHeight ? currentRunwayHeight : imageHeight,
      );

      /**
       *  APPLY the CALCULATED Image Width as the Runway Width.
       *  APPLY the CALCULATED Image Height as imageHeight.
       *  APPLY the CALCULATED Image Offset as imageOffset.
       *
       *  */
      heroWrapper.style.width = `${runwayWidth}px`;
      image.style.width = `${runwayWidth}px`;
      image.style.height = `${imageHeight}px`;
      image.style.transform = `translateY(-${imageOffset}px)`;

      // Apply blur to the whole fixed Hero wrapper.
      heroWrapper.style.filter = `blur(${24 * blurProgress}px)`;
    };

    const scheduleUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateScrollEffect);
      }
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(runwayWrapper);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [backgroundReady, scrollEffect]);

  /**
   * ---------- MAIN HERO (contains the Background Image , Children )  ----------
   *  Children then contains Animated Text, Call to Action Button, Small Product Cards.
   *              that are rendered on top of the Background Image.
   *
   */
  const heroWrapperElement = (
    <div
      ref={scrollEffect ? heroWrapperRef : undefined}
      className={
        scrollEffect
          ? "dark fixed left-0 top-0 z-0 h-dvh overflow-hidden"
          : "dark relative h-dvh overflow-hidden"
      }
      style={scrollEffect ? { width: `${heroWidth}px` } : undefined}
    >
      <img
        ref={scrollEffect ? imageRef : undefined}
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
        className={`absolute ${
          scrollEffect
            ? "left-0 top-0 max-w-none object-cover"
            : "inset-0 size-full object-cover"
        } transition-[object-position,filter,scale] duration-1000 ease-in-out delay-500 ${
          backgroundReady
            ? "visible object-center blur-0 scale-100"
            : "invisible object-[center_bottom] blur-[10px] scale-[1.2]"
        }`}
        style={
          scrollEffect
            ? {
                width: `${heroWidth}px`,
                height: runwayHeight ? `${runwayHeight}px` : "100dvh",
              }
            : undefined
        }
      />
      {children(contentVisible, animateBlurText)}
    </div>
  );

  /**
   * ---------- RUNWAY WRAPPER ----------
   *  Wraps the Hero Section ONLY IF "scrollEffect" is enabled on rendered Hero Section:
   *    <Hero backgroundImage={"/assets/my-beautifull-hero-image.jpg"} scrollEffect > ... </Hero>
   *                                                                   ^^^^^^^^^^^^
   */
  if (scrollEffect) {
    return (
      <div
        ref={runwayWrapperRef}
        className="dark relative z-0"
        data-navbar-scroll-trigger
        data-navbar-trigger-ready={runwayHeight > 0 ? "true" : "false"}
        style={{ height: runwayHeight ? `${runwayHeight}px` : "100dvh" }}
      >
        {heroWrapperElement}
      </div>
    );
  }

  return heroWrapperElement;
}
// TODO: SCROLLER + <Company Name> • est. MMXXVI • Islamabad
