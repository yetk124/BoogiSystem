package com.buggi.backend.service;

import com.buggi.backend.domain.Book;
import com.buggi.backend.dto.BoogiResponse;
import com.buggi.backend.dto.BookDtos;
import com.buggi.backend.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<BookDtos.BookResponse> searchBooks(String keyword) {
        List<Book> books = bookRepository.findByTitleContaining(keyword);

        return books.stream()
                .map(BookDtos.BookResponse::from)
                .toList();
    }
}
