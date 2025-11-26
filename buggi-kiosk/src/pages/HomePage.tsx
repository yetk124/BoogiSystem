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
  to: string;
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
  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">
        <section className="feature-grid">
          {features.map((f) => (
            <Link key={f.key} to={f.to} className="feature-card-link">
              <div
                className={`feature-card ${
                  f.key === "security"
                    ? "security-alert"
                    : ["search", "events", "mybooks"].includes(f.key)
                    ? "frequent"
                    : "public"
                }`}
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
      </main>
    </div>
  );
};

export default HomePage;
