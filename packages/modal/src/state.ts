interface Modal {
  id: string;
  isOpen: boolean;
}
type SubscriberT = (modal: Modal) => void;

class Observer {
  private subscribers: Array<SubscriberT>;
  private modalIds: Array<string>;
  private initialized: boolean;

  constructor() {
    this.subscribers = [];
    this.modalIds = [];
    this.initialized = false;
    this.initializeHandler();
  }

  private initializeHandler = () => {
    if (typeof window === "undefined" || this.initialized) return;
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape" && this.modalIds.length > 0) {
        const lastModalId = this.modalIds[this.modalIds.length - 1];
        this.close(lastModalId);
      }
    });
    this.initialized = true;
  };

  subscribe = (subscriber: SubscriberT) => {
    this.subscribers.push(subscriber);
    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  };

  publish = (modal: Modal) => {
    this.subscribers.forEach((subscriber) => subscriber(modal));
  };

  open = (modalId: string) => {
    this.modalIds.push(modalId);
    this.publish({ id: modalId, isOpen: true });
  };
  close = (modalId: string) => {
    const index = this.modalIds.indexOf(modalId);
    this.modalIds.splice(index, 1);
    this.publish({ id: modalId, isOpen: false });
  };
  closeAll = () => {
    this.modalIds.forEach((id) => this.publish({ id, isOpen: false }));
    this.modalIds = [];
  };
}

export const ModalState = new Observer();
