package com.aymen.iss.maroc.repository;

import com.aymen.iss.maroc.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}
