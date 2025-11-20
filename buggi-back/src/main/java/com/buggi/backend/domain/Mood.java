package com.buggi.backend.domain;

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

    private String moodName;

    public Mood(Integer id, String moodName) {
        this.id = id;
        this.moodName = moodName;
    }
}
