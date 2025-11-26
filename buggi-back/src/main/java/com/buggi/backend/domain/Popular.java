package com.buggi.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="popular")
@Getter
@Setter @NoArgsConstructor
public class Popular {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="author")
    private String author;

    @Column(name="location")
    private String location;

    @Column(name="call_number")
    private String call_number;
}
