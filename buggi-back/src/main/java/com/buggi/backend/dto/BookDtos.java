package com.buggi.backend.dto;

import com.buggi.backend.domain.Book;

public class BookDtos {

    // 도서 응답용 DTO
    public record BookResponse(
            Long id,
            String title,
            String author,
            String locationCode,
            int borrowCount
    ) {
        public static BookResponse from(Book book) {
            return new BookResponse(
                    book.getId(),
                    book.getTitle(),
                    book.getAuthor(),
                    book.getLocationCode(),
                    book.getBorrowCount()
            );
        }
    }
}
