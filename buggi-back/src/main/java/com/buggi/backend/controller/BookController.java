package com.buggi.backend.controller;

import com.buggi.backend.dto.BookDtos;
import com.buggi.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/search")
    public List<BookDtos.BookResponse> searchBooks(@RequestParam String keyword) {
        System.out.println(">>>>>>>>>>>>>>>> 검색 요청 keyword = " + keyword);
        return bookService.searchBooks(keyword);
    }
}
