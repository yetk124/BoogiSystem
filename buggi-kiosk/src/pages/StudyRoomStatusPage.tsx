// src/pages/StudyRoomStatusPage.tsx
import React, { useEffect, useState } from "react";
import "../styles/common.css";
import "../styles/StudyRoomStatusPage.css";

import Header from "../components/Header";

type StudyRoomStatus = {
  capacity: number;
  occupied: number;
  message: string;
};

async function fetchStudyRoomStatus(): Promise<StudyRoomStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        capacity: 80,
        occupied: 59,
        message: "현재 집중열람실 잔여 좌석은 21석입니다.",
      });
    }, 900);
  });
}

const StudyRoomStatusPage: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "done">("loading");
  const [data, setData] = useState<StudyRoomStatus | null>(null);

  const remaining =
    data?.capacity && data?.occupied !== undefined
      ? data.capacity - data.occupied
      : 0;

  const fillPercent =
    data?.capacity && data?.occupied !== undefined
      ? Math.round((data.occupied / data.capacity) * 100)
      : 0;

  /** 🔄 페이지 들어오면 자동 조회 */
  useEffect(() => {
    const load = async () => {
      const result = await fetchStudyRoomStatus();
      setData(result);
      setStatus("done");
    };
    load();
  }, []);

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">
        {/* 상단 제목 */}
        <section className="study-header">
          <h1>🪑 집중열람실 좌석 현황</h1>
          <p>실시간 잔여석 정보를 확인하세요.</p>
        </section>

        {/* 로딩 화면 */}
        {status === "loading" && (
          <section className="checking-section">
            <div className="loading-book"></div>
            <p className="checking-text">좌석 정보를 불러오는 중입니다...</p>
          </section>
        )}

        {/* 결과 표시 */}
        {status === "done" && data && (
          <section className="study-result-section">
            {/* 잔여 좌석 카드 */}
            <div className="remain-card">
              <p className="remain-label">현재 잔여 좌석</p>
              <p className="remain-number">{remaining}석</p>
              <p className="remain-sub">
                전체 {data.capacity}석 · 사용 {data.occupied}석
              </p>
            </div>

            {/* 원형 차트 */}
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
                  stroke="#004ea1"
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

        {/* 홈으로 가기 버튼 */}
        {status === "done" && (
          <div className="study-ok-wrapper">
            <button
              className="study-ok-button"
              onClick={() => (window.location.href = "/home")}
            >
              확인
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudyRoomStatusPage;
