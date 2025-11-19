// book 엔티티

package com.buggi.backend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 100)
    private String author;

    @Column(length = 50)
    private String locationCode; // "4층-자연과학-005" 같은 위치 코드

    @Column
    private int borrowCount; // 인기 도서용 (대출 횟수 등)
}
