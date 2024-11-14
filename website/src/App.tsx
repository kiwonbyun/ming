import { Modal } from "@wemeet-overlay/modal";
import ToastTester from "./ToastTester";

function App() {
  return (
    <main>
      <ToastTester />
      <div>
        <Modal trigger={<button>모달열기</button>}>
          <Modal.Content width={600} height={300}>
            <div>콘텐츠</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Modal.Close>닫기</Modal.Close>
              <Modal.Submit>확인</Modal.Submit>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    </main>
  );
}

export default App;
