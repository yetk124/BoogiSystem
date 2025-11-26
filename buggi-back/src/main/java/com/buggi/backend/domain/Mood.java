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
    private String moodName;

    @Column(name= "title")
    private String title;

    @Column(name="author")
    private String author;

    public Mood(Integer id, String moodName) {
        this.id = id;
        this.moodName = moodName;
    }
}
