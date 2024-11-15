import { Dispatch, SetStateAction } from "react";
import Button from "../Button";

interface TitlePartProps {
  hasTitle: boolean;
  setHasTitle: Dispatch<SetStateAction<boolean>>;
}

function TitlePart({ hasTitle, setHasTitle }: TitlePartProps) {
  return (
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
  );
}

export default TitlePart;
