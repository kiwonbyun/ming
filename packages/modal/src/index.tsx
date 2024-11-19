"use client";

import { cloneElement, useEffect, useId, useState } from "react";
import type { MouseEvent, ReactElement, ReactNode } from "react";
import { ModalState } from "./state";
import { ModalPortal, modalRootId } from "./components/ModalPortal";
import { ModalProvider } from "./context";
import ModalContent from "./components/ModalContent";
import ModalSubmit from "./components/ModalSubmit";
import ModalClose from "./components/ModalClose";

export interface ModalController {
  isOpen: boolean;
  close: () => void;
  clear: () => void;
  isTop?: boolean;
}

interface ModalProps {
  trigger: ReactNode;
  children: ((props: { controller: ModalController }) => ReactNode) | ReactNode;
}

let defaultDimClose = true;

const ModalRoot = ({ dimAutoClose = true }) => {
  defaultDimClose = dimAutoClose;
  return <div id={modalRootId}></div>;
};

const Modal = ({ trigger, children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const modalId = useId();
  const isManualChild = typeof children === "function";

  const controller: ModalController = {
    isOpen,
    close: () => {
      setIsRemoving(true);
      setTimeout(() => {
        ModalState.close(modalId);
      }, 100);
    },
    clear: () => {
      setIsRemoving(true);
      setTimeout(() => {
        ModalState.closeAll();
      }, 100);
    },
  };

  const triggerElement = cloneElement(trigger as ReactElement, {
    onClick: (e: MouseEvent) => {
      const original = (trigger as ReactElement).props.onClick;
      original?.(e);
      ModalState.open(modalId);
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
        setIsRemoving(false);
        setIsOpen(true);
      } else {
        setIsRemoving(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 100);
      }
    });
  }, [modalId]);

  return (
    <div>
      {triggerElement}
      <ModalPortal
        isOpen={isOpen}
        close={controller.close}
        dimClose={defaultDimClose}
        isRemoving={isRemoving}
      >
        <ModalProvider value={{ controller }}>
          {isManualChild ? children({ controller }) : children}
        </ModalProvider>
      </ModalPortal>
    </div>
  );
};

Modal.Content = ModalContent;
Modal.Submit = ModalSubmit;
Modal.Close = ModalClose;

export { Modal, ModalRoot };
