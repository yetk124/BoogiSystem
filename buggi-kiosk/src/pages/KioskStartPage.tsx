// src/pages/KioskStartPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/common.css";
import "../styles/KioskStartPage.css";

const KioskStartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="buggi-root kiosk-start-root">
      <div className="kiosk-start-frame">
        <div className="kiosk-start-orbit" />

        <div className="kiosk-start-card">

          {/* 로고 영역 */}
          <div className="kiosk-logo-row">
            <div className="kiosk-logo-circle">
              <i className="fa-solid fa-book-open text-5xl text-buggi-blue"></i>
            </div>

            <div className="kiosk-logo-text">
              <span className="kiosk-logo-title">BUGGI SYSTEM</span>
              <span className="kiosk-logo-sub">학술정보관 키오스크</span>
            </div>
          </div>

          {/* 문구 */}
          <div className="kiosk-main-message">
            <p className="kiosk-main-line1">부기 시스템을</p>
            <p className="kiosk-main-line2">이용하시겠습니까?</p>
          </div>

          <p className="kiosk-helper-text">
            로그인 시 대출 내역, 좌석 정보 등 개인화 서비스를 이용할 수 있어요.
          </p>

          {/* 버튼 두 개 */}
          <div className="kiosk-button-row">

            {/* 로그인 버튼 */}
            <button
              type="button"
              className="kiosk-btn kiosk-btn-primary"
              onClick={() => navigate("/login")}
            >
              <span className="kiosk-btn-main">
                <i className="fa-solid fa-user"></i>&nbsp; 로그인하고 이용하기
              </span>
              <span className="kiosk-btn-sub">내 대출·좌석·알림까지 한 번에</span>
            </button>

            {/* 비로그인 버튼 */}
            <button
              type="button"
              className="kiosk-btn kiosk-btn-secondary"
              onClick={() => navigate("/home")}
            >
              <span className="kiosk-btn-main">
                <i className="fa-solid fa-right-to-bracket"></i>&nbsp; 비로그인으로 이용하기
              </span>
              <span className="kiosk-btn-sub">도서 검색·휴관일 확인 가능</span>
            </button>
          </div>

          <p className="kiosk-footer-hint">
            화면을 터치하거나 버튼을 눌러 시작해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KioskStartPage;