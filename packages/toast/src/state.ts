import type { ToastI, ToastOption } from "./types";

type ToastSubscriberT = (toast: ToastI) => void;

let toastsCounter = 1;
const DEFAULT_TOAST_ARGS = {
  duration: 3000,
  type: "message" as const,
};

class Observer {
  private subscribers: Array<ToastSubscriberT>;

  constructor() {
    this.subscribers = [];
  }

  subscribe = (subscriber: ToastSubscriberT) => {
    this.subscribers.push(subscriber);
    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  };

  publish = (toast: ToastI) => {
    this.subscribers.forEach((subscriber) => subscriber(toast));
  };

  addToast = (toast: ToastI) => {
    const updatedToast = { ...DEFAULT_TOAST_ARGS, ...toast };
    this.publish(updatedToast);
  };

  message = (message: string, option: ToastOption = {}) => {
    this.addToast({ ...option, message, type: "message", id: toastsCounter++ });
  };

  success = (message: string, option: ToastOption = {}) => {
    this.addToast({ ...option, message, type: "success", id: toastsCounter++ });
  };

  error = (message: string, option: ToastOption = {}) => {
    this.addToast({ ...option, message, type: "error", id: toastsCounter++ });
  };

  warning = (message: string, option: ToastOption = {}) => {
    this.addToast({ ...option, message, type: "warning", id: toastsCounter++ });
  };

  info = (message: string, option: ToastOption = {}) => {
    this.addToast({ ...option, message, type: "info", id: toastsCounter++ });
  };
}

// 싱글톤 객체. 이 객체를 사용하여 핸들러를 구독시킨다.
export const ToastState = new Observer();

const defaultToast = ToastState.message;

export const toast = Object.assign(defaultToast, {
  success: ToastState.success,
  info: ToastState.info,
  warning: ToastState.warning,
  error: ToastState.error,
});
