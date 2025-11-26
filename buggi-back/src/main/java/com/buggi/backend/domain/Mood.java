package com.buggi.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mood")
@Getter
@NoArgsConstructor
public class Mood {

    @Id
    private Integer id;

    @Column(name = "mood_Name")
    private String mood_Name;

    public Mood(Integer id, String mood_Name) {
        this.id = id;
        this.mood_Name = mood_Name;
    }
}
