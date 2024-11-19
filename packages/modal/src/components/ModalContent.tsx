import { CSSProperties, ReactNode } from "react";
import { useModalController } from "../context";
import CloseIcon from "./CloseIcon";

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

function ModalContent({
  children,
  className,
  style,
  width = 400,
  height,
  title,
}: WrapperProps) {
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
        data-ming-modal-content
        data-with-header={!!title}
        className={className}
        style={{ maxHeight: "95vh", width, height, ...style }}
      >
        {children}
      </div>
    </>
  );
}

export default ModalContent;
