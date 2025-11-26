// src/pages/CheckoutPage.tsx
import React, { useState } from "react";
import "../styles/common.css";
import "../styles/BookSearchPage.css";
import "../styles/CheckoutPage.css";

import Header from "../components/Header";
import MicButton from "../components/MicButton";

type CheckoutResponse = { message: string };

async function requestCheckout(_query: string): Promise<CheckoutResponse> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ message: "퇴실 처리가 완료되었습니다." }), 1000);
  });
}

const CheckoutPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<CheckoutResponse | null>(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(""); // ❗ 등록 회원이 아닌 경우 메시지 저장

  // 등록된 회원 리스트
  const allowedMembers = ["박정자", "고길동", "도우너"];

  const handleCheckout = async () => {
    if (!query.trim()) return;

    // ❗ 입력값이 등록된 회원인지 검사
    if (!allowedMembers.includes(query.trim())) {
      setError("등록된 회원이 아닙니다.");
      setResult(null);
      setDone(false);
      return;
    }

    // 정상 사용자 → 퇴실 처리 진행
    setError("");
    const data = await requestCheckout(query);
    setResult(data);
    setDone(true);

    // 🔵 2초 후 홈으로 이동
    setTimeout(() => {
      window.location.href = "/home";
    }, 2000);
  };

  return (
    <div className="buggi-root checkout-page">
      <Header />

      <main className="main-content">
        
        {/* 상단 제목 */}
        <section className="checkout-header">
          <h1>🚪 퇴실 처리</h1>
          <p>집중열람실 이용 후, 간편하게 퇴실을 요청해 주세요.</p>
        </section>

        {/* 입력 UI */}
        <section className="search-panel">
          <div className="search-box-card">
            <div className="search-input-row checkout-row">

              <div className="search-input-wrapper checkout-input-expand">
                <span className="search-input-icon">👤</span>
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="search-text-input"
                />
              </div>

              <div className="mic-wrapper mic-hide-on-checkout">{/* <MicButton /> */}</div>

              <button
                type="button"
                className="search-button checkout-submit-btn"
                onClick={handleCheckout}
              >
                퇴실 요청
              </button>
            </div>
          </div>
        </section>

        {/* ❗ 등록되지 않은 회원 에러 메시지 */}
        {error && (
          <section className="checkout-inline-result">
            <div className="checkout-inline-box">
              <div className="inline-check">⚠</div>
              <p className="inline-main">{error}</p>
              <p className="inline-sub">이름을 다시 확인해 주세요.</p>
            </div>
          </section>
        )}

        {/* 퇴실 처리 완료 UI */}
        {done && result && (
          <section className="checkout-inline-result">
            <div className="checkout-inline-box">
              <div className="inline-check">✓</div>
              <p className="inline-main">{result.message}</p>
              <p className="inline-sub">잠시 후 홈으로 이동합니다…</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default CheckoutPage;
