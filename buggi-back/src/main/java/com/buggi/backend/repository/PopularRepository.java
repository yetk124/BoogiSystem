package com.buggi.backend.repository;

import com.buggi.backend.domain.Popular;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PopularRepository extends JpaRepository<Popular, Long> {
}
