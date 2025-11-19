package com.buggi.backend.service;

import com.buggi.backend.dto.BoogiResponse;
import org.springframework.stereotype.Service;

@Service
public class CalendarService {

    public BoogiResponse todayStatus() {
        return new BoogiResponse(
                "3",
                null,
                "오늘 도서관은 09:00 ~ 18:00 운영해요."
        );
    }
}
