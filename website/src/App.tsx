import { Modal } from "@wemeet-overlay/modal";
import ToastTester from "./ToastTester";

function App() {
  return (
    <main>
      <ToastTester />
      <div>
        <Modal trigger={<button>모달열기</button>}>
          {({ controller }) => (
            <Modal.Contents>
              <div>콘텐츠</div>
              <button onClick={controller.close}>닫기</button>
            </Modal.Contents>
          )}
        </Modal>
      </div>
    </main>
  );
}

export default App;
