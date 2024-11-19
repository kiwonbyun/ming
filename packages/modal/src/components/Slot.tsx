import { cloneElement, ReactElement } from "react";

type SlotProps = {
  children: ReactElement;
  [key: string]: any; // 또는 더 구체적인 타입을 사용할 수 있습니다
};

export const Slot = ({ children, ...props }: SlotProps) => {
  return cloneElement(children, props);
};
