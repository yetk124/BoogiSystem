// src/pages/CheckoutPage.tsx
import React, { useState } from "react";
import "../styles/common.css";          // buggi-root, main-content
import "../styles/BookSearchPage.css";  // 검색바 공용 스타일
import "../styles/CheckoutPage.css";    // 퇴실 처리 전용 스타일

import Header from "../components/Header";
import MicButton from "../components/MicButton";

/** 나중에 API 응답 형태를 위해 타입 정의 */
type CheckoutResponse = {
  message: string; // ex) "퇴실 처리를 완료했습니다"
};

/**
 * 🔹 퇴실 처리 API 래퍼
 * 지금은 setTimeout + 더미값이지만,
 * 나중에는 이 함수 안만 fetch/axios 코드로 교체하면 됨.
 */
async function requestCheckout(_query: string): Promise<CheckoutResponse> {
  // TODO: 실제 LLM/백엔드 연동 시 여기 교체
  // const res = await fetch("/api/studyroom/checkout", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ query: _query }),
  // });
  // const data = await res.json();
  // return { message: data.message };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "퇴실 처리를 완료했습니다." });
    }, 700);
  });
}

const CheckoutPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");
  const [result, setResult] = useState<CheckoutResponse | null>(null);

  /** 🟦 퇴실 요청 버튼 */
  const handleCheckout = async () => {
    if (!query.trim()) return;

    setStatus("thinking");
    setResult(null);

    try {
      const data = await requestCheckout(query);
      setResult(data);

      setStatus("speaking");
      setTimeout(() => setStatus("idle"), 700);
    } catch (e) {
      console.error(e);
      setResult({
        message: "퇴실 처리를 진행하지 못했습니다. 잠시 후 다시 시도해주세요.",
      });
      setStatus("idle");
    }
  };

  /** 🎙 Mic 버튼 (나중에 STT 붙이면 여기서 query 채우고 handleCheckout 호출) */
  const handleMic = () => {
    setStatus((prev) => (prev === "listening" ? "idle" : "listening"));

    // TODO: STT 완성되면:
    // setQuery(sttText);
    // await handleCheckout();
  };

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">
        {/* 상단 제목 영역 */}
        <section className="checkout-header">
          <h1>🚪 퇴실 처리</h1>
          <p>집중열람실 이용 후, 간편하게 퇴실을 요청해 주세요.</p>
        </section>

        {/* 검색 입력 + 버튼 + 마이크 (다른 페이지와 동일 패턴) */}
        <section className="search-panel">
          <div className="search-box-card">
            <div className="search-input-row">
              <div className="search-input-wrapper">
                <span className="search-input-icon">🚪</span>
                <input
                  type="text"
                  placeholder='예: "퇴실 처리해줘"'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="search-text-input"
                />
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="search-button"
              >
                퇴실 요청
              </button>

              <div className="mic-wrapper">
                <MicButton
                  status={status}
                  onClick={handleMic}
                  label="음성 입력"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ✅ 결과가 생겼을 때만 퇴실 완료 카드 표시 */}
        {result && (
          <section className="checkout-result-section">
            <div className="checkout-card">
              <div className="checkout-icon-wrapper">
                <div className="checkout-icon-circle">
                  <span className="checkout-icon">✓</span>
                </div>
              </div>

              <h2 className="checkout-main-text">{result.message}</h2>
              <p className="checkout-sub-text">
                이용해 주셔서 감사합니다. 오늘도 안전한 귀가 되세요.
              </p>

              <button
                type="button"
                className="checkout-ok-button"
                onClick={() => setResult(null)}
              >
                확인
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default CheckoutPage;