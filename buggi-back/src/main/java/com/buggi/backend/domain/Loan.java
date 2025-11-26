package com.buggi.backend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "loan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Users 테이블 참조 (student_id)
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id", nullable = false)
    private Users user;

    @Column(name = "due_date", nullable = false)
    private java.sql.Date due_Date;
}
