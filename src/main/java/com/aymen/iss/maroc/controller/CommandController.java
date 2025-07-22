package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Command;
import com.aymen.iss.maroc.repository.CommandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.aymen.iss.maroc.dto.StatusUpdateDTO;

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
    public ResponseEntity<?> createCommand(@RequestBody Command command) {
        try {
            commandRepository.save(command);
            return ResponseEntity.ok(Map.of("message", "Command created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
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
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody StatusUpdateDTO dto) {
        System.out.println("Incoming status update: " + dto.getStatus());

        try {
            Command command = commandRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Commande introuvable"));

            // Add validation for status values
            List<String> validStatuses = List.of("pending", "confirmed", "shipped", "delivered", "canceled");
            if (!validStatuses.contains(dto.getStatus())) {
                return ResponseEntity.badRequest().body("Statut invalide");
            }

            command.setStatus(dto.getStatus());
            Command updatedCommand = commandRepository.save(command);

            return ResponseEntity.ok(updatedCommand);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur serveur: " + e.getMessage());
        }
    }

    @GetMapping("/sorted-by-id")
    public List<Command> getAllCommandsSortedById() {
        return commandRepository.findAllByOrderByIdDesc();
    }
}