// book 엔티티

package com.buggi.backend.domain;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hsel_data")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "author", length = 100)
    private String author;

    @Column(name = "location", length = 50)
    private String location;

    @Column(name="call_number", length = 255)
    private String call_number;

    @Column(name = "url", length = 500)
    private String url;


}
