"use client";
import type { CSSProperties, HTMLAttributes } from "react";
import React, { Fragment, useEffect, useRef } from "react";
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

export const modalRootId = "ming-overlay-root";

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
  const modalRef = useRef<HTMLDivElement>(null);

  const getFocusableElements = () => {
    const focusableElements = modalRef.current?.querySelectorAll("button");
    return Array.from(focusableElements || []);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;

    const focusableElements = getFocusableElements();

    if (!focusableElements.length) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;
    const { activeElement } = document;

    // Shift + Tab
    if (event.shiftKey) {
      if (activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    }
    // Tab
    else {
      if (activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };
  useEffect(() => {
    if (isOpen) {
      const previousActiveElement = document.activeElement as HTMLElement;

      const focusableElements = getFocusableElements();

      if (focusableElements.length) {
        (focusableElements[0] as HTMLElement).focus();
      } else {
        modalRef.current?.focus();
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        previousActiveElement?.focus();
      };
    }
  }, [isOpen]);

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
        className="ming-modal-dim"
        onClick={dimClose ? close : undefined}
      />
      <div
        ref={modalRef}
        data-modal-container
        data-removing={isRemoving}
        className={"ming-modal-container"}
        style={{ ...style }}
        {...props}
      >
        {children}
      </div>
    </Fragment>,
    document.getElementById(modalRootId) as HTMLElement
  );
};
