package com.buggi.backend.dto;

import com.buggi.backend.domain.Loan;

public record LoanResponse(
        //String title,
        //String author,
        //String loanDate,
        String due_Date
) {
    public static LoanResponse from(Loan loan) {
        return new LoanResponse(
                // loan.getBook().getTitle(),
                // loan.getBook().getAuthor(),
                // loan.getLoanDate().toString(),
                loan.getDue_Date().toString()
        );
    }
}
