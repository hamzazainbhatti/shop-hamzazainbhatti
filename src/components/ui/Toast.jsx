import { useCallback, useEffect, useState } from "react";
import { twMerge } from "cn";
import { useToast } from "@/context/ToastContext";

const STACK_STEP = 8;
const ENTRY_OFFSET = 40;
const DISPLAY_DURATION = 5000;
const UNMOUNT_DELAY = 6000;
const FAST_UNMOUNT_DELAY = 350;
const NORMAL_DURATION_CLASS = "duration-1000";
const FAST_DURATION_CLASS = "duration-300";

function getToastTypeClasses(type) {
  return type === "error"
    ? "bg-destructive/90 text-white"
    : "bg-success/90 text-success-foreground";
}

function getToastTranslation(stackOffset, isVisible, isClosing) {
  const entryOffset = isVisible && !isClosing ? 0 : ENTRY_OFFSET;
  return `calc(-${stackOffset * STACK_STEP}px + ${entryOffset}px)`;
}

function getToastOpacity(stackOffset, isVisible, isClosing) {
  return isVisible && !isClosing
    ? Math.max(0, 1 - stackOffset * 0.3)
    : 0;
}

function ToastMessage({
  toast,
  stackIndex,
  stackSize,
  removeToast,
  className,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isClosing = toast.closing;
  const stackOffset = stackSize - 1 - stackIndex;
  const translation = getToastTranslation(
    stackOffset,
    isVisible,
    isClosing,
  );
  const opacity = getToastOpacity(stackOffset, isVisible, isClosing);

  useEffect(() => {
    let showFrame;
    const showTimer = setTimeout(() => {
      setIsMounted(true);
      setIsVisible(false);
      showFrame = requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, 0);
    const hideTimer = setTimeout(
      () => setIsVisible(false),
      isClosing ? 0 : DISPLAY_DURATION,
    );
    const unmountTimer = setTimeout(
      () => removeToast(toast.id),
      isClosing ? FAST_UNMOUNT_DELAY : UNMOUNT_DELAY,
    );

    return () => {
      cancelAnimationFrame(showFrame);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, [isClosing, removeToast, toast.id]);

  if (!isMounted) return null;

  return (
    <div
      className={twMerge(
        className,
        "col-start-1 row-start-1 rounded-md px-4 py-2 backdrop-blur-sm transition-[translate,opacity] ease-out",
        getToastTypeClasses(toast.type),
        isClosing ? FAST_DURATION_CLASS : NORMAL_DURATION_CLASS,
      )}
      style={{
        translate: `0 ${translation}`,
        opacity,
      }}
    >
      <p>{toast.message}</p>
    </div>
  );
}

export default function Toast({ className }) {
  const { toasts, setToasts } = useToast();

  const removeToast = useCallback((id) => {
    setToasts((previousToasts) =>
      previousToasts.filter((toast) => toast.id !== id),
    );
  }, [setToasts]);

  return (
    <div className={twMerge(className, "grid w-max max-w-[calc(100vw-2rem)]")}>
      {toasts.map((toast, index) => (
        <ToastMessage
          key={toast.id}
          toast={toast}
          stackIndex={index}
          stackSize={toasts.length}
          removeToast={removeToast}
        />
      ))}
    </div>
  );
}
