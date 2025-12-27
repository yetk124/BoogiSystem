package com.buggi.backend.controller;

import com.buggi.backend.domain.Mood;
import com.buggi.backend.repository.MoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mood")
public class MoodController {

    @Autowired
    private MoodRepository moodRepository;

    @GetMapping("/{moodName}")
    public ResponseEntity<Mood> getMood(@PathVariable String moodName) {
        Mood mood = moodRepository.findByMoodName(moodName);
        if (mood == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(mood);
    }
}
