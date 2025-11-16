// src/pages/BookSearchPage.tsx
import { useState } from "react";

import "../styles/BookSearchPage.css";
import "../styles/common.css";

import Header from "../components/Header";
import MicButton from "../components/MicButton";

const BookSearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");
  const [result, setResult] = useState<string | null>(null); // 🔹 결과 상태

  const handleSearch = () => {
    if (!query.trim()) {
      setResult(null);
      return;
    }

    setStatus("thinking");
    setResult(null);

    // 🔥 TODO: 나중에 여기서 실제 API 호출로 교체
    // 예시:
    // const res = await fetch("/api/book-search", { ... });
    // const data = await res.json();
    // setResult(data.answer);

    setTimeout(() => {
      // 지금은 임시로 프론트에서만 문장 만들어줌 (데이터 연결 전 상태)
      setResult(`"${query}" 에 대한 도서 위치 안내가 여기에 표시됩니다.`);
      setStatus("speaking");
      setTimeout(() => setStatus("idle"), 800);
    }, 800);
  };

  const handleMic = () => {
    // 나중에: 음성 인식 끝나면 setQuery(인식된텍스트); handleSearch(); 이런 식으로 확장
    setStatus((prev) => (prev === "listening" ? "idle" : "listening"));
  };

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">
        {/* 상단 타이틀 영역 */}
        <section className="search-header">
          <h1>📚 도서 찾기</h1>
          <p>찾고 싶은 도서를 입력하거나 음성으로 질문하세요.</p>
        </section>

        {/* 검색 입력 + 버튼 + 마이크 */}
        <section className="search-panel">
          <div className="search-box-card">
            <div className="search-input-row">
              <div className="search-input-wrapper">
                <span className="search-input-icon">🔍</span>
                <input
                  type="text"
                  placeholder="도서명 또는 저자를 입력하세요"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="search-text-input"
                />
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="search-button"
              >
                검색
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

          {/* 🔹 검색 결과 영역 - 결과가 있을 때만 렌더링 */}
          {result && (
            <div className="search-result-card">
              <p className="result-label">검색 결과</p>
              <p className="result-main">{result}</p>
              <p className="result-sub">
                사서에게 길 안내를 요청할 수 있어요!
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default BookSearchPage;