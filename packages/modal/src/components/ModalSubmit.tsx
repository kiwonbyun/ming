import {
  ButtonHTMLAttributes,
  isValidElement,
  MouseEvent,
  ReactElement,
  useState,
} from "react";
import { useModalController } from "../context";
import { Slot } from "./Slot";

type TWidthUnit = "px" | "%" | "vw";
type WidthType =
  | number
  | `${number}${TWidthUnit}`
  | "auto"
  | "fit-content"
  | "max-content"
  | "min-content";

interface SubmitProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  action?: () => Promise<any>;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onSuccess?: (res: any) => void;
  onError?: (res: any) => void;
  clear?: boolean;
  width?: WidthType;
  asChild?: boolean;
}

function ModalSubmit({
  action,
  onClick,
  onSuccess,
  onError,
  children,
  clear = false,
  width,
  asChild,
  ...props
}: SubmitProps) {
  const [isLoading, setIsLoading] = useState(false);
  const controller = useModalController();
  const closeFunc = clear ? controller.clear : controller.close;

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!action) {
      onClick?.(e);
      closeFunc();
      return;
    }

    try {
      setIsLoading(true);
      onClick?.(e);
      const res = await action();
      if (res === undefined) {
        return;
      }
      onSuccess?.(res);
      closeFunc();
    } catch (err) {
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (asChild && isValidElement(children)) {
    return (
      <Slot
        onClick={handleClick}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {children as ReactElement}
      </Slot>
    );
  }

  return (
    <button
      data-button
      data-modal-submit
      onClick={handleClick}
      disabled={isLoading || props.disabled}
      style={{ width, ...props.style }}
      {...props}
    >
      {children}
    </button>
  );
}

export default ModalSubmit;
