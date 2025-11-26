package com.buggi.backend.service;

import com.buggi.backend.dto.BoogiResponse;
import com.buggi.backend.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoanService {

    private final LoanRepository loanRepository;

    public BoogiResponse checkLoanStatus(Map<String, Object> args) {
        String userId = (String) args.get("userId");
        return new BoogiResponse(
                "2",
                args,
                userId + "님의 대출 현황입니다."
        );
    }
}
