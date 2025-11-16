# 📘 Boogi System

React 기반으로 개발된 **도서관 키오스크 시스템**입니다.  
로그인 / 비로그인 모드로 도서 검색, 인기 도서 확인, 위치 안내 등의 기본 기능을 제공합니다.

---

## 🚀 주요 기능
- 🔐 로그인 / 비로그인 모드 지원  
- 🔍 도서 검색 및 위치 안내  
- ⭐ 인기 도서 / 추천 도서 조회  
- 🗣️ 음성 기반 질의응답(TTS)  
- 📚 열람실 · 스터디룸 현황 보기  

---

### (Planned) Backend / LLM

- On-device LLM 또는 서버 LLM과 **Function Calling(도구 호출)** 방식으로 연동
- 각 기능은 `boogi_***_service` 형태의 “도서관 전용 함수”로 설계

---

## 🛠 기술 스택
- **Frontend**: React + TypeScript + Vite  
- **Style**: Tailwind CSS  

---

## ▶️ 실행 방법
```bash
npm install
npm run dev
