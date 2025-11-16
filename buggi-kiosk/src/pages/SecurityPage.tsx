//(8) 캡스버스터콜 -  boogi7
// src/pages/SecurityAlertPage.tsx

import React, { useState } from "react";
import "../styles/common.css";
import "../styles/BookSearchPage.css";      // 검색바 공용 스타일
import "../styles/SecurityPage.css";   // 보안 호출 전용 스타일

import Header from "../components/Header";
import MicButton from "../components/MicButton";

type SecurityPhase = "idle" | "confirm" | "alerting" | "done";

type SecurityResponse = {
  message: string;   // 예: "캡스 호출이 완료되었습니다"
};

/**
 * 🔥 임시 API 래퍼
 * 나중에 백엔드 boogi_security_alert_service 연결할 때
 * 이 함수만 fetch/axios로 교체하면 됨.
 */
async function requestSecurityAlert(_query: string): Promise<SecurityResponse> {
  // TODO: 실제 백엔드 연동 버전 (예시)
  // const res = await fetch("/api/boogi/security-alert", { ... });
  // const data = await res.json();
  // return { message: data.message };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "캡스 호출이 완료되었습니다." });
    }, 800);
  });
}

const SecurityPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [uiPhase, setUiPhase] = useState<SecurityPhase>("idle");
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");
  const [result, setResult] = useState<SecurityResponse | null>(null);

  /** 🟥 1단계: “보안 호출” 버튼 누르면 → 확인 단계로 진입 */
  const handleAlertClick = () => {
    if (!query.trim()) return;
    setUiPhase("confirm");
    setResult(null);
  };

  /** 🟥 2단계: 확인 후, 실제 호출 */
  const handleConfirm = async () => {
    setUiPhase("alerting");
    setStatus("thinking");
    setResult(null);

    try {
      const data = await requestSecurityAlert(query);
      setResult(data);
      setStatus("speaking");

      setTimeout(() => {
        setStatus("idle");
        setUiPhase("done");
      }, 800);
    } catch (e) {
      console.error(e);
      setResult({
        message: "호출 처리 중 오류가 발생했습니다. 다시 시도해 주세요.",
      });
      setStatus("idle");
      setUiPhase("done");
    }
  };

  /** 취소 버튼 (확인 단계에서 뒤로) */
  const handleCancel = () => {
    setUiPhase("idle");
    setResult(null);
  };

  /** 마이크 버튼 (나중에 STT 붙일 자리) */
  const handleMic = () => {
    setStatus((prev) => (prev === "listening" ? "idle" : "listening"));
    // TODO: STT 완료 시:
    // setQuery(sttResult);
    // setUiPhase("confirm"); or handleAlertClick();
  };

  /** 상태에 따라 아이콘 변경 */
  const getIcon = () => {
    if (uiPhase === "alerting") return "🚨";
    if (uiPhase === "confirm") return "⚠️";
    if (uiPhase === "done" && result) return "✅";
    return "🛡️";
  };

  /** 상태에 따라 메인 문구 변경 */
  const getMainText = () => {
    if (uiPhase === "confirm") return "정말 CAPS 보안팀을 호출할까요?";
    if (uiPhase === "alerting") return "보안팀을 호출하는 중입니다...";
    if (uiPhase === "done" && result) return result.message;
    return "긴급 상황인지 한 번 더 확인 후 호출해 주세요.";
  };

  /** 상태에 따라 서브 문구 변경 */
  const getSubText = () => {
    if (uiPhase === "confirm") {
      return "오조작을 방지하기 위해 호출 전 확인 단계를 거칩니다.";
    }
    if (uiPhase === "alerting") {
      return "잠시만 기다려 주세요. CAPS 보안 요원에게 신호를 전송 중입니다.";
    }
    if (uiPhase === "done" && result) {
      return "자리에서 안전하게 기다려 주세요. 필요 시 주변 이용자에게도 알려 주세요.";
    }
    return "캡스 호출이 실제로 필요한 상황인지 다시 한 번 점검해 주세요.";
  };

  /** 카드 활성 상태 여부 (빨간 테두리 + 펄스 효과) */
  const isActive = uiPhase === "alerting" || (uiPhase === "done" && !!result);

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">
        {/* 상단 제목 영역 */}
        <section className="security-header">
          <h1>🚨 보안 호출 (CAPS)</h1>
          <p>긴급 상황 시 CAPS 보안팀을 즉시 호출합니다.</p>
        </section>

        {/* 음성/텍스트 입력 줄 */}
        <section className="search-panel">
          <div className="search-box-card">
            <div className="search-input-row">
              <div className="search-input-wrapper">
                <span className="search-input-icon">🛡️</span>
                <input
                  type="text"
                  placeholder='예: "캡스 불러줘"'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="search-text-input"
                />
              </div>

              <button
                type="button"
                onClick={handleAlertClick}
                className="search-button security-call-button"
              >
                보안 호출
              </button>

              <div className="mic-wrapper">
                <MicButton status={status} onClick={handleMic} label="음성 입력" />
              </div>
            </div>
          </div>
        </section>

        {/* 보안 호출 상태 카드 */}
        <section className="security-result-section">
          <div className={`security-card ${isActive ? "security-card-active" : ""}`}>
            <div className="security-icon-wrapper">
              <div className="security-icon-circle">
                <span className="security-icon">{getIcon()}</span>
              </div>
            </div>

            <h2 className="security-main-text">{getMainText()}</h2>
            <p className="security-sub-text">{getSubText()}</p>

            <div className="security-actions">
              {(uiPhase === "confirm" || uiPhase === "alerting") && (
                <>
                  <button
                    type="button"
                    className="security-btn cancel"
                    onClick={handleCancel}
                    disabled={uiPhase === "alerting"}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="security-btn danger"
                    onClick={handleConfirm}
                    disabled={uiPhase === "alerting"}
                  >
                    CAPS 호출하기
                  </button>
                </>
              )}

              {uiPhase === "done" && (
                <button
                  type="button"
                  className="security-btn neutral"
                  onClick={() => {
                    setUiPhase("idle");
                    setResult(null);
                    setQuery("");
                  }}
                >
                  처음으로
                </button>
              )}

              {uiPhase === "idle" && (
                <button
                  type="button"
                  className="security-btn danger"
                  onClick={handleAlertClick}
                  disabled={!query.trim()}
                >
                  보안 호출 준비
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SecurityPage;