package com.buggi.backend.service;

import com.buggi.backend.domain.Loan;
import com.buggi.backend.dto.BoogiResponse;
import com.buggi.backend.dto.LoanResponse;
import com.buggi.backend.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanService {

    private final LoanRepository loanRepository;

    public List<LoanResponse> getLoansByName(String name) {
        List<Loan> loans = loanRepository.findByStudentName(name);

        return loans.stream()
                .map(loan -> LoanResponse.builder()
                        .title(loan.getTitle())
                        .dueDate(loan.getDueDate().toString())  // LocalDate → 문자열
                        .build()
                )
                .collect(Collectors.toList());
    }
}
