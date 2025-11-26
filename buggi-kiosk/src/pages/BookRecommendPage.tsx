// src/pages/BookRecommendPage.tsx
import React, { useState } from "react";

import "../styles/common.css";            // buggi-root, main layout
import "../styles/BookSearchPage.css";    // 검색창 공용 스타일
import "../styles/BookRecommendPage.css"; // 추천 페이지 전용 스타일

import Header from "../components/Header";
import MicButton from "../components/MicButton";

const BookRecommendPage: React.FC = () => {
  const [query, setQuery] = useState("");      // 사용자가 입력한 문장
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");
  const [result, setResult] = useState<any | null>(null); // 결과 (나중에 API 연결)

  const handleSearch = () => {
    if (!query.trim()) {
      setResult(null);
      return;
    }

    setStatus("thinking");
    setResult(null);

    // 🔥 TODO: 후에 여기서 API 호출
    // fetch("/api/recommend", { method:"POST", body: JSON.stringify({ query }) })

    setTimeout(() => {
      // 임시로 아무 결과도 넣지 않음 (API 연결 전)
      setResult({
        title: "추천 도서 제목(임시)",
        author: "저자명",
        message: "AI 추천 메시지가 여기에 표시됩니다.",
      });

      setStatus("speaking");
      setTimeout(() => setStatus("idle"), 700);
    }, 700);
  };

  const handleMic = () => {
    // 추후: 음성 인식 결과 → setQuery() 넣기
    setStatus((prev) => (prev === "listening" ? "idle" : "listening"));
  };

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">
        {/* 상단 안내 */}
        <section className="recommend-header">
          <h1>📚 감정 기반 도서 추천</h1>
          <p>지금의 감정을 말하거나 입력하면, AI가 어울리는 책을 추천해드려요.</p>
        </section>

        {/* 입력 + 버튼 + 마이크 */}
        <section className="search-panel recommend-search-panel">
          <div className="search-box-card">

            <div className="recommend-button-row">
              <div className="mood-button-wrapper">
                <button type="button" onClick={handleSearch} className="mood-button">
                  # 위로
                </button>
                <button type="button" onClick={handleSearch} className="mood-button">
                  # 동기부여
                </button>
                <button type="button" onClick={handleSearch} className="mood-button">
                  # 휴식
                </button>

              </div>


              <div className="mic-wrapper">
                <MicButton status={status} onClick={handleMic} label="음성 입력"/>
              </div>

            </div>

            </div>
        </section>

        {/* 결과가 있을 때만 표시 */}
        {result && (
            <section className="recommend-result-section">
            <div className="recommend-result-card">
              <h2 className="result-title">{result.title}</h2>
              <p className="result-author">저자: {result.author}</p>
              <p className="result-message">{result.message}</p>
            </div>
          </section>
        )}

        {/* 결과가 없을 때는 아무것도 안보임 */}
      </main>
    </div>
  );
};

export default BookRecommendPage;