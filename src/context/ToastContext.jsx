/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useRef, useState } from "react";

const ToastContext = createContext(null);
const MAX_TOASTS = 3;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextToastId = useRef(0);

  function showToast(message, type = "success") {
    nextToastId.current += 1;
    const id = nextToastId.current;
    setToasts((previousToasts) => {
      const toasts =
        previousToasts.length < MAX_TOASTS
          ? previousToasts
          : previousToasts.map((toast, index) =>
              index === 0 ? { ...toast, closing: true } : toast,
            );

      return [...toasts, { id, message, type, closing: false }];
    });
  }

  return (
    <ToastContext.Provider value={{ toasts, setToasts, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>");
  return context;
}
