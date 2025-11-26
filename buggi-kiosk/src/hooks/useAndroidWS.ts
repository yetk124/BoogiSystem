// src/hooks/useAndroidWS.ts
import { useEffect, useRef, useState } from "react";

export default function useAndroidWS(androidUrl: string) {
    const wsRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);

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
            console.log("FROM ANDROID:", msg.data);
        };

        return () => ws.close();
    }, [androidUrl]);

    const send = (msg: any) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(msg));
        } else {
            console.log("WS NOT READY");
        }
    };

    return { connected, send };
}