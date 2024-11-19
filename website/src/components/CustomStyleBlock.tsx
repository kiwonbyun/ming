import DraculaCodeBlock from "./DraculaCodeBlock";

function CustomStyleBlock() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Custom Style</h2>
      <DraculaCodeBlock
        text={`// Global Style
body {
--ming-toast-font-family: inherit; 
--ming-toast-message-font-size: 14px; // toast 메인 텍스트 크기
--ming-toast-message-font-weight: 500; // toast 메인 텍스트 두께
--ming-toast-description-font-size: 12px; // toast 서브 텍스트 크기
--ming-toast-description-font-weight: 400; // toast 서브 텍스트 두께

--ming-modal-font-family: inherit; 
--ming-modal-content-padding: 16px; // Modal.Content 컴포넌트 내부 padding
--ming-dim-color: rgba(0, 0, 0, 0.5); // modal dim 색상
}`}
      />
    </div>
  );
}

export default CustomStyleBlock;
