import { useEffect, useState } from "react";
import { twMerge } from "cn";
import { useToast } from "@/context/ToastContext";

function ToastMessage({ message, className }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let showFrame;
    const showTimer = setTimeout(() => {
      setIsMounted(true);
      setIsVisible(false);
      showFrame = requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, 0);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    const unmountTimer = setTimeout(() => {
      setIsMounted(false);
    }, 6000);

    return () => {
      cancelAnimationFrame(showFrame);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={twMerge(
        className,
        "rounded-md bg-secondary/50 px-4 py-2 text-primary backdrop-blur-sm transition-all duration-1000 ease-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-[60px] opacity-0",
      )}
    >
      <p>{message}</p>
    </div>
  );
}

export default function Toast({ className }) {
  const { toast } = useToast();

  if (toast.message === "") return null;

  return (
    <ToastMessage
      key={toast.id}
      message={toast.message}
      className={className}
    />
  );
}
