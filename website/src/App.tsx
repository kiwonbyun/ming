import ToastTester from "./ToastTester";
import ModalTester from "./ModalTester";

function App() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "50px",
        overflowY: "auto",
      }}
    >
      <h1>Wemeet-Overlay</h1>
      <ToastTester />
      <ModalTester />
    </main>
  );
}

export default App;
