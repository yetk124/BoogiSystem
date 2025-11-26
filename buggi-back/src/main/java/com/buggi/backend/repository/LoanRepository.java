package com.buggi.backend.repository;

import com.buggi.backend.domain.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {
   // List<Loan> findByUser_StudentId(String studentId);
}