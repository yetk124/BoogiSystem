package com.buggi.backend.service;

import com.buggi.backend.domain.Popular;
import com.buggi.backend.repository.PopularRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PopularService {
    private final PopularRepository popularRepository;

    public List<Popular> getAllPopularBooks() {
        return popularRepository.findAll();
    }
}

