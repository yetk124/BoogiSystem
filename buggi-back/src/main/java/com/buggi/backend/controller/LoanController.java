// LoanController.java
package com.buggi.backend.controller;

import com.buggi.backend.domain.Loan;
import com.buggi.backend.dto.LoanResponse;
import com.buggi.backend.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class LoanController {

    private final LoanService loanService;

    @GetMapping("/search")
    public List<LoanResponse> searchByName(@RequestParam String name) {
        return loanService.getLoansByName(name);
    }
}
