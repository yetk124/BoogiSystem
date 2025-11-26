import React, { useState } from "react";
import "../styles/common.css";
import "../styles/BookSearchPage.css";
import "../styles/ReturnDuePage.css";

import Header from "../components/Header";
import MicButton from "../components/MicButton";

interface LoanResponse {
  title: string;
  dueDate: string;
}

const ReturnDuePage: React.FC = () => {
  const [name, setName] = useState("");
  const [loans, setLoans] = useState<LoanResponse[] | null>(null);
  const [status, setStatus] = useState<
      "idle" | "listening" | "thinking" | "speaking"
  >("idle");

  const handleSearch = async () => {
    if (!name.trim()) {
      setLoans(null);
      return;
    }

    setStatus("thinking");
    setLoans(null);

    try {
      const res = await fetch(
          `http://localhost:8080/api/loan/search?name=${encodeURIComponent(name)}`
      );

      if (!res.ok) {
        throw new Error("서버 오류");
      }

      const data: LoanResponse[] = await res.json();
      setLoans(data);

      setStatus("speaking");
      setTimeout(() => setStatus("idle"), 800);
    } catch (error) {
      console.error(error);
      setLoans([]);
      setStatus("idle");
    }
  };

  const handleMic = () => {
    setStatus((prev) => (prev === "listening" ? "idle" : "listening"));
  };

  return (
      <div className="buggi-root">
        <Header />

        <main className="main-content">
          <section className="due-header">
            <h1>반납 예정일 조회</h1>
            <p>이름을 입력하면 대출 도서의 반납 예정일을 안내해드려요.</p>
          </section>

          <section className="search-panel">
            <div className="search-box-card">
              <div className="search-input-row">
                <div className="search-input-wrapper">
                  <span className="search-input-icon">👤</span>
                  <input
                      type="text"
                      placeholder="이름을 입력하세요"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="search-text-input"
                  />
                </div>

                <button type="button" onClick={handleSearch} className="search-button">
                  조회
                </button>

                <div className="mic-wrapper">
                  <MicButton status={status} onClick={handleMic} label="음성 입력" />
                </div>
              </div>
            </div>

            {/* ▼▼ 수정된 결과 UI ▼▼ */}
            {loans && (

                <div className="search-result-card due-result-card">
                  <p className="result-label center">조회 결과</p>

                  <h2 className="text-lg font-semibold mb-4 center">
                    {name} 님의 대출 목록
                  </h2>

                  {loans.length === 0 && (
                      <p className="text-gray-600">대출 기록이 없습니다.</p>
                  )}

                  <div className="space-y-4">
                    {loans.map((loan, index) => (
                        <div
                            key={index}
                            className={"search-box-card loan-item"}
                            //className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2 mb-1 center">
                            <p className="loan-item-label">제목</p>
                            <p className="loan-item-content title-weight">{loan.title}</p>
                          </div>

                          <p className="text-sm text-gray-700 center">
                            <p className="loan-item-label">반납 예정일</p>
                            <p className="loan-item-content date-weight">{loan.dueDate}</p>
                          </p>
                        </div>
                    ))}
                  </div>
                </div>
            )}
          </section>
        </main>
      </div>
  );
};

export default ReturnDuePage;
