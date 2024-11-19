import { ButtonHTMLAttributes, isValidElement, ReactElement } from "react";
import { useModalController } from "../context";
import { composeEventHandlers } from "../utils/composeEventHandler";
import { Slot } from "./Slot";

type TWidthUnit = "px" | "%" | "vw";
type WidthType =
  | number
  | `${number}${TWidthUnit}`
  | "auto"
  | "fit-content"
  | "max-content"
  | "min-content";

interface CloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: WidthType;
  asChild?: boolean;
}

function ModalClose({
  width,
  children,
  onClick,
  asChild,
  ...props
}: CloseProps) {
  const controller = useModalController();

  if (asChild && isValidElement(children)) {
    return (
      <Slot
        {...props}
        onClick={composeEventHandlers(onClick, controller.close)}
      >
        {children as ReactElement}
      </Slot>
    );
  }

  return (
    <button
      data-button
      data-modal-close
      style={{ width, ...props.style }}
      {...props}
      onClick={composeEventHandlers(onClick, controller.close)}
    >
      {children}
    </button>
  );
}

export default ModalClose;
