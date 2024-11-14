"use client";
import type { CSSProperties, HTMLAttributes } from "react";
import React, { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import "../styles.css";

interface ModalPortalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: React.ReactNode;
  dimClose: boolean;
  close?: () => void;
  style?: CSSProperties;
}

export const modalRootId = "wemeet-overlay-root";

export const ModalPortal = ({
  isOpen,
  children,
  dimClose,
  close,
  style,
  className,
  ...props
}: ModalPortalProps) => {
  const html = document.documentElement;

  useEffect(() => {
    if (isOpen && html) {
      html.style.setProperty("overflow", "hidden");
    } else {
      html.style.setProperty("overflow", "auto");
    }
    return () => {
      html.style.setProperty("overflow", "auto");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <Fragment>
      <div
        data-modal-dim
        className="wemeet-modal-dim"
        onClick={dimClose ? close : undefined}
      />
      <div
        data-modal-container
        className="wemeet-modal-container"
        style={{ ...style }}
        {...props}
      >
        {children}
      </div>
    </Fragment>,
    document.getElementById(modalRootId) as HTMLElement
  );
};
