import { Position, toast, Toaster } from "@wemeet-overlay/toast";
import Button from "./components/button";
import { useState } from "react";
import DraculaCodeBlock from "./components/DraculaCodeBlock";
import "./index.css";

function ToastTester() {
  const [position, setPosition] = useState<Position>("bottom-center");
  const [offset, setOffset] = useState("24px");
  const openToast = () => {
    toast("정상적으로 처리되었습니다.");
  };
  const openSuccess = () => {
    toast.success("성공!", { description: "게시물이 생성되었습니다." });
  };
  const openError = () => {
    toast.error("실패!", { description: "입력값을 확인해주세요." });
  };
  const openWarning = () => {
    toast.warning("경고!", {
      description: "사용자에게 노출될 수 있습니다. 1초만에 사라집니다",
      duration: 1000,
    });
  };
  const openInfo = () => {
    toast.info("알림!", {
      description:
        "해당 항목은 필수값입니다. 만약 텍스트가 매우매우 길어지는 경우에는 이렇게 보입니다. 최대 길이에 대한 설정이 필요해 보입니다.아아아아아아아아아아아아아아아아아아아아아아아아아아아아",
    });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Toaster position={position} offset={offset} />
      <h3>@wemeet-overlay/toast</h3>
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

import { Toaster } from "@wemeet-overlay/toast";

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
        <Button onClick={openToast}>토스트 발생</Button>
        <Button onClick={openSuccess}>success토스트 발생</Button>
        <Button onClick={openError}>error토스트 발생</Button>
        <Button onClick={openWarning}>warning토스트 발생</Button>
        <Button onClick={openInfo}>info토스트 발생</Button>
      </div>
    </div>
  );
}

export default ToastTester;
