package com.aymen.iss.maroc.repository;

import com.aymen.iss.maroc.model.Command;
import com.aymen.iss.maroc.model.Computer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ComputerRepository extends JpaRepository<Computer, Long> {
    @Query("SELECT c FROM Command c ORDER BY c.status ASC, c.date DESC")
    List<Command> findAllByOrderByIdDesc();
}
