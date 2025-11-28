# 📘 Boogi System – AI 도서관 키오스크

React · Spring Boot · MySQL · Android On-Device LLM 기반  
음성으로 도서 검색/추천/좌석 안내를 제공하는 **AI 키오스크 시스템**

---

## 👨‍💻 Team Members

- **원예은** — FRONT / BACK — [GitHub](https://github.com/uyetk124)
- **장세미** — FRONT / BACK — [GitHub](https://github.com/ssem-i)
- **노하은** — 기획 / LLM구조 — [GitHub](https://github.com/ryudia)
- **이찬희** — 온디바이스 모델 고도화 — [GitHub](https://github.com/can6563)

---

## 🎬 시연 영상 & 스크린샷
![KakaoTalk_20251128_120814432](https://github.com/user-attachments/assets/ef0831b1-9b98-4e29-b0f1-697c2623fc07)

---

## 📂 프로젝트 구조

BoogiSystem/
├── buggi-kiosk/ # React Frontend
├── buggi-back/ # Spring Boot Backend
├── db/ # MySQL Docker 설정
├── README.md
└── docker-compose.yml

---

## 🤖 AI 구성 (마음AI 제공 모델)
- Android 보드에서 **STT → LLM → TTS**를 로컬 처리  
- STT: Sherpa-ONNX (SenseVoice)  
- LLM: LLaMA 계열 양자화 모델  
- TTS: VITS 기반  
- LLM 결과 예시: `<maum_title>(코스모스)`

📌 모델 파일은 Repo에 포함되지 않음.

---

## 🧱 전체 시스템 아키텍처

사용자 발화
↓
[Android 보드]
- VAD → STT → LLM → TTS
- LLM 결과를 WebSocket으로 전송
↓
[React 키오스크 UI]
- 실시간 WebSocket 이벤트 표시
- 백엔드 API 호출
↓
[Spring Boot 서버]
- 도서 검색/추천/좌석 정보 처리
- MySQL 연동
↓
[MySQL (Docker)]
- 도서 / 인기 / 대출 / 달력 / 사용자 정보 저장

---

## 🖥 Frontend (React)
- 키오스크 UI  
- 8개 기능 화면  
- Android → WebSocket 실시간 이벤트 처리  
- REST API 연동 

## 🖥 Backend (Spring Boot)
- 도서관 비즈니스 로직 처리
- API 제공: `/books/search`, `/popular`, `/calendar`, `/loan` 등  
- Docker MySQL 연동

## 🗄 Database (Docker MySQL)
| 구성 | 포트 |
|------|------|
| MySQL(Docker) | **3307** |
| Spring Boot | **8080** |
| React(Vite) | **5173** |

## 실행방법

### Frontend
```bash
cd buggi-kiosk
npm install
npm run dev
```

### Backend
```bash
cd buggi-back
./mvnw spring-boot:run
```
