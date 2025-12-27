// src/pages/BookRecommendPage.tsx
import React, { useState } from "react";

import "../styles/common.css";            // buggi-root, main layout
import "../styles/BookSearchPage.css";    // 검색창 공용 스타일
import "../styles/BookRecommendPage.css"; // 추천 페이지 전용 스타일

import Header from "../components/Header";
import MicButton from "../components/MicButton";

const BookRecommendPage: React.FC = () => {
  const [query, setQuery] = useState("");      // 사용자가 입력한 문장
  const [status, setStatus] = useState<
      "idle" | "listening" | "thinking" | "speaking"
  >("idle");
  const [result, setResult] = useState<any | null>(null); // 결과 (나중에 API 연결)
  const [mood, setMood] = useState("");



  // title 기준으로 책 소개를 매핑하는 객체
  const bookDescriptions: Record<string, {
    description: string;
    forWho: string[];
    reason: string;
    imgSrc: string;
  }> = {
    "고슴도치의 소원": {
      description:
          "「고슴도치의 소원」은 네덜란드 작가 톤 텔레헨이 들려주는 짧고 따뜻한 이야기 모음집\n동물들의 대화를 통해 상처와 위로, 용기와 관계를 부드럽게 어루만지는 감성 에세이 같은 동화",
      forWho: [
        "지친 마음을 위로받고 싶으신 분",
        "따뜻한 문장으로 힐링하고 싶으신 분",
        "짧은 이야기로 편안하게 읽고 싶으신 분",
      ],
      reason:
          "잔잔한 위로와 공감이 필요한 순간에 잘 어울립니다.\n짧은 이야기 속 동물들의 말이 마음을 다정하게 어루만져 드립니다.",
      imgSrc: "/src/img/고슴도치의소원.jpeg"
    },
    "최재천의 공부": {
      description:
          "「최재천의 공부」는 생태학자 최재천 교수가 들려주는 ‘평생 공부’의 철학을 담은 책\n공부란 지식을 쌓는 것이 아니라, 세상을 바라보는 태도와 질문하는 법을 배우는 과정임을 강조",
      forWho: [
        "공부에 대한 동기부여가 필요하신 분",
        "성장을 원하지만 방향을 잃은 분",
        "학습의 의미를 다시 찾고 싶으신 분",
      ],
      reason:
          "공부가 부담스럽고 힘들게 느껴질 때 잘 어울립니다.\n‘왜 배우는가’를 다시 떠올리게 하여 꾸준함의 에너지를 드립니다.",
      imgSrc: "/src/img/최재천의공부.jpeg"
    },
    "생각의 말": {
      description:
          "「생각의 말」은 일상에서 마주하는 통찰과 사색을 담은 짧은 글 모음집\n바쁜 삶 속에서도 잠시 멈추어 자신의 감정과 생각을 정리할 시간을 건네는 책",
      forWho: [
        "머리를 식히고 여유를 찾고 싶으신 분",
        "복잡한 생각을 정리하고 싶으신 분",
        "짧은 문장 속 의미를 깊이 느끼고 싶으신 분",
      ],
      reason:
          "마음을 차분하게 가라앉히고 싶을 때 어울립니다.\n짧고 깊은 문장들이 하루의 작은 ‘마음 쉼표’가 되어 드립니다.",
      imgSrc: "/src/img/생각의말.png"
    },
  };

  const handleSearch = async (mood: string) => {

    setStatus("thinking");
    setResult(null);

    try {
      const res = await fetch(`http://localhost:8080/api/mood/${mood}`);
      const data = await res.json();

      setResult({
        title: data.title,
        author: data.author,
        description: bookDescriptions[data.title]?.description || "",
        forWho: bookDescriptions[data.title]?.forWho || [],
        reason: bookDescriptions[data.title]?.reason || "",
        imgSrc: bookDescriptions[data.title]?.imgSrc || "",
        message: `${mood}에 어울리는 책`,
      });

      setStatus("speaking");
      setTimeout(() => setStatus("idle"), 700);
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  const handleMic = () => {
    // 추후: 음성 인식 결과 → setQuery() 넣기
    setStatus((prev) => (prev === "listening" ? "idle" : "listening"));
  };

  return (
      <div className="buggi-root">
        <Header />

        <main className="main-content">
          {/* 상단 안내 */}
          <section className="recommend-header">
            <h1>📚 감정 기반 도서 추천</h1>
            <p>지금의 감정을 말하거나 입력하면, AI가 어울리는 책을 추천해드려요.</p>
          </section>

          {/* 입력 + 버튼 + 마이크 */}
          <section className="search-panel recommend-search-panel">
            <div className="search-box-card">

              <div className="recommend-button-row">
                <div className="mood-button-wrapper">
                  <button type="button" onClick={() => handleSearch("위로")} className="mood-button">
                    # 위로
                  </button>
                  <button type="button" onClick={() => handleSearch("동기부여")} className="mood-button">
                    # 동기부여
                  </button>
                  <button type="button" onClick={() => handleSearch("휴식")} className="mood-button">
                    # 휴식
                  </button>

                </div>


                <div className="mic-wrapper">
                  <MicButton status={status} onClick={handleMic} label="음성 입력"/>
                </div>

              </div>

            </div>
          </section>

          {/* 결과가 있을 때만 표시 */}
          {result && (
              <section className="recommend-result-section">

                <div className="recommend-result-card">
                  <p className="result-message">{result.message}</p><br/><br/>

                  <div className="result-header-box">
                    <img
                      src={result.imgSrc}
                      alt="no-result mascot"
                      className="no-result-icon-img"
                    />
                  <div>

                    <span className="result-author">{result.author} </span>
                    저자의 <br/>
                    <span className="result-title">{result.title}</span>
                  </div>

                  </div>

                  <div className="comment">
                    {/* 소개 */}
                    {result.description && (
                        <p className="result-description">
                          {result.description.split("\n").map((line, idx) => (
                              <p key={idx}>{line}</p>
                          ))}
                        </p>
                    )}

                    {/* 이런 사람에게 추천 */}
                    {result.forWho && result.forWho.length > 0 && (
                        <div className="result-forwho">
                          <br/>
                          <strong>이런 분께 추천드립니다</strong>
                          <ul>
                            {result.forWho.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                    )}

                    {/* 감정 추천 이유 */}
                    <br/>
                    {result.reason && (
                        <p className="result-reason">
                          {result.reason.split("\n").map((line, idx) => (
                              <p key={idx}>{line}</p>
                          ))}
                        </p>
                    )}
                  </div>

                </div>
              </section>
          )}

          {/* 결과가 없을 때는 아무것도 안보임 */}
        </main>
      </div>
  );
};

export default BookRecommendPage;