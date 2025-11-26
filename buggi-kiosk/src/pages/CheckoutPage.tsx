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
    setTimeout(() => resolve({ message: "퇴실 처리가 완료되었습니다." }), 700);
  });
}

const CheckoutPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<CheckoutResponse | null>(null);
  const [done, setDone] = useState(false); // 입력 UI 유지용

  const handleCheckout = async () => {
    if (!query.trim()) return;

    const data = await requestCheckout(query);
    setResult(data);

    // 입력칸은 유지하면서 아래에 결과만 뜸
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

        {/* 입력 UI (결과가 떠도 사라지지 않음) */}
        <section className="search-panel">
          <div className="search-box-card">
            <div className="search-input-row checkout-row">
              
              {/* 입력칸 확장 */}
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

              {/* 마이크는 숨기기만 하기 */}
              <div className="mic-wrapper mic-hide-on-checkout">
                {/* <MicButton /> */}
              </div>

              {/* 제출 버튼 */}
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

        {/* 결과 박스는 입력칸 아래에 표시 */}
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
