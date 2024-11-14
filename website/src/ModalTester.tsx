import { Modal, ModalRoot } from "@wemeet-overlay/modal";
import Button from "./components/button";
import DraculaCodeBlock from "./components/DraculaCodeBlock";
import { useState } from "react";
import WarningIcon from "./components/WarningIcon";

function ModalTester() {
  const [autoClose, setAutoClose] = useState(true);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ModalRoot dimAutoClose={autoClose} />
      <h3>@wemeet-overlay/modal</h3>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <Button
          onClick={() => setAutoClose(true)}
          buttonType={autoClose ? "primary" : "default"}
        >
          dim auto close
        </Button>
        <Button
          onClick={() => setAutoClose(false)}
          buttonType={!autoClose ? "primary" : "default"}
        >
          disable dim auto close
        </Button>
      </div>
      <DraculaCodeBlock
        text={`import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { ModalRoot } from "@wemeet-overlay/modal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ModalRoot dimAutoClose={${autoClose}} />
    // default: dimAutoClose={true}
  </StrictMode>
);`}
      />
      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        <Modal trigger={<Button>모달 열기</Button>}>
          <Modal.Content>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "30px",
                height: "76%",
              }}
            >
              <WarningIcon />
              <span
                style={{ fontSize: "18px", fontWeight: 600, marginTop: "50px" }}
              >
                정말 삭제하시겠습니까?
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "30px",
                  color: "gray",
                }}
              >
                삭제한 게시물을 복구할 수 없습니다.
              </span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <Modal.Close>닫기</Modal.Close>
              <Modal.Submit>확인</Modal.Submit>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
}

export default ModalTester;
