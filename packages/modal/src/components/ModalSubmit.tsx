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
  promise?: () => Promise<any>;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onFulfilled?: (res: any) => void;
  onRejected?: (res: any) => void;
  clear?: boolean;
  width?: WidthType;
  asChild?: boolean;
}

function ModalSubmit({
  promise,
  onClick,
  onFulfilled,
  onRejected,
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
    if (!promise) {
      onClick?.(e);
      closeFunc();
      return;
    }

    try {
      setIsLoading(true);
      onClick?.(e);
      const res = await promise();
      onFulfilled?.(res);
      closeFunc();
    } catch (err) {
      onRejected?.(err);
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
