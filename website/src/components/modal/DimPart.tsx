import { Dispatch, SetStateAction } from "react";
import Button from "../Button";
import DraculaCodeBlock from "../DraculaCodeBlock";

interface DimPartProps {
  autoClose: boolean;
  setAutoClose: Dispatch<SetStateAction<boolean>>;
}

function DimPart({ autoClose, setAutoClose }: DimPartProps) {
  return (
    <>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <Button
          onClick={() => setAutoClose(true)}
          buttonType={autoClose ? "primary" : "default"}
        >
          Dim 영역 닫기 활성화
        </Button>
        <Button
          onClick={() => setAutoClose(false)}
          buttonType={!autoClose ? "primary" : "default"}
        >
          Dim 영역 닫기 비활성화
        </Button>
      </div>
      <DraculaCodeBlock
        text={`import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { ModalRoot } from "@b-origin/ming-modal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ModalRoot dimAutoClose={${autoClose}} />
    // default: dimAutoClose={true}
  </StrictMode>
);`}
      />
    </>
  );
}

export default DimPart;
