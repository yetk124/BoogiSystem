// src/pages/ReturnDuePage.tsx
import React, { useState } from "react";
import "../styles/common.css";
import "../styles/BookSearchPage.css";    // 검색바 공용 스타일
import "../styles/ReturnDuePage.css";     // 반납 예정일 전용 스타일

import Header from "../components/Header";
import MicButton from "../components/MicButton";

const ReturnDuePage: React.FC = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");

  const handleSearch = async () => {
    if (!name.trim()) {
      setResult(null);
      return;
    }

    setStatus("thinking");
    setResult(null);

    // ================================
    // 🔥 TODO: 나중에 여기만 실제 API 호출로 교체
    //
    // const res = await fetch("/api/return-due", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name }),
    // });
    // const data = await res.json();
    // setResult(data.message);
    // ================================

    setTimeout(() => {
      // 임시 결과 (지금은 프론트에서만 세팅)
      setResult(`${name}님의 반납 예정일은 다음 주 수요일입니다.`);
      setStatus("speaking");
      setTimeout(() => setStatus("idle"), 800);
    }, 800);
  };

  const handleMic = () => {
    // TODO: STT 붙이면 여기서 setName(인식된이름); handleSearch(); 이런 식으로 확장
    setStatus((prev) => (prev === "listening" ? "idle" : "listening"));
  };

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">
        {/* 상단 제목 영역 */}
        <section className="due-header">
          <h1>📖 반납 예정일 조회</h1>
          <p>이름을 입력하면 대출 도서의 반납 예정일을 안내해드려요.</p>
        </section>

        {/* 검색 입력 + 버튼 + 마이크 (도서 찾기와 동일 구조) */}
        <section className="search-panel">
          <div className="search-box-card">
            <div className="search-input-row">
              <div className="search-input-wrapper">
                <span className="search-input-icon">👤</span>
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="search-text-input"
                />
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="search-button"
              >
                조회
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

          {/* ✅ 결과가 있을 때만 카드 렌더링 (CSS 구조는 그대로 유지) */}
          {result && (
            <div className="search-result-card due-result-card">
              <p className="result-label">조회 결과</p>
              <p className="result-main">{result}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ReturnDuePage;