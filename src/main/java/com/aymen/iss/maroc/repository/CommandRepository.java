package com.aymen.iss.maroc.repository;

import com.aymen.iss.maroc.model.Command;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommandRepository extends JpaRepository<Command, Long> {
    List<Command> findAllByOrderByStatusAscDateDesc();
}
