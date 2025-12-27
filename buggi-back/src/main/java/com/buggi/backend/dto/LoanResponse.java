package com.buggi.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class LoanResponse {
    private String title;
    private String dueDate;   // LocalDate를 String 형태로 변환해서 주기
}
