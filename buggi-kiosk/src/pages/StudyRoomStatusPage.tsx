// src/pages/StudyRoomStatusPage.tsx
import React, { useState } from "react";
import "../styles/common.css";
import "../styles/BookSearchPage.css";
import "../styles/StudyRoomStatusPage.css";

import Header from "../components/Header";
import MicButton from "../components/MicButton";

/** 나중에 API 응답 형태(예상)를 타입으로 정의 */
type StudyRoomStatus = {
  capacity: number;       // 전체 좌석 수
  occupied: number;       // 사용 중 좌석 수
  message: string;        // LLM/서버에서 내려주는 문장
};

/** 
 * 🔹 좌석 현황 호출용 헬퍼 함수
 * 지금은 setTimeout + 더미데이터지만,
 * 나중에 여기만 fetch/axios 코드로 교체하면 됨.
 */
async function fetchStudyRoomStatus(_query: string): Promise<StudyRoomStatus> {
  // TODO: 실제 API 연동 시 아래를 교체
  // const res = await fetch("/api/studyroom/status", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ query: _query }),
  // });
  // const data = await res.json();
  // return {
  //   capacity: data.capacity,
  //   occupied: data.occupied,
  //   message: data.message,
  // };

  // ---- 임시 Mock ----
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        capacity: 80,
        occupied: 59,
        message: "현재 집중열람실 잔여좌석은 21석입니다",
      });
    }, 800);
  });
}

const StudyRoomStatusPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");

  const [apiData, setApiData] = useState<StudyRoomStatus | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const capacity = apiData?.capacity ?? null;
  const occupied = apiData?.occupied ?? null;
  const remaining =
    capacity !== null && occupied !== null ? capacity - occupied : null;
  const fillPercent =
    capacity !== null && occupied !== null
      ? Math.round((occupied / capacity) * 100)
      : 0;

  /** 🔍 조회 버튼 클릭 */
  const handleSearch = async () => {
    if (!query.trim()) return;

    setStatus("thinking");
    setResultMessage(null);
    setApiData(null);

    try {
      const data = await fetchStudyRoomStatus(query); // 👈 나중에 실제 API 호출
      setApiData(data);
      setResultMessage(data.message);

      setStatus("speaking");
      setTimeout(() => setStatus("idle"), 700);
    } catch (err) {
      console.error(err);
      setResultMessage("좌석 정보를 가져오지 못했습니다. 잠시 후 다시 시도해주세요.");
      setStatus("idle");
    }
  };

  /** 🎙 음성 입력 버튼 */
  const handleMic = () => {
    setStatus((prev) => (prev === "listening" ? "idle" : "listening"));

    // TODO: STT 완성 시
    // 1) 음성 → 텍스트 변환 후 setQuery(sttText)
    // 2) handleSearch() 호출해서 같은 흐름 타게 하면 됨.
  };

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">
        {/* 상단 제목 */}
        <section className="study-header">
          <h1>🪑 집중열람실 좌석 현황</h1>
          <p>실시간 좌석 상황을 확인하세요.</p>
        </section>

        {/* 검색바 (다른 페이지와 공통 패턴) */}
        <section className="search-panel">
          <div className="search-box-card">
            <div className="search-input-row">
              <div className="search-input-wrapper">
                <span className="search-input-icon">🪑</span>
                <input
                  type="text"
                  placeholder="예: 집중 열람실 자리 얼마나 남았어?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
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
        </section>

        {/* 결과가 있을 때만 카드 표시 */}
        {resultMessage && apiData && remaining !== null && (
          <section className="study-result-section">
            {/* 잔여 좌석 카드 */}
            <div className="remain-card">
              <p className="remain-label">현재 잔여좌석</p>
              <p className="remain-number">{remaining}석</p>
              <p className="remain-sub">
                전체 {apiData.capacity}석 · 사용 {apiData.occupied}석
              </p>
            </div>

            {/* 원형 차트 카드 */}
            <div className="circle-card">
              <svg className="circle-svg" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="#E2E8F0"
                  strokeWidth="20"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="#007BFF"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 85}`}
                  strokeDashoffset={`${
                    (1 - fillPercent / 100) * 2 * Math.PI * 85
                  }`}
                  transform="rotate(-90 100 100)"
                />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="circle-text"
                >
                  {fillPercent}%
                </text>
              </svg>

              <p className="circle-under-title">좌석 사용률</p>
              <p className="circle-under-percent">{fillPercent}%</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default StudyRoomStatusPage;
