import React from "react";

export type ToastType = "message" | "success" | "error" | "info" | "warning";
export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface ToastI {
  id: number;
  message: string;
  description?: string;
  duration?: number;
  icon?: React.ReactNode;
  type?: ToastType;
}

export type ToastOption = Omit<ToastI, "id" | "message">;
