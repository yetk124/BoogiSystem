// src/pages/InteractionPage.tsx
// src/pages/OpenCloseHoursPage.tsx

import React, { useState } from "react";
import "../styles/common.css";
import "../styles/BookSearchPage.css";      // 검색바 공용 스타일
import "../styles/InteractionPage.css";  // 이 페이지 전용 스타일

import Header from "../components/Header";
import MicButton from "../components/MicButton";

type AiStatus = "idle" | "listening" | "thinking" | "speaking";
type Period = 1 | 2;

type OpenCloseResponse = {
  message: string; // 예: "학기 중 운영 시간은 오전 9시 부터 밤 9시 까지입니다"
};

/**
 * 🔥 개폐관 시간 조회 API 래퍼
 * 실제 백엔드 boogi_openclose_hours_service(period: int)를 호출한다고 가정.
 *
 * 프론트에서 쓸 땐:
 *   await requestOpenCloseHours({ period, query })
 *
 * 나중에 백엔드 완성되면, 이 함수 내부만 수정하면 됨.
 */
async function requestOpenCloseHours(params: {
  period: Period | null;
  query: string;
}): Promise<OpenCloseResponse> {
  const { period, query } = params;

  try {
    // ✅ 실제 백엔드 연동 버전 (예시 URL, 필요에 맞게 수정!)
    const res = await fetch("/api/boogi/openclose-hours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        period,        // 1: 학기 중, 2: 방학 중 (옵션)
        user_query: query, // 사용자가 실제로 말한 문장 (LLM용)
      }),
    });

    if (!res.ok) {
      throw new Error("서버 에러");
    }

    const data = await res.json();
    // 백엔드에서 { message: "..." } 형태로 내려준다고 가정
    if (typeof data.message === "string") {
      return { message: data.message };
    }

    // 응답 형식이 예상과 다를 때
    return {
      message: "운영 시간 정보를 불러오는 데 문제가 발생했습니다. 다시 시도해 주세요.",
    };
  } catch (error) {
    console.error(error);
    // 🔁 임시 더미 응답 (백엔드 아직 없을 때도 프론트는 동작하게)
    if (period === 1) {
      return {
        message: "학기 중 운영 시간은 오전 9시 부터 밤 9시 까지입니다.",
      };
    }
    if (period === 2) {
      return {
        message: "방학 중 운영 시간은 오전 10시 부터 오후 4시 까지입니다.",
      };
    }
    // period 선택 없이 자유질문만 한 경우
    return {
      message:
        "학기 중은 오전 9시~밤 9시, 방학 중은 오전 10시~오후 4시 운영합니다.",
    };
  }
}

const InteractionPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState<Period | null>(null);
  const [status, setStatus] = useState<AiStatus>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim() && period === null) {
      // 아무 정보도 없으면 그냥 무시
      return;
    }

    setIsLoading(true);
    setStatus("thinking");
    setResult(null);

    const data = await requestOpenCloseHours({ period, query });

    setResult(data.message);
    setStatus("speaking");

    // 살짝 딜레이 후 idle 로
    setTimeout(() => setStatus("idle"), 800);
    setIsLoading(false);
  };

  const handleMic = () => {
    // 추후 STT 연동 자리
    setStatus((prev) => (prev === "listening" ? "idle" : "listening"));

    // TODO: STT 결과 들어오면 예시
    // const recognized = "학기 중 운영 시간이 언제야";
    // setQuery(recognized);
    // setPeriod(1);  // LLM에서 period=1로 정해줬다고 가정
    // handleSearch();
  };

  return (
    <div className="buggi-root">
      <Header />

      <main className="main-content">
        {/* 상단 제목 영역 */}
        <section className="openclose-header">
          <h1>⏰ 개폐관 시간 조회</h1>
          <p>학기 중 / 방학 중 운영 시간을 쉽게 확인해 보세요.</p>
        </section>

        {/* 검색 입력 + 버튼 + 마이크 */}
        <section className="search-panel">
          <div className="search-box-card">
            <div className="search-input-row">
              <div className="search-input-wrapper">
                <span className="search-input-icon">📅</span>
                <input
                  type="text"
                  placeholder='예: "학기 중 운영 시간이 언제야?"'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="search-text-input"
                />
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="search-button"
                disabled={isLoading}
              >
                조회
              </button>

              <div className="mic-wrapper">
                <MicButton
                  status={status}
                  onClick={handleMic}
                  label="음성 입력"
                />
              </div>
            </div>

            {/* 학기 중 / 방학 중 토글 버튼 */}
            <div className="period-toggle">
              <button
                type="button"
                className={`period-btn ${period === 1 ? "active" : ""}`}
                onClick={() => setPeriod(1)}
              >
                학기 중
              </button>
              <button
                type="button"
                className={`period-btn ${period === 2 ? "active" : ""}`}
                onClick={() => setPeriod(2)}
              >
                방학 중
              </button>
            </div>
          </div>

          {/* 조회 결과 카드 */}
          <div className="search-result-card openclose-result-card">
            <p className="result-label">운영 시간 안내</p>

            {/* 결과가 없으면 안내 문구만 */}
            {isLoading ? (
              <p className="result-main">BUGGI가 운영 시간을 확인하고 있습니다...</p>
            ) : result ? (
              <p className="result-main">{result}</p>
            ) : (
              <p className="result-main">
                상단에 질문을 입력하거나 학기 중 / 방학 중을 선택한 뒤 조회 버튼을 눌러 주세요.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default InteractionPage;
