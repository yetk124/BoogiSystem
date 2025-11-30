// src/pages/HomePage.tsx
import { Link } from "react-router-dom";
import Header from "../components/Header";
import useAndroidWS from "../hooks/useAndroidWS";
import React, { useState } from "react";

import "../styles/Homepage.css";
import "../styles/Header.css";
import "../styles/common.css";


const features = [
  {
    key: "search",
    iconClass: "fas fa-search",
    title: "도서 찾기",
    description: "도서를 검색하고 위치를 확인하세요",
    to: "/book-search",
  },
  {
    key: "popular",
    iconClass: "fas fa-trophy",
    title: "인기 도서",
    description: "현재 가장 인기 있는 도서들을 확인하세요",
    to: "/popular-books",
  },
  {
    key: "schedule",
    iconClass: "fas fa-calendar-alt",
    title: "휴관일 조회",
    description: "학술정보관 휴관일을 확인하세요",
    to: "/interaction",
  },
  {
    key: "events",
    iconClass: "fas fa-calendar-check",
    title: "도서 추천",
    description: "당신의 감정을 말해보세요",
    to: "/book-recommend",
  },
  {
    key: "mybooks",
    iconClass: "fas fa-book",
    title: "반납 예정일 조회",
    description: "내가 대출한 도서 목록을 확인하세요",
    to: "/return-due",
  },
  {
    key: "seats",
    iconClass: "fas fa-chair",
    title: "좌석 현황",
    description: "실시간 좌석 현황을 확인하세요",
    to: "/studyroom-status",
  },
  {
    key: "checkout",
    iconClass: "fas fa-door-open",
    title: "퇴실 처리",
    description: "빠르고 간편한 퇴실 처리를 하세요",
    to: "/checkout",
  },
  {
    key: "security",
    iconClass: "fas fa-shield-alt",
    title: "보안 호출",
    description: "긴급 상황 시 보안팀에 연락하세요",
    to: "/security",
  },
];

const HomePage: React.FC = () => {
  const { connected, send } = useAndroidWS("ws://192.168.0.2:9000");

  const [isListening, setIsListening] = useState(false);

  const handleMic = () => {
    if (!connected) return;
    send({ type: "mic", action: "start" });
    setIsListening(true);
  };

  const handleStop = () => {
    if (!connected) return;
    send({ type: "mic", action: "stop" });
    setIsListening(false);
  };

 return (
  <div className="buggi-root">
    <Header onVoiceClick={handleMic} />

    <main className="main-content">
      <section className="feature-grid">
        {features.map((f) => (
          <Link key={f.key} to={f.to} className="feature-card-link">
            <div
              className={
                f.key === "security"
                  ? "feature-card security-alert"
                  : ["search", "events", "mybooks"].includes(f.key)
                  ? "feature-card frequent"
                  : "feature-card public"
              }
            >
              <div className="feature-icon">
                <i className={f.iconClass} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          </Link>
        ))}

      </section>
      
         {/* 🔽 AI 안내카드 (그리드 안으로 이동!) */}
 <section className="bottom-info">
  
  <div className="info-row">
    <i className="fas fa-bullhorn"></i>
    <span>2025년 1월 15일 정기 점검으로 14:00~16:00 휴관 예정</span>
  </div>

  <div className="info-row">
    <i className="fas fa-clock"></i>
    <span>운영시간: 평일 08:00~22:00 | 토요일 09:00~18:00 | 일요일 휴관</span>
  </div>

  <div className="info-row ai-row">
    <i className="fas fa-robot"></i>
    <span>
      <strong>AI 보조 사서 안내:</strong> 음성 도서 검색 · 추천 · 좌석 안내 · 반납일 조회  
      <span className="ai-tip-inline">“코스모스 어디 있어?” 라고 말해보세요!</span>
    </span>
  </div>

</section>
    </main>
  </div>
);
};

export default HomePage;