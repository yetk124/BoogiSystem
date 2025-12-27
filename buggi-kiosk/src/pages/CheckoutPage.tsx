// src/pages/CheckoutPage.tsx
import React, { useEffect, useState } from "react";
import "../styles/common.css";
import "../styles/CheckoutPage.css";

import Header from "../components/Header";

async function requestCheckout(): Promise<{ message: string }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ message: "퇴실 처리가 완료되었습니다." }), 3000);
  });
}

const CheckoutPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<{ message: string } | null>(null);

  // 페이지 들어오면 자동으로 처리 시작
  useEffect(() => {
    const startProcess = async () => {
      const data = await requestCheckout();
      setResult(data);
      setLoading(false);
      setDone(true);

      // 완료 후 2초 뒤 홈으로 이동
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    };

    startProcess();
  }, []);

  return (
    <div className="buggi-root checkout-page">
      <Header />

      <main className="main-content">

        {/* 상단 안내 */}
        <section className="checkout-header">
          <h1>🚪 퇴실 처리 중…</h1>
          <p>잠시만 기다려 주세요.</p>
        </section>

        {/* ⏳ 로딩 화면 */}
        {loading && (
          <section className="checkout-inline-result">
            <div className="checkout-inline-box">
              <div className="loading-book" />
              <p className="loading-text">퇴실 요청을 처리하고 있어요…</p>
              <p className="auto-move-text">약 3초 정도 소요됩니다.</p>
            </div>
          </section>
        )}

        {/* ✓ 완료 화면 */}
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
