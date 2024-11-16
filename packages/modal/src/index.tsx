"use client";

import { cloneElement, useEffect, useId, useState } from "react";
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEvent,
  ReactElement,
  ReactNode,
} from "react";
import { ModalState } from "./state";
import { ModalPortal, modalRootId } from "./components/ModalPortal";
import CloseIcon from "./components/CloseIcon";
import { ModalProvider, useModalController } from "./context";

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

type TWidthUnit = "px" | "%" | "vw";
type THeightUnit = "px" | "%" | "vh";

interface WrapperProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  width?: number | `${number}${TWidthUnit}`;
  height?: number | `${number}${THeightUnit}`;
  title?: string | ReactNode;
}

const ModalContent = ({
  children,
  className,
  style,
  width = 400,
  height,
  title,
}: WrapperProps) => {
  const controller = useModalController();
  return (
    <>
      {!!title && (
        <header data-modal-header>
          <span>{title}</span>
          <CloseIcon onClick={controller.close} />
        </header>
      )}
      <div
        data-modal-content
        data-with-header={!!title}
        className={className}
        style={{ maxHeight: "95vh", width, height, ...style }}
      >
        {children}
      </div>
    </>
  );
};

interface SubmitProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  promise?: () => Promise<any>;
  onClick?: () => void;
  onFulfilled?: (res: any) => void;
  onRejected?: (res: any) => void;
  clear?: boolean;
  width?: number | `${number}${TWidthUnit}`;
}

const ModalSubmit = ({
  promise,
  onClick,
  onFulfilled,
  onRejected,
  children,
  clear = false,
  width,
  ...props
}: SubmitProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const controller = useModalController();
  const closeFunc = clear ? controller.clear : controller.close;

  const handleClick = async () => {
    if (!promise) {
      onClick?.();
      closeFunc();
      return;
    }

    try {
      setIsLoading(true);
      onClick?.();
      const res = await promise();
      onFulfilled?.(res);
      closeFunc();
    } catch (err) {
      onRejected?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      data-button
      data-modal-submit
      onClick={handleClick}
      disabled={isLoading}
      style={{ width, ...props.style }}
      {...props}
    >
      {children}
    </button>
  );
};

interface CloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number | `${number}${TWidthUnit}`;
}

const ModalClose = ({ width, ...props }: CloseProps) => {
  const controller = useModalController();
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    controller.close();
  };

  return (
    <button
      data-button
      data-modal-close
      style={{ width, ...props.style }}
      {...props}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};

Modal.Content = ModalContent;
Modal.Submit = ModalSubmit;
Modal.Close = ModalClose;

export { Modal, ModalRoot };
