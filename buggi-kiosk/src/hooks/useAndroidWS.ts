// src/hooks/useAndroidWS.ts
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * useAndroidWS 훅
 * - 안드로이드에서 오는 intent(라벨)로 라우팅 이동
 * - LLM에서 보내는 title:, mood:, borrower: 같은 메시지를 콜백으로 전달
 */
export default function useAndroidWS(
    androidUrl: string,
    onMessage?: (msg: string) => void   // 🔥 콜백 추가
) {
    const wsRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);
    const navigate = useNavigate();

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

        ws.onmessage = (msg) => {
            console.log("FROM ANDROID RAW:", msg.data);

            // 문자열이 아닐 경우 무시
            if (typeof msg.data !== "string") return;

            // title:소원 / mood:1 / borrower:2 같은 LLM 메시지 처리
            if (msg.data.includes("title:") || msg.data.includes("mood:") || msg.data.includes("borrower:")) {
                console.log("🔥 LLM INTENT:", msg.data);

                // 프론트에서 전달받은 콜백으로 전달
                if (onMessage) onMessage(msg.data.trim());
                return;
            }

            // JSON 아닌 메시지 무시
            if (!msg.data.trim().startsWith("{")) {
                console.log("⚠ Non-JSON ignored:", msg.data);
                return;
            }

            // JSON intent 처리 (maum0~maum7)
            try {
                const data = JSON.parse(msg.data);
                if (typeof data.intent === "string") {
                    handleIntentNavigation(data.intent);
                }
            } catch (e) {
                console.log("JSON parse error", e);
            }
        };

        return () => ws.close();
    }, [androidUrl, onMessage]);


    // intent → route 매핑
    const intentRouteMap: Record<string, string> = {
        maum0: "/book-search",
        maum1: "/popular-books",
        maum2: "/interaction",
        maum3: "/book-recommend",
        maum4: "/return-due",
        maum5: "/studyroom-status",
        maum6: "/checkout",
        maum7: "/security",
    };

    const handleIntentNavigation = (intent: string) => {
        console.log("🔍 Intent Received:", intent);

        const route = intentRouteMap[intent];
        if (route) {
            console.log(`➡ navigating to ${route}`);
            navigate(route, { replace: true });
        } else {
            console.log("⚠ Unknown intent:", intent);
        }
    };

    const send = (msg: any) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(msg));
        } else {
            console.log("WS NOT READY");
        }
    };

    return { connected, send };
}
