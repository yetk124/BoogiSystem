// src/pages/InteractionPage.tsx
import React, { useEffect, useState } from "react";
import "../styles/common.css";
import "../styles/InteractionPage.css";

import Header from "../components/Header";

/* 🔵 이미지 IMPORT (src/img에 있는 파일 그대로) */
import koreanFlag from "../img/korean_flag.png";
import chuseokMoon from "../img/chuseok_moon.jpg";
import hangeul from "../img/hangeul.jpg";
import christmas from "../img/christmas.jpg";

/* 🔵 휴무일 데이터 */
const HOLIDAYS = [
  { date: "2024-10-03", name: "개천절", bg: koreanFlag },
  { date: "2024-10-06", name: "추석", bg: chuseokMoon },
  { date: "2024-10-09", name: "한글날", bg: hangeul },
  { date: "2024-12-25", name: "성탄절", bg: christmas }
];

/* 🔵 현재시간 포맷팅 */
function formatCurrentTime() {
  const now = new Date();
  const dayMap = ["일", "월", "화", "수", "목", "금", "토"];

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const day = dayMap[now.getDay()];

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const isAM = hours < 12;
  const period = isAM ? "오전" : "오후";

  if (hours === 0) hours = 12;
  else if (hours > 12) hours -= 12;

  return `${yyyy}-${mm}-${dd} (${day}) ${period} ${hours}:${minutes}`;
}

const InteractionPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(formatCurrentTime());

  // 30초마다 갱신
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">

        {/* 상단 타이틀 */}
        <section className="openclose-header">
          <h1>⏰ 운영 시간 안내</h1>
          <p>학기 중 운영 시간과 휴무일을 확인하세요.</p>
        </section>

        {/* 운영시간 카드 */}
        <section className="hours-card">
          <div className="hours-icon">⏰</div>
          <h2 className="hours-title">학기 중 운영 시간</h2>
          <p className="hours-time">오전 9시 ~ 밤 9시</p>
        </section>

        {/* 현재 시간 */}
        <section className="current-time-card">
          <h2 className="current-time-title">📆 현재 시간</h2>
          <p className="current-time">{currentTime}</p>
        </section>

        {/* 휴무일 안내 */}
        <section className="holiday-section">
          <h2 className="holiday-title">📌 휴무일 안내</h2>

          <div className="holiday-grid-2x2">
            {HOLIDAYS.map(h => (
              <div
                key={h.date}
                className="holiday-calendar-card"
                style={{
                  // CSS의 var(--bg-img)로 이미지 전달하기
                  ["--bg-img" as any]: `url(${h.bg})`
                }}
              >
                <div className="holiday-date-box">{h.date.slice(5)}</div>
                <div className="holiday-name-box">{h.name}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default InteractionPage;
