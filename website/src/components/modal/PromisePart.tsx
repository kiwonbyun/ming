import { Dispatch, SetStateAction } from "react";
import Button from "../Button";
import DraculaCodeBlock from "../DraculaCodeBlock";

interface PromisePartProps {
  isSuccess: boolean;
  hasTitle: boolean;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  isLayered: boolean;
}

function PromisePart({
  isSuccess,
  setIsSuccess,
  hasTitle,
  isLayered,
}: PromisePartProps) {
  const codeText = isLayered
    ? `import { Modal } from "@wemeet-overlay/modal";
          
<Modal trigger={<Button>모달 열기</Button>}>
    <Modal.Content ${hasTitle ? 'title="테스트 모달"' : ""}>
        ... // user code
        <div>
            <Modal.Close>닫기</Modal.Close>
            <Modal trigger={<Button>확인</Button>}>
              <Modal.Content width={250} height={200}>
                  ... // your code
                  <Modal.Close>취소</Modal.Close>
                  <Modal.Submit
                    clear
                    promise={${isSuccess ? "successApiReq" : "failApiReq"}}
                    onFulfilled={(res: string) => toast.success("성공", { description: res })}}
                    onRejected={(err: string) => toast.error("실패", { description: err })}}
                  >
                    삭제
                  </Modal.Submit>
                </Modal.Content>
            </Modal>
        </div>
    </Modal.Content>
</Modal>`
    : `import { Modal } from "@wemeet-overlay/modal";
          
<Modal trigger={<Button>모달 열기</Button>}>
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
</Modal>`;

  return (
    <>
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
          비동기 요청 성공
        </Button>
        <Button
          onClick={() => setIsSuccess(false)}
          buttonType={!isSuccess ? "primary" : "default"}
        >
          비동기 요청 실패
        </Button>
      </div>
      <DraculaCodeBlock text={codeText} />
    </>
  );
}

export default PromisePart;
