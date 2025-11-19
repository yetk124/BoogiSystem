
package com.buggi.backend.domain;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {
    @Id
    @Column(name = "student_id")
    private Integer studentNumber;

    @Column(name = "student_name", nullable = false, length = 50)
    private String studentName;

    @Column(name = "password", nullable = false, length = 255)
    private String password;
}