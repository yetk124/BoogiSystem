// src/hooks/useAndroidWS.ts
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAndroidWS(androidUrl: string) {
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

            try {
                // 🔥 JSON 아닌 메시지는 건너뛰기
                if (typeof msg.data !== "string" || !msg.data.trim().startsWith("{")) {
                    console.log("⚠ Non-JSON message ignored:", msg.data);
                    return;
                }

                const data = JSON.parse(msg.data);

                // 🔥 maum0 ~ maum7 이 들어있는지 확인
                if (typeof data.intent === "string") {
                    handleIntentNavigation(data.intent);
                }

            } catch (e) {
                console.log("JSON 파싱 오류:", e);
            }
        };

        return () => ws.close();
    }, [androidUrl]);

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
