import DraculaCodeBlock from "../DraculaCodeBlock";

function ControlCasePart() {
  return (
    <section
      style={{
        display: "flex",
        width: "1200px",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <h2>auto control</h2>
        <DraculaCodeBlock
          text={`<Modal trigger={<button>모달 열기</button>}>
    <Modal.Content>
          {/* your code */}
          <Modal.Close>닫기</Modal.Close>
          <Modal.Submit
            onClick={() => console.log("동기적으로 호출")}
            promise={promise} // promise를 사용하지 않으면 동기적으로 동작함.
            onFulfilled={() => console.log("비동기 요청 성공시 호출")}
            onRejected={()=>console.log('비동기 요청 실패시 호출')}
          >
            확인
          </Modal.Submit>
    </Modal.Content>
</Modal>`}
          width="100%"
        />
      </div>
      <div style={{ flex: 1 }}>
        <h2>manual control</h2>
        <DraculaCodeBlock
          text={`<Modal trigger={<button>모달 열기</button>}>
        {({ controller }) => (
            <Modal.Content>
                {/* your code */}
                <button onClick={controller.close}>닫기</button>
                <button
                  onClick={() => { // async 사용시 비동기적으로 동작함.
                    controller.close();
                  }}
                >
                  확인
                </button>
            </Modal.Content>
        )}
      </Modal>`}
          width="100%"
        />
      </div>
    </section>
  );
}

export default ControlCasePart;
