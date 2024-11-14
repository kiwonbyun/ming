import { CodeBlock, dracula } from "react-code-blocks";

function DraculaCodeBlock({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  return (
    <div style={{ margin: "10px 0px", width: "700px" }}>
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
