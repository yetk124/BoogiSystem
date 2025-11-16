// src/pages/HomePage.tsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";


import "../styles/Homepage.css";
import "../styles/Header.css";
import "../styles/common.css";


type Feature = {
  key: string;
  iconClass: string;
  title: string;
  description: string;
  to: string;              // ✅ 라우터 경로 추가
  requiresLogin?: boolean;
};

const features: Feature[] = [
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
    to: "/interaction",           // 일단 여기로 연결 예시
  },
  {
    key: "events",
    iconClass: "fas fa-calendar-check",
    title: "행사 안내",
    description: "다양한 행사와 이벤트 정보를 확인하세요",
    to: "/book-recommend",       // 예시: 행사/추천 페이지
  },
  {
    key: "mybooks",
    iconClass: "fas fa-book",
    title: "대출 도서 목록",
    description: "내가 대출한 도서 목록을 확인하세요",
    requiresLogin: true,
    to: "/return-due",          // 아직 페이지 없으면 임시로 이거
  },
  {
    key: "seats",
    iconClass: "fas fa-chair",
    title: "좌석 현황",
    description: "실시간 좌석 현황을 확인하세요",
    requiresLogin: true,
    to: "/studyroom-status",
  },
  {
    key: "checkout",
    iconClass: "fas fa-door-open",
    title: "퇴실 처리",
    description: "빠르고 간편한 퇴실 처리를 하세요",
    requiresLogin: true,
    to: "/checkout",
  },
  {
    key: "security",
    iconClass: "fas fa-shield-alt",
    title: "보안 호출",
    description: "긴급상황 시 보안팀에 신고하세요",
    to: "/security",
  },
];



const HomePage: React.FC = () => {
  return (
    <div className="buggi-root">
      {/* 상단 헤더 */}
      {/* <header className="header">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-book-open" />
            <span>BUGGI SYSTEM</span>
          </div>
        </div>
      </header> */}
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="main-content">
        {/* 기능 그리드 */}
        <section className="feature-grid">
          {features.map((f) => (
            <Link
              key={f.key}
              to={f.to}
              className="feature-card-link"
            >
              <div
                className={`feature-card ${
                  f.requiresLogin ? "login-required" : "public"
                }`}
                data-feature={f.key}
              >
                <div className="feature-icon">
                  <i className={f.iconClass} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                {f.requiresLogin && (
                  <div className="login-badge">로그인 필요</div>
                )}
              </div>
            </Link>
          ))}
        </section>
        {/* 하단 정보 섹션 */}
        <section className="bottom-info">
          <div className="notice-banner">
            <div className="notice-content">
              <i className="fas fa-bullhorn" />
              <span>
                오늘의 공지: 2025년 1월 15일 학술정보관 정기 점검으로 오후
                2-4시 휴관 예정
              </span>
            </div>
          </div>

          <div className="operating-hours">
            <div className="hours-info">
              <i className="fas fa-clock" />
              <div className="hours-text">
                <strong>운영시간</strong>
                <span>
                  평일 08:00 - 22:00 | 토요일 09:00 - 18:00 | 일요일 휴관
                </span>
              </div>
            </div>
            {/* <button className="qr-btn" id="qrBtn">
              <i className="fas fa-qrcode" />
              <span>QR로 모바일 연동</span>
            </button> */}
          </div>
        </section>
      </main>

      {/* 개인정보 자동 숨김 타이머 */}
      <div className="privacy-timer" id="privacyTimer">
        <div className="timer-bar" />
        <span>
          개인정보 자동 숨김까지 <span id="timerCount">45</span>초
        </span>
      </div>
    </div>
  );
};

export default HomePage;
