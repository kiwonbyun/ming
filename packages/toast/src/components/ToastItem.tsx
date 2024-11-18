import React, { useState } from "react";
import type { ToastI, ToastType } from "../types";
import CloseIcon from "./icon/CloseIcon";
import ErrorIcon from "./icon/ErrorIcon";
import InfoIcon from "./icon/InfoIcon";
import SuccessIcon from "./icon/SuccessIcon";
import WarningIcon from "./icon/WarningIcon";

const TOAST_LIFETIME = 3000;

interface ToastItemProps {
  toast: ToastI;
  expanded: boolean;
  removeToast: (toast: ToastI) => void;
}

function getIcon(type?: ToastType) {
  switch (type) {
    case "error":
      return <ErrorIcon />;
    case "info":
      return <InfoIcon />;
    case "success":
      return <SuccessIcon />;
    case "warning":
      return <WarningIcon />;
    default:
      return null;
  }
}

function ToastItem({ toast, expanded, removeToast }: ToastItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const closeTimerStartTimeRef = React.useRef(0);
  const lastCloseTimerStartTimeRef = React.useRef(0);
  const remainingTime = React.useRef(toast.duration || TOAST_LIFETIME);
  const isDefaultToast = toast.type === "message";

  const deleteToast = React.useCallback(() => {
    setIsRemoving(true);
    setTimeout(() => {
      removeToast(toast);
    }, 100);
  }, [toast, removeToast]);

  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const pauseTimer = () => {
      if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
        const elapsedTime =
          new Date().getTime() - closeTimerStartTimeRef.current;
        remainingTime.current = remainingTime.current - elapsedTime;
      }
      lastCloseTimerStartTimeRef.current = new Date().getTime();
    };

    const startTimer = () => {
      if (remainingTime.current === Infinity) return;

      closeTimerStartTimeRef.current = new Date().getTime();

      timeoutId = setTimeout(() => {
        deleteToast();
      }, remainingTime.current);
    };

    if (expanded) {
      pauseTimer();
    } else {
      startTimer();
    }

    return () => clearTimeout(timeoutId);
  }, [expanded, toast, deleteToast]);

  return (
    <li
      data-ming-toast-item
      className={isRemoving ? "removing" : ""}
      data-type={toast.type}
    >
      {toast?.icon ?? getIcon(toast.type)}
      {isDefaultToast ? (
        <span data-title>{toast.message}</span>
      ) : (
        <div data-toast-content>
          <span data-title>{toast.message}</span>
          {!!toast.description && (
            <span data-description>{toast.description}</span>
          )}
        </div>
      )}

      <CloseIcon data-delete-button onClick={deleteToast} />
    </li>
  );
}

export default ToastItem;
