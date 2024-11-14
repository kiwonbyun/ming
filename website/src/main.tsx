import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "@wemeet-overlay/toast";
import { ModalRoot } from "@wemeet-overlay/modal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster />
    <ModalRoot />
  </StrictMode>
);
