"use client";

import { cloneElement, useEffect, useId, useState } from "react";
import type { CSSProperties, MouseEvent, ReactElement, ReactNode } from "react";
import { ModalState } from "./state";
import { ModalPortal, modalRootId } from "./components/ModalPortal";
import CloseIcon from "./components/CloseIcon";

interface ModalController {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  clear?: () => void;
  isTop?: boolean;
}

interface ModalProps {
  trigger: ReactNode;
  children: (props: { controller: ModalController }) => ReactNode;
}

interface WrapperProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  width?: number | string;
  height?: number | string;
}

interface HeaderProps {
  children: ReactNode;
}

const ModalRoot = () => <div id={modalRootId}></div>;

const Modal = ({ trigger, children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalId = useId();

  const controller: ModalController = {
    isOpen,
    open: () => {
      ModalState.open(modalId);
    },
    close: () => {
      ModalState.close(modalId);
    },
    clear: () => {
      console.log("clear");
      ModalState.closeAll();
    },
  };

  const triggerElement = cloneElement(trigger as ReactElement, {
    onClick: (e: MouseEvent) => {
      const original = (trigger as ReactElement).props.onClick;
      original?.(e);
      controller.open();
    },
  });

  useEffect(() => {
    // 컴포넌트 마운트 시 ModalRoot 존재 여부 체크
    const modalRoot = document.getElementById(modalRootId);
    if (!modalRoot) {
      throw new Error(
        "ModalRoot element not found. " +
          "This error occurs when <ModalRoot /> component is missing from your app.\n\n" +
          "To fix this, add <ModalRoot /> at the root level of your app:\n\n" +
          'createRoot(document.getElementById("root")).render(\n' +
          "  <StrictMode>\n" +
          "    <ModalRoot />\n" +
          "    <App />\n" +
          "  </StrictMode>\n" +
          ");"
      );
    }
  }, []);

  useEffect(() => {
    ModalState.subscribe((modal) => {
      if (modal.id !== modalId) return;
      if (modal.isOpen) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    });
  }, [modalId]);

  return (
    <div>
      {triggerElement}
      <ModalPortal isOpen={isOpen} close={controller.close}>
        {children({ controller })}
      </ModalPortal>
    </div>
  );
};

const ModalContents = ({
  children,
  className,
  style,
  width = 400,
  height = 300,
}: WrapperProps) => {
  const computedWidth = typeof width === "number" ? width + "px" : width;
  const computedHeight = typeof height === "number" ? height + "px" : height;
  return (
    <div
      data-modal-content
      className={className}
      style={{ width: computedWidth, height: computedHeight, ...style }}
    >
      {children}
    </div>
  );
};

Modal.Contents = ModalContents;

export { Modal, ModalRoot };
