package com.buggi.backend.controller;

import com.buggi.backend.dto.BoogiAskRequest;
import com.buggi.backend.dto.BoogiResponse;
import com.buggi.backend.service.BoogiService;
import org.springframework.web.bind.annotation.*;

// BoogiController.java   # /api/boogi/ask

@RestController
@RequestMapping("/api/boogi")
public class BoogiController {

    private final BoogiService boogiService;

    public BoogiController(BoogiService boogiService) {
        this.boogiService = boogiService;
    }

    @PostMapping("/ask")
    public BoogiResponse ask(@RequestBody BoogiAskRequest request) {
        return boogiService.askBoogi(request);
    }
}