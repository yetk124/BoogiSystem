// src/pages/PopularBooksPage.tsx
import React, { useState } from "react";
import "../styles/common.css";
import "../styles/PopularBookPage.css";
import "../styles/BookSearchPage.css";

import Header from "../components/Header";
import MicButton from "../components/MicButton";

// 🔹 Swiper import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type PopularBook = {
  rank: number;
  title: string;
  author: string;
};

// 🔸 임시 데이터 (나중에 API로 대체)
const popularBooks: PopularBook[] = [
  { rank: 1, title: "불편한 편의점 3", author: "김호연" },
  { rank: 2, title: "아주 희미한 빛으로도", author: "정세랑" },
  { rank: 3, title: "모든 빛을 우리가 만날 때", author: "앤서니 도어" },
];

const PopularBooksPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");

  const [hasResult, setHasResult] = useState(false); // 🔥 Swiper 보일지 여부

  const handleSearch = async () => {
    if (!query.trim()) return;

    setStatus("thinking");
    setHasResult(false);

    // ================================
    //  🔥 TODO: 인기 도서 검색 API 연결
    //  나중에 이 부분만 변경하면 모든 UI 자동 반영됨
    //
    //  const res = await fetch("/api/popular-books?query=" + query);
    //  const data = await res.json();
    //  setPopularBooks(data.books);
    //  setHasResult(true);
    // ================================

    setTimeout(() => {
      setHasResult(true); // 임시로 결과 보여줌
      setStatus("speaking");

      setTimeout(() => setStatus("idle"), 1000);
    }, 1000);
  };

  const handleMic = () => {
    // 🔥 TODO: 음성 인식 → query 자동 입력 → handleSearch() 자동 실행
    setStatus((prev) => (prev === "listening" ? "idle" : "listening"));

    // 예: STT 결과 들어오면
    // setQuery(sttText);
    // handleSearch();
  };

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">
        {/* 제목 */}
        <section className="popular-header">
          <h1>🏆 이번 달 인기 도서 TOP3</h1>
          <p>독자들이 많이 찾은 도서를 확인해보세요.</p>
        </section>

        {/* 검색 입력 + 버튼 + 마이크 */}
        <section className="search-panel popular-search-panel">
          <div className="search-box-card">
            <div className="search-input-row">
              <div className="search-input-wrapper">
                <span className="search-input-icon">🔍</span>
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
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
        </section>

        {/* 🔥 Swiper (결과 있을 때만 표시) */}
        {hasResult && (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={40}
            slidesPerView={1}
            className="popular-swiper"
          >
            {popularBooks.map((book) => (
              <SwiperSlide key={book.rank}>
                <article className="popular-card">
                  <div className="popular-rank">#{book.rank}</div>
                  <h2 className="popular-title">{book.title}</h2>
                  <p className="popular-author">저자 {book.author}</p>

                  <div className="popular-actions">
                    <button className="btn-outline">위치 보기</button>
                    <button className="btn-primary">자세히 보기</button>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </main>
    </div>
  );
};

export default PopularBooksPage;