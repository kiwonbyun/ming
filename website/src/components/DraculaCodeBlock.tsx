import { CodeBlock, dracula } from "react-code-blocks";

function DraculaCodeBlock({
  text,
  highlight,
  width = "700px",
}: {
  text: string;
  highlight?: string;
  width?: string;
}) {
  return (
    <div style={{ margin: "10px 0px", width }}>
      <CodeBlock
        theme={dracula}
        language="javascript"
        text={text}
        highlight={highlight}
      />
    </div>
  );
}

export default DraculaCodeBlock;
