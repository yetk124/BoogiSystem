//(8) 캡스버스터콜 -  boogi7
// src/pages/SecurityAlertPage.tsx
// (축약된 버전) 캡스 호출 키오스크형 페이지

import React, { useState } from "react";
import "../styles/common.css";
import "../styles/SecurityPage.css";

import Header from "../components/Header";

type SecurityPhase = "idle" | "confirm" | "alerting" | "done";

const SecurityPage: React.FC = () => {
  const [uiPhase, setUiPhase] = useState<SecurityPhase>("idle");
  const [result, setResult] = useState<string>("");

  const handleAlertClick = () => {
    setUiPhase("confirm");
  };

  const handleConfirm = async () => {
    setUiPhase("alerting");
    setTimeout(() => {
      setResult("CAPS 보안팀 호출이 완료되었습니다.");
      setUiPhase("done");
    }, 5500);
  };

  const handleCancel = () => {
    setUiPhase("idle");
  };

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">

        {/* 상단 제목 */}
        <section className="security-header">
          <h1>CAPS 보안 호출</h1>
          <p>긴급 상황 시 CAPS 보안팀을 즉시 호출합니다.</p>
        </section>

        {/* 메인 카드 */}
        <section className="security-result-section">
          <div className="security-card kiosk">

            <h2 className="security-main-text">
              {uiPhase === "confirm"
                ? "정말 CAPS 보안팀을 호출할까요?"
                : uiPhase === "alerting"
                ? "호출 중입니다..."
                : uiPhase === "done"
                ? result
                : "긴급 상황인지 다시 한 번 확인해 주세요"}
            </h2>

            <p className="security-sub-text">
              {uiPhase === "confirm"
                ? "잘못된 호출을 방지하기 위해 확인 단계를 거칩니다."
                : uiPhase === "alerting"
                ? "잠시만 기다려 주세요."
                : uiPhase === "done"
                ? "보안 요원이 곧 도착합니다."
                : "실제 긴급 상황이 맞는지 점검해 주세요."}
            </p>

            <div className="security-actions">

              {uiPhase === "idle" && (
                <button className="security-btn danger-big" onClick={handleAlertClick}>
                  CAPS 긴급 호출
                </button>
              )}

              {uiPhase === "confirm" && (
                <>
                  <button className="security-btn cancel" onClick={handleCancel}>
                    취소
                  </button>
                  <button className="security-btn danger-big" onClick={handleConfirm}>
                    CAPS 호출하기
                  </button>
                </>
              )}

              {uiPhase === "done" && (
                <button
                  className="security-btn neutral"
                  onClick={() => setUiPhase("idle")}
                >
                  처음으로
                </button>
              )}

            </div>
          </div>
        </section>
        <section className="security-extra-info">
          <p>⚠️ 주변에 위험 상황이 있다면 가까운 직원에게도 알려주세요.</p>
        </section>
      {uiPhase === "alerting" && (
        <section className="boogi-walk-section">
          <img src="/src/img/한성부기.png" className="boogi-walk" />
        </section>
      )}

      </main>
    </div>
  );
};

export default SecurityPage;
