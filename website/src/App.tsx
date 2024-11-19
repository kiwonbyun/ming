import ToastTester from "./ToastTester";
import ModalTester from "./ModalTester";
import ControlCasePart from "./components/modal/ControlCasePart";
import CustomStyleBlock from "./components/CustomStyleBlock";
import AsChildButton from "./components/AsChildButton";

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
      <h1>Ming-ui</h1>
      <ToastTester />
      <ModalTester />
      <ControlCasePart />
      <AsChildButton />
      <CustomStyleBlock />
    </main>
  );
}

export default App;
