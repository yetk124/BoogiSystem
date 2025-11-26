// src/components/Header.tsx
import { useLocation, useNavigate } from "react-router-dom";

type HeaderProps = {
  onVoiceClick?: () => void;
};

const Header = ({ onVoiceClick }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

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

          {/* 왼쪽 로고 영역 */}
          <div className="logo-with-mic">
            <div className="logo">
              <i className="fas fa-book-open" />
              <span>BOOGI SYSTEM</span>
            </div>
          </div>

          {/* 오른쪽 버튼 영역 */}
          <div className="header-actions">
            {isHome && (
                <button className="mic-btn-header" onClick={onVoiceClick}>
                  <i className="fas fa-microphone" />
                </button>
            )}

            {!isHome && (
                <>
                  <button className="header-btn" onClick={handleRefresh}>
                    <i className="fas fa-rotate-right"></i>
                  </button>
                  <button className="header-btn" onClick={handleHome}>
                    <i className="fas fa-home"></i>
                  </button>
                </>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;