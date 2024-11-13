"use client";
import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import ToastItem from "./components/ToastItem";
import { ToastI, Position } from "./types";
import { toast, ToastState } from "./state";
import "./styles.css";

const VIEWPORT_OFFSET_DEFAULT = "24px";

interface ToasterProps {
  offset?: string | number;
  position?: Position;
}

const Toaster = (props: ToasterProps) => {
  const { offset, position = "bottom-center" } = props;
  const [toasts, setToasts] = useState<ToastI[]>([]);
  const [expanded, setExpanded] = React.useState(false);
  const [y, x] = position.split("-");

  const removeToast = React.useCallback((toastToRemove: ToastI) => {
    setToasts((toasts) => {
      return toasts.filter(({ id }) => id !== toastToRemove.id);
    });
  }, []);

  useEffect(() => {
    return ToastState.subscribe((toast: ToastI) => {
      setTimeout(() => {
        flushSync(() => {
          setToasts([toast]);
        });
      });
    });
  }, []);

  React.useEffect(() => {
    if (toasts.length <= 1) {
      setExpanded(false);
    }
  }, [toasts]);
  return (
    <ol
      data-wemeet-toast-toaster
      data-x-position={x}
      data-y-position={y}
      onMouseEnter={() => setExpanded(true)}
      onMouseMove={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={
        {
          "--offset":
            typeof offset === "number"
              ? `${offset}px`
              : offset || VIEWPORT_OFFSET_DEFAULT,
        } as React.CSSProperties
      }
    >
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          toast={t}
          expanded={expanded}
          removeToast={removeToast}
        />
      ))}
    </ol>
  );
};

export { Toaster, toast };
