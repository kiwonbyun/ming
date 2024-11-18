import { useState } from "react";
import { Modal, ModalRoot } from "@b-origin/ming-modal";
import { toast } from "@b-origin/ming-toast";

import Button from "./components/Button";
import WarningIcon from "./components/WarningIcon";
import DimPart from "./components/modal/DimPart";
import TitlePart from "./components/modal/TitlePart";
import PromisePart from "./components/modal/PromisePart";

import ControlCasePart from "./components/modal/ControlCasePart";
import LayerPart from "./components/modal/LayerPart";

function ModalTester() {
  const [autoClose, setAutoClose] = useState(true);
  const [hasTitle, setHasTitle] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLayered, setIsLayered] = useState(false);

  const successPromise = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve("api 요청 성공");
      }, 500)
    );
  const failPromise = () =>
    new Promise((_, reject) =>
      setTimeout(() => {
        reject("api 요청 실패");
      }, 500)
    );
  const promiseFunc = isSuccess ? successPromise : failPromise;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ModalRoot dimAutoClose={autoClose} />
      <h2>@b-origin/ming-modal</h2>

      <DimPart autoClose={autoClose} setAutoClose={setAutoClose} />

      <TitlePart hasTitle={hasTitle} setHasTitle={setHasTitle} />

      <LayerPart isLayered={isLayered} setIsLayered={setIsLayered} />

      <PromisePart
        hasTitle={hasTitle}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
        isLayered={isLayered}
      />

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
              justifyContent: "space-between",
              height: "150px",
              paddingBottom: "30px",
            }}
          >
            <WarningIcon />
            <h3>삭제하시겠습니까?</h3>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "gray",
              }}
            >
              삭제한 게시물을 복구할 수 없습니다.
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <Modal.Close>닫기</Modal.Close>
            {isLayered ? (
              <Modal
                trigger={
                  <Button
                    style={{
                      width: "200px",
                      backgroundColor: "#1C48CD",
                      color: "white",
                      height: "40px",
                      boxShadow: "none",
                      fontSize: "16px",
                      fontWeight: 500,
                      letterSpacing: "-2%",
                    }}
                  >
                    확인
                  </Button>
                }
              >
                <Modal.Content width={250} height={200}>
                  <h3
                    style={{
                      height: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    정말요..?
                  </h3>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <Modal.Close>취소</Modal.Close>
                    <Modal.Submit
                      clear
                      promise={promiseFunc}
                      onFulfilled={(res: string) => {
                        toast.success("성공", { description: res });
                      }}
                      onRejected={(err: string) => {
                        toast.error("실패", {
                          description: err,
                        });
                      }}
                    >
                      삭제
                    </Modal.Submit>
                  </div>
                </Modal.Content>
              </Modal>
            ) : (
              <Modal.Submit
                promise={promiseFunc}
                onFulfilled={(res: string) => {
                  toast.success("성공", { description: res });
                }}
                onRejected={(err: string) => {
                  toast.error("실패", {
                    description: err,
                  });
                }}
              >
                확인
              </Modal.Submit>
            )}
          </div>
        </Modal.Content>
      </Modal>

      <ControlCasePart />
    </div>
  );
}

export default ModalTester;
