package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Command;
import com.aymen.iss.maroc.model.Contact;
import com.aymen.iss.maroc.repository.CommandRepository;
import com.aymen.iss.maroc.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/command")
@CrossOrigin(origins = "*")
public class CommandController {

    @Autowired
    private CommandRepository commandRepository;

    @PostMapping
    public ResponseEntity<Map<String, String>> createCommand(@RequestBody Command command){
        commandRepository.save(command);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Message received");
        return ResponseEntity.ok(response);
    }

    //Get - get all commands
    @GetMapping
    public List<Command> getAllCommand(){
        return commandRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteCommand(@PathVariable Long id) {
        commandRepository.deleteById(id);
    }

    @PutMapping("/{id}/status")
    public Command updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Command command = commandRepository.findById(id).orElseThrow(() -> new RuntimeException("Command not found"));

        String newStatus = payload.get("status");
        command.setStatus(newStatus);

        return commandRepository.save(command);
    }
    @GetMapping
    public List<Command> getAllCommandByDate() {
        return commandRepository.findAllByOrderByStatusAscDateDesc();
    }
}
