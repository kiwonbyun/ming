import { Dispatch, SetStateAction } from "react";
import Button from "../Button";

interface LayerPartProps {
  isLayered: boolean;
  setIsLayered: Dispatch<SetStateAction<boolean>>;
}

function LayerPart({ isLayered, setIsLayered }: LayerPartProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <Button
        onClick={() => setIsLayered(false)}
        buttonType={isLayered ? "default" : "primary"}
      >
        모달 중첩 제거
      </Button>
      <Button
        onClick={() => setIsLayered(true)}
        buttonType={!isLayered ? "default" : "primary"}
      >
        모달 중첩
      </Button>
    </div>
  );
}

export default LayerPart;
