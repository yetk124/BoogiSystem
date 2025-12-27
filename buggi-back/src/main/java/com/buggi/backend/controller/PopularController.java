package com.buggi.backend.controller;

import com.buggi.backend.domain.Popular;
import com.buggi.backend.service.PopularService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/popular")
@RequiredArgsConstructor
public class PopularController {

    private final PopularService popularService;

    @GetMapping("/list")
    public List<Popular> getPopularBooks() {
        return popularService.getAllPopularBooks();
    }
}

