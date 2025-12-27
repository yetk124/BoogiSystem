// src/pages/BookSearchPage.tsx
import { useState } from "react";

import "../styles/BookSearchPage.css";
import "../styles/ReturnDuePage.css"
import "../styles/common.css";

import Header from "../components/Header";
import MicButton from "../components/MicButton";

const BookSearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");

  const [result, setResult] = useState<string | null>(null);
  const [bookData, setBookData] = useState<{
    title: string;
    location: string;
    call_number: string;
  } | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResult(null);
      setBookData(null);
      return;
    }

    setStatus("thinking");
    setResult(null);
    setBookData(null);

    try {
      const res = await fetch(
        `http://localhost:8080/api/books/search?keyword=${encodeURIComponent(query)}`
      );

      if (!res.ok) throw new Error("서버 오류");

      const data = await res.json();

      if (data.length === 0) {
        setResult("NO_RESULT");
        setBookData(null);
      } else {
        const first = data[0];
        setResult("FOUND");
        setBookData({
          title: first.title,
          location: first.location,
          call_number: first.call_number,
        });
      }

      setStatus("speaking");
      setTimeout(() => setStatus("idle"), 800);

    } catch (error) {
      console.error(error);
      setResult("ERROR");
      setBookData(null);
      setStatus("idle");
    }
  };

  const handleMic = () => {
    setStatus((prev) => (prev === "listening" ? "idle" : "listening"));
  };

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">
        {/* 상단 타이틀 */}
        <section className="search-header">
          <h1>📚 도서 찾기</h1>
          <p>찾고 싶은 도서를 입력하거나 음성으로 질문하세요.</p>
        </section>

        {/* 입력 영역 */}
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

              <button type="button" onClick={handleSearch} className="search-button">
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

          {/* ▼▼ 검색 결과 ▼▼ */}
          {result && (
            <div className="search-result-card">
              <p className="result-label">검색 결과</p>

              {/* 🔴 결과 없음 */}
              {result === "NO_RESULT" && (
              <div className="no-result-panel">
                
                {/* 🔵 도서관 캐릭터 아이콘 (부기) */}
                <img
                  src="/src/img/눈물부기.png"
                  alt="no-result mascot"
                  className="no-result-icon-img"
                />

                <p className="no-result-title">관련 도서를 찾을 수 없습니다</p>

                <p className="no-result-sub">
                  입력하신 검색어와 일치하는 자료가 없습니다.
                </p>

                <p className="no-result-hint">
                  • 철자가 정확한지 다시 확인해 주세요.<br/>
                  • 다른 검색어나 키워드도 시도해 보세요!
                </p>
              </div>
            )}

              {/* 🔥 서버 오류 */}
              {result === "ERROR" && (
                <div className="no-result-box">
                  <p className="no-result-title">검색 중 오류가 발생했습니다.</p>
                  <p className="no-result-sub">잠시 후 다시 시도해 주세요.</p>
                </div>
              )}

              {/* 🔵 정상 데이터 출력 */}
              {result === "FOUND" && bookData && (
                <div className="search-item">
                  <div className="item-row">
                    <p className="result-item-label">제목</p>
                    <p className="item-conent">{bookData.title}</p>
                  </div>

                  <div className="item-row">
                    <p className="result-item-label">위치</p>
                    <p className="item-conent">
                      {bookData.location.replace(/\n/g, "")}
                    </p>
                  </div>

                  <div className="item-row">
                    <p className="result-item-label">청구기호</p>
                    <p className="item-conent">{bookData.call_number}</p>
                  </div>
                </div>
              )}

              {result === "FOUND" && (
                <p className="result-sub">사서에게 길 안내를 요청할 수 있어요!</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default BookSearchPage;
