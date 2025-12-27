package com.buggi.backend.repository;

import com.buggi.backend.domain.Mood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoodRepository extends JpaRepository<Mood, Long> {
    Mood findByMoodName(String moodName);
}
