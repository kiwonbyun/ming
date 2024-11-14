import { CodeBlock, dracula } from "react-code-blocks";

function DraculaCodeBlock({ text }: { text: string }) {
  return (
    <div style={{ margin: "10px 0px", width: "700px" }}>
      <CodeBlock theme={dracula} language="javascript" text={text} />
    </div>
  );
}

export default DraculaCodeBlock;
