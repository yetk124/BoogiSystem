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

          {/* 로고 */}
          <div className="kiosk-logo-row">
            <div className="kiosk-logo-circle">
              <i className="fa-solid fa-book-open text-5xl text-buggi-blue"></i>
            </div>

            <div className="kiosk-logo-text">
              <span className="kiosk-logo-title">BUGGI SYSTEM</span>
              <span className="kiosk-logo-sub">학술정보관 키오스크</span>
            </div>
          </div>

          {/* 메인 문구 */}
          <div className="kiosk-main-message">
            <p className="kiosk-main-line1">부기 시스템을</p>
            <p className="kiosk-main-line2">시작하시겠습니까?</p>
          </div>

          {/* 비로그인만 */}
          <div className="kiosk-button-row">
            <button
              type="button"
              className="kiosk-btn kiosk-btn-primary"
              onClick={() => navigate("/home")}
            >
              <span className="kiosk-btn-main">
                <i className="fa-solid fa-right-to-bracket"></i>&nbsp;
                시작하기
              </span>
              <span className="kiosk-btn-sub">
                도서 검색, 인기 도서, 휴관일 안내 이용 가능
              </span>
            </button>
          </div>

          <p className="kiosk-footer-hint">
            화면을 터치하여 시작해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KioskStartPage;
