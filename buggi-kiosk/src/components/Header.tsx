// src/components/Header.tsx
import { useLocation, useNavigate } from "react-router-dom";

type HeaderProps = {
  onVoiceClick?: () => void;
};

const Header = ({ onVoiceClick }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 경로가 "/"(홈)인지 판단
  const isHome = location.pathname ===  "/home";

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-content">

        {/* 왼쪽 로고 */}
        <div className="logo">
          <i className="fas fa-book-open" />
          <span>BOOGI SYSTEM</span>
        </div>

        {/* 홈이 아닐 때만 버튼 표시 */}
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