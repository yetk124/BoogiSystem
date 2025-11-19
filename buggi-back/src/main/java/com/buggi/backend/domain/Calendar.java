package com.buggi.backend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "calendar")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "date", nullable = false)
    private java.sql.Date date;   // 또는 LocalDate

    @Column(name = "is_closed", nullable = false)
    private Boolean isClosed;

    @Column(name = "reason", length = 50)
    private String reason;
}
