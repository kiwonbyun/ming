"use client";
import type { CSSProperties, HTMLAttributes } from "react";
import React, { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import "../styles.css";
import { ModalState } from "../state";

interface ModalPortalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: React.ReactNode;
  dimClose: boolean;
  close?: () => void;
  style?: CSSProperties;
  isRemoving: boolean;
}

export const modalRootId = "wemeet-overlay-root";

export const ModalPortal = ({
  isOpen,
  children,
  dimClose,
  close,
  style,
  isRemoving,
  ...props
}: ModalPortalProps) => {
  const html = document.documentElement;
  const modals = ModalState.getModal();

  useEffect(() => {
    if (modals.length && html) {
      html.style.setProperty("overflow", "hidden");
    } else {
      html.style.setProperty("overflow", "auto");
    }
    return () => {
      html.style.setProperty("overflow", "auto");
    };
  }, [isOpen, modals]);

  if (!isOpen) return null;

  return createPortal(
    <Fragment>
      <div
        data-modal-dim
        data-removing={isRemoving}
        className="wemeet-modal-dim"
        onClick={dimClose ? close : undefined}
      />
      <div
        data-modal-container
        data-removing={isRemoving}
        className={"wemeet-modal-container"}
        style={{ ...style }}
        {...props}
      >
        {children}
      </div>
    </Fragment>,
    document.getElementById(modalRootId) as HTMLElement
  );
};
