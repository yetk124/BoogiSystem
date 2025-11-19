package com.buggi.backend.service;

import com.buggi.backend.dto.BoogiResponse;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class BookService {

    public BoogiResponse searchBooks(Map<String, Object> args) {
        String keyword = (String) args.get("keyword");

        // TODO: DB 검색 로직 작성
        return new BoogiResponse(
                "1",
                args,
                keyword + " 관련 책을 찾아드렸어요."
        );
    }
}
