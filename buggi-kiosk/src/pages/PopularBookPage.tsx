// src/pages/PopularBooksPage.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

import React, { useEffect, useState } from "react";
import "../styles/common.css";
import "../styles/PopularBookPage.css";
import "../styles/BookSearchPage.css";

import Header from "../components/Header";

type PopularBook = {
  id: number;
  title: string;
  author: string;
  location: string;
  call_number: string;
  imageUrl?: string; // 🔥 프론트에서 이미지 가져오기
};

const PopularBooksPage: React.FC = () => {
  const [popularBooks, setPopularBooks] = useState<PopularBook[]>([]);
  const [hasResult, setHasResult] = useState(false);

  // 🔵 위치 모달
  const [locationModal, setLocationModal] = useState<string | null>(null);

  // 🔵 자세히 보기 모달
  const [detailModal, setDetailModal] = useState<PopularBook | null>(null);

  // 🔥 페이지 로드시 자동으로 인기 도서 불러오기
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/popular/list");
        const data = await res.json();

        // 이미지 프론트에서 매핑
        const mapped = data.map((book: PopularBook, index: number) => ({
          ...book,
          imageUrl: `/src/img/book${index + 1}.png`,
        }));

        setPopularBooks(mapped);
        setHasResult(true);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPopular();
  }, []);

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">

        {/* 제목 */}
        <section className="popular-header">
          <h1>🏆 이번 달 인기 도서 TOP3</h1>
          <p>독자들이 많이 찾은 인기 도서입니다.</p>
        </section>

        {/* 🔥 Swiper */}
        {hasResult && (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={40}
            slidesPerView={1}
            className="popular-swiper"
          >
            {popularBooks.map((book, index) => (
              <SwiperSlide key={book.id}>
                <article className="popular-card fancy-card">

                  {/* 도서 표지 */}
                  <div className="book-cover-wrapper">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="book-cover"
                    />
                    <div className="rank-badge">TOP {index + 1}</div>
                  </div>

                  {/* 텍스트 정보 */}
                  <h2 className="popular-title">{book.title}</h2>
                  <p className="popular-author">저자 {book.author}</p>

                  {/* 버튼 영역 */}
                  <div className="popular-actions">
                    <button
                      className="btn-outline"
                      onClick={() => setLocationModal(book.location)}
                    >
                      위치 보기
                    </button>

                    <button
                      className="btn-primary"
                      onClick={() => setDetailModal(book)}
                    >
                      자세히 보기
                    </button>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* 🔵 위치 보기 모달 */}
        {locationModal && (
          <div className="modal-bg" onClick={() => setLocationModal(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">📍 도서 위치</h2>
              <p className="modal-content">{locationModal}</p>
              <button className="modal-close" onClick={() => setLocationModal(null)}>
                닫기
              </button>
            </div>
          </div>
        )}

        {/* 🔵 자세히 보기 모달 */}
        {detailModal && (
          <div className="modal-bg" onClick={() => setDetailModal(null)}>
            <div className="modal-box detail-modal" onClick={(e) => e.stopPropagation()}>
              <img
                src={detailModal.imageUrl}
                className="detail-img"
                alt={detailModal.title}
              />

              <h2 className="modal-title">{detailModal.title}</h2>
              <p className="modal-info"><strong>저자:</strong> {detailModal.author}</p>
              <p className="modal-info"><strong>위치:</strong> {detailModal.location}</p>
              <p className="modal-info"><strong>청구기호:</strong> {detailModal.call_number}</p>

              <button className="modal-close" onClick={() => setDetailModal(null)}>
                닫기
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default PopularBooksPage;
