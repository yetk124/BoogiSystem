package com.buggi.backend.service;

import com.buggi.backend.dto.BoogiResponse;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class LoanService {

    public BoogiResponse checkLoanStatus(Map<String, Object> args) {
        String userId = (String) args.get("userId");
        return new BoogiResponse(
                "2",
                args,
                userId + "님의 대출 현황입니다."
        );
    }
}
