import { Modal, ModalRoot } from "@wemeet-overlay/modal";
import Button from "./components/Button";
import DraculaCodeBlock from "./components/DraculaCodeBlock";
import { useState } from "react";
import WarningIcon from "./components/WarningIcon";
import { toast } from "@wemeet-overlay/toast";

function ModalTester() {
  const [autoClose, setAutoClose] = useState(true);
  const [hasTitle, setHasTitle] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const successPromise = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve("api 요청 성공");
      }, 1000)
    );
  const failPromise = () =>
    new Promise((_, reject) =>
      setTimeout(() => {
        reject("api 요청 실패");
      }, 1000)
    );
  const promiseFunc = isSuccess ? successPromise : failPromise;

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
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <Button
          onClick={() => setHasTitle(true)}
          buttonType={hasTitle ? "primary" : "default"}
        >
          모달 타이틀 추가
        </Button>
        <Button
          onClick={() => setHasTitle(false)}
          buttonType={!hasTitle ? "primary" : "default"}
        >
          모달 타이틀 제거
        </Button>
      </div>
      <DraculaCodeBlock
        text={`<Modal trigger={<Button>모달 열기</Button>}>
    <Modal.Content ${hasTitle ? 'title="테스트 모달"' : ""}>
        ... // user code
        <div>
          <Modal.Close>닫기</Modal.Close>
          <Modal.Submit>확인</Modal.Submit>
        </div>
    </Modal.Content>
  </Modal>`}
      />

      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={() => setIsSuccess(true)}
          buttonType={isSuccess ? "primary" : "default"}
        >
          promise success
        </Button>
        <Button
          onClick={() => setIsSuccess(false)}
          buttonType={!isSuccess ? "primary" : "default"}
        >
          promise fail
        </Button>
      </div>
      <DraculaCodeBlock
        text={`<Modal trigger={<Button>모달 열기</Button>}>
    <Modal.Content ${hasTitle ? 'title="테스트 모달"' : ""}>
        ... // user code
        <div>
            <Modal.Close>닫기</Modal.Close>
            <Modal.Submit
                promise={${isSuccess ? "successApiReq" : "failApiReq"}}
                onSuccess={(res: string) => toast.success("성공", { description: res })}}
                onFail={(err: string) => toast.error("실패", { description: err })}
            >
              확인
            </Modal.Submit>
        </div>
    </Modal.Content>
  </Modal>`}
      />
      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        <Modal
          trigger={
            <Button buttonType="primary" primaryColor="#1C48CD">
              모달 열기
            </Button>
          }
        >
          <Modal.Content title={hasTitle ? "테스트 모달" : undefined}>
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
              <Modal.Submit
                promise={promiseFunc}
                onClick={() => {
                  console.log("언제나 발생");
                }}
                onSuccess={(res: string) => {
                  toast.success("성공", { description: res });
                }}
                onFail={(err: string) => {
                  toast.error("실패", {
                    description: err,
                  });
                }}
              >
                확인
              </Modal.Submit>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
}

export default ModalTester;
