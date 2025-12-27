const DEVICE_IP = "192.168.0.2";
const DEVICE_PORT = 8080;

export const startStt = async () => {
    try {
        await fetch(`http://${DEVICE_IP}:${DEVICE_PORT}/start-stt`, {
            method: "POST",
            headers: { "Content-Type": "text/plain" }
        });
        console.log("STT start request sent");
    } catch (err) {
        console.error("Error:", err);
        alert("퀄컴 기기와 연결할 수 없습니다.");
    }
};
