// src/hooks/useAndroidWS.ts
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAndroidWS(androidUrl: string) {
    const wsRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);
    const navigate = useNavigate(); // 🔵 페이지 이동 기능 추가

    useEffect(() => {
        const ws = new WebSocket(androidUrl);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WS CONNECTED");
            setConnected(true);
        };

        ws.onclose = () => {
            console.log("WS CLOSED");
            setConnected(false);
        };

        ws.onerror = (e) => {
            console.log("WS ERROR", e);
        };

        // 🟦 Android → React 메시지 수신 처리
        ws.onmessage = (msg) => {
            console.log("FROM ANDROID:", msg.data);

            try {
                const data = JSON.parse(msg.data);

                // intent 있으면 라우팅 실행
                if (data.intent) {
                    handleIntentNavigation(data.intent);
                }
            } catch (e) {
                console.log("JSON 파싱 오류:", e);
            }
        };

        return () => ws.close();
    }, [androidUrl]);

    // 🟪 intent → 페이지 이동 매핑
    const handleIntentNavigation = (intent: string) => {
        console.log("🔍 Intent Received:", intent);

        switch (intent) {
            case "buggi0":
                navigate("/home");
                break;
            case "buggi1":
                navigate("/book-search");
                break;
            case "buggi2":
                navigate("/popular-books");
                break;
            case "buggi3":
                navigate("/studyroom-status");
                break;
            case "buggi4":
                navigate("/checkout");
                break;
            case "buggi5":
                navigate("/security");
                break;
            case "buggi6":
                navigate("/interaction");
                break;
            case "buggi7":
                navigate("/book-recommend");
                break;
            default:
                console.log("⚠ Unknown intent:", intent);
        }
    };

    // 🟩 WebSocket 전송 함수
    const send = (msg: any) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(msg));
        } else {
            console.log("WS NOT READY");
        }
    };

    return { connected, send };
}
