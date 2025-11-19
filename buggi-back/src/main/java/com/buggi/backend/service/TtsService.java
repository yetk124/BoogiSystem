// # TTS 연동 자리

package com.buggi.backend.service;

import org.springframework.stereotype.Service;

@Service
public class TtsService {

    public void speak(String text) {
        // TODO: 온디바이스 TTS 엔진 호출 (JNI, socket, HTTP 등)
        System.out.println("[TTS] speak: " + text);

        // 예:
        // nativeTts.speak(text);
        // 또는
        // ttsClient.send(text);
    }
}
