// src/components/Header.tsx
import { useLocation, useNavigate } from "react-router-dom";

type HeaderProps = {
  onVoiceClick?: () => void;   // 녹음 시작/중지 이벤트
};

const Header = ({ onVoiceClick }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 페이지가 /home인지
  const isHome = location.pathname === "/home";

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
      <header className="header">
        <div className="header-content">

          {/* ===== 왼쪽 로고 + (홈일 때 마이크 버튼) ===== */}
          <div className="logo-with-mic">
            <div className="logo">
              <i className="fas fa-book-open" />
              <span>BOOGI SYSTEM</span>
            </div>

            {/* 홈 상태일 때만 녹음 버튼 표시 */}
            {isHome && (
                <button className="mic-btn-header" onClick={onVoiceClick}>
                  <i className="fas fa-microphone" />
                </button>
            )}
          </div>

          {/* ===== 오른쪽 버튼 (홈이 아닐 때만 표시) ===== */}
          {!isHome && (
              <div className="header-actions">
                <button className="header-btn" onClick={handleRefresh}>
                  <i className="fas fa-rotate-right"></i>
                </button>
                <button className="header-btn" onClick={handleHome}>
                  <i className="fas fa-home"></i>
                </button>
              </div>
          )}
        </div>
      </header>
  );
};

export default Header;
