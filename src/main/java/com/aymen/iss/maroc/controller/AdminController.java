package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.dto.LoginRequest;
import com.aymen.iss.maroc.dto.LoginResponse;
import com.aymen.iss.maroc.model.Admin;
import com.aymen.iss.maroc.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@Validated @RequestBody Admin admin) {
        // Check if email already exists
        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Check if username already exists
        if (adminRepository.findByUsername(admin.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        // Create new admin account
        Admin newAdmin = new Admin(
                admin.getUsername(),
                admin.getEmail(),
                passwordEncoder.encode(admin.getPassword())
        );

        adminRepository.save(newAdmin);

        return ResponseEntity.ok("Admin registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateAdmin(@Validated @RequestBody LoginRequest loginRequest) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(loginRequest.getEmail());

        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Error: Invalid email or password");
        }

        Admin admin = adminOpt.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), admin.getPassword())) {
            return ResponseEntity.status(401).body("Error: Invalid email or password");
        }

        // Create response with admin details
        LoginResponse response = new LoginResponse(
                "Login successful",
                admin.getUsername(),
                admin.getEmail()
        );

        return ResponseEntity.ok(response);
    }
}