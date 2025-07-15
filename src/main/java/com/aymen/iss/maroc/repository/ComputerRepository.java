package com.aymen.iss.maroc.repository;

import com.aymen.iss.maroc.model.Computer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComputerRepository extends JpaRepository<Computer, Long> {
}
