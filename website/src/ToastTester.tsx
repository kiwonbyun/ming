import { Position, toast, Toaster } from "@b-origin/ming-toast";
import Button from "./components/Button";
import { useMemo, useState } from "react";
import DraculaCodeBlock from "./components/DraculaCodeBlock";
import "./index.css";

type ToastType = "message" | "success" | "error" | "warning" | "info";

function ToastTester() {
  const [position, setPosition] = useState<Position>("bottom-center");
  const [offset, setOffset] = useState("24px");
  const [toastType, setToastType] = useState<ToastType>("message");
  const openToast = () => {
    if (toastType === "message") toast("정상적으로 처리되었습니다.");
    if (toastType === "success")
      toast.success("성공!", {
        description: "게시물이 생성되었습니다.",
      });
    if (toastType === "error")
      toast.error("실패!", { description: "입력값을 확인해주세요." });
    if (toastType === "warning")
      toast.warning("경고!", {
        description: "사용자에게 노출될 수 있습니다.",
        duration: 1000,
      });
    if (toastType === "info")
      toast.info("알림!", {
        description: "해당 항목은 필수값입니다. ",
      });
  };

  const toastCode = useMemo(() => {
    if (toastType === "message")
      return `const openToast = () =>{
  toast("정상적으로 처리되었습니다.")
}`;
    if (toastType === "success")
      return `const openToast = () =>{
  toast.success("성공!", { description: "게시물이 생성되었습니다." });
}`;
    if (toastType === "error")
      return `const openToast = () =>{
  toast.error("실패!", { description: "입력값을 확인해주세요." });
}`;
    if (toastType === "warning")
      return `const openToast = () =>{
  toast.warning("경고!", { description: "사용자에게 노출될 수 있습니다.", duration: 1000 });
}`;
    if (toastType === "info")
      return `const openToast = () =>{
  toast.info("알림!", { description: "해당 항목은 필수값입니다." });
}`;
    return "";
  }, [toastType]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Toaster position={position} offset={offset} />
      <h2>@b-origin/ming-toast</h2>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <Button
          onClick={() => setPosition("top-right")}
          buttonType={position === "top-right" ? "primary" : "default"}
        >
          top-right
        </Button>
        <Button
          onClick={() => setPosition("top-center")}
          buttonType={position === "top-center" ? "primary" : "default"}
        >
          top-center
        </Button>
        <Button
          onClick={() => setPosition("top-left")}
          buttonType={position === "top-left" ? "primary" : "default"}
        >
          top-left
        </Button>
        <Button
          onClick={() => setPosition("bottom-right")}
          buttonType={position === "bottom-right" ? "primary" : "default"}
        >
          bottom-right
        </Button>
        <Button
          onClick={() => setPosition("bottom-center")}
          buttonType={position === "bottom-center" ? "primary" : "default"}
        >
          bottom-center
        </Button>
        <Button
          onClick={() => setPosition("bottom-left")}
          buttonType={position === "bottom-left" ? "primary" : "default"}
        >
          bottom-left
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={() => setOffset("12px")}
          buttonType={offset === "12px" ? "primary" : "default"}
        >
          12px
        </Button>
        <Button
          onClick={() => setOffset("24px")}
          buttonType={offset === "24px" ? "primary" : "default"}
        >
          24px
        </Button>
        <Button
          onClick={() => setOffset("32px")}
          buttonType={offset === "32px" ? "primary" : "default"}
        >
          32px
        </Button>
        <Button
          onClick={() => setOffset("48px")}
          buttonType={offset === "48px" ? "primary" : "default"}
        >
          48px
        </Button>
      </div>
      <DraculaCodeBlock
        text={`import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { Toaster } from "@b-origin/ming-toast";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
        <Toaster position="${position}" offset="${offset}" />
        // default: position="bottom-center" offset="24px"
    </StrictMode>
);
`}
      />
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <Button
          onClick={() => setToastType("message")}
          buttonType={toastType === "message" ? "primary" : "default"}
        >
          일반 토스트
        </Button>
        <Button
          onClick={() => setToastType("success")}
          buttonType={toastType === "success" ? "primary" : "default"}
        >
          success 토스트
        </Button>
        <Button
          onClick={() => setToastType("error")}
          buttonType={toastType === "error" ? "primary" : "default"}
        >
          error 토스트
        </Button>
        <Button
          onClick={() => setToastType("warning")}
          buttonType={toastType === "warning" ? "primary" : "default"}
        >
          warning 토스트
        </Button>
        <Button
          onClick={() => setToastType("info")}
          buttonType={toastType === "info" ? "primary" : "default"}
        >
          info 토스트
        </Button>
      </div>
      <DraculaCodeBlock text={toastCode} />
      <Button onClick={openToast} buttonType="primary" primaryColor="#1C48CD">
        토스트 실행시키기
      </Button>
    </div>
  );
}

export default ToastTester;
