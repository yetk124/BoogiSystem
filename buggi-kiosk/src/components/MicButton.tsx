import React from "react";

type MicStatus = "idle" | "listening" | "thinking" | "speaking";

type MicButtonProps = {
  status: MicStatus;
  onClick: () => void;
  label?: string; // 접근성용, 화면에는 안 보이게 쓸 거야
};

const MicButton: React.FC<MicButtonProps> = ({ status, onClick, label }) => {
  const getIconClass = () => {
    switch (status) {
      case "listening":
        // 인식 중: 회전 동그라미
        return "fas fa-circle-notch fa-spin";
      case "thinking":
        // 생각 중: 이것도 스피너로
        return "fas fa-circle-notch fa-spin";
      case "speaking":
        // AI 응답 중: 스피커
        return "fas fa-volume-up";
      case "idle":
      default:
        // 기본: 마이크
        return "fas fa-microphone";
    }
  };

  return (
    <button
      type="button"
      className="mic-button"
      onClick={onClick}
      aria-label={label ?? "음성 입력"}
    >
      <i className={getIconClass()} />
    </button>
  );
};

export default MicButton;