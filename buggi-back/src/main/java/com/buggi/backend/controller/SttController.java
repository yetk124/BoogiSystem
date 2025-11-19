package com.buggi.backend.controller;

import com.buggi.backend.dto.SttResponse;
import com.buggi.backend.service.SttService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class SttController {

    private final SttService sttService;

    public SttController(SttService sttService) {
        this.sttService = sttService;
    }

    @PostMapping("/stt")
    public SttResponse stt(@RequestParam("audio") MultipartFile audioFile) {
        String text = sttService.transcribe(audioFile);
        return new SttResponse(text);
    }
}
