import { toast } from "@wemeet-overlay/toast";

function ToastTester() {
  const openToast = () => {
    toast("정상적으로 처리되었습니다.");
  };
  const openSuccess = () => {
    toast.success("성공!", { description: "게시물이 생성되었습니다." });
  };
  const openError = () => {
    toast.error("실패!", { description: "입력값을 확인해주세요." });
  };
  const openWarning = () => {
    toast.warning("경고!", {
      description: "사용자에게 노출될 수 있습니다. 1초만에 사라집니다",
      duration: 1000,
    });
  };
  const openInfo = () => {
    toast.info("알림!", {
      description:
        "해당 항목은 필수값입니다. 만약 텍스트가 매우매우 길어지는 경우에는 이렇게 보입니다. 최대 길이에 대한 설정이 필요해 보입니다.아아아아아아아아아아아아아아아아아아아아아아아아아아아아",
    });
  };

  return (
    <div>
      <button onClick={openToast}>토스트 발생</button>
      <button onClick={openSuccess}>success토스트 발생</button>
      <button onClick={openError}>error토스트 발생</button>
      <button onClick={openWarning}>warning토스트 발생</button>
      <button onClick={openInfo}>info토스트 발생</button>
    </div>
  );
}

export default ToastTester;
