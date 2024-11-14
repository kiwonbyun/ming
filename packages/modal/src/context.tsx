import { createContext, useContext } from "react";
import { ModalController } from ".";

interface ModalContextValue {
  controller: ModalController;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalController = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalController must be used within a Modal component");
  }
  return context.controller;
};

export const ModalProvider = ModalContext.Provider;
