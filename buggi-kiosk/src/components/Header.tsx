// src/components/Header.tsx
import { useLocation, useNavigate } from "react-router-dom";

type HeaderProps = {
  onVoiceClick?: () => void;
};

const Header = ({ onVoiceClick }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/home";

  return (
      <header className="header">
        <div className="header-content">

          {/* 로고 */}
          <div className="logo-with-mic">
            <div className="logo">
              <i className="fas fa-book-open" />
              <span>BOOGI SYSTEM</span>
            </div>
          </div>

          {/* 버튼 */}
          <div className="header-actions">
            {isHome ? (
                <button className="mic-btn-header" onClick={onVoiceClick}>
                  <i className="fas fa-microphone" />
                </button>
            ) : (
                <>
                  <button className="header-btn" onClick={() => window.location.reload()}>
                    <i className="fas fa-rotate-right"></i>
                  </button>
                  <button className="header-btn" onClick={() => navigate("/home")}>
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
