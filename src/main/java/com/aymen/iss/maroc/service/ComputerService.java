package com.aymen.iss.maroc.service;

import com.aymen.iss.maroc.model.Computer;
import com.aymen.iss.maroc.repository.ComputerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComputerService {

    @Autowired

    private ComputerRepository computerRepository;

    //Get all computers
    public List<Computer> getAllComputers() {
        return computerRepository.findAll();
    }

    //Add or update a computer
    public Computer saveComputer(Computer computer) {
        return computerRepository.save(computer);
    }

    //Get a computer by id
    public Optional<Computer> getComputerById(long id){
        return computerRepository.findById(id);
    }

    //Delete a computer
    public boolean deleteComputer(long id) {
        computerRepository.deleteById(id);
        return false;
    }
}
