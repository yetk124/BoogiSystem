package com.buggi.backend.controller;

import com.buggi.backend.dto.TtsRequest;
import com.buggi.backend.service.TtsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tts")
public class TtsController {

    private final TtsService ttsService;

    public TtsController(TtsService ttsService) {
        this.ttsService = ttsService;
    }

    @PostMapping("/speak")
    public void speak(@RequestBody TtsRequest req) {
        // TTS 메시지 실행
        ttsService.speak(req.getText());
    }
}
