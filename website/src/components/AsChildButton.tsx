import DraculaCodeBlock from "./DraculaCodeBlock";

function AsChildButton() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Element Customizing</h2>
      <DraculaCodeBlock
        width="900px"
        text={`<Modal.Close 
    asChild 
    onClick={e => console.log(e) }
>     
    <button className={your style...}>닫기</button> // custom element to replace default styled button
</Modal.Close>
// No need to manually call close() function - it's handled internally!
// This keeps your code clean and prevents you from forgetting to call close()`}
      />
      <DraculaCodeBlock
        width="900px"
        text={`<Modal.Submit
    asChild 
    onClick={e => console.log(e) }
    action={promiseFunc}
    onSuccess={(res: string) => console.log(res) }
    onError={(err: string) => console.log(err) };
>     
    <button className={your style...}>확인</button> // custom element to replace default styled button
</Modal.Close>
// No need to manually call close() function - it's handled internally!
// This keeps your code clean and prevents you from forgetting to call close()`}
      />
    </div>
  );
}

export default AsChildButton;
