package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Admin;
import com.aymen.iss.maroc.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> requestData) {
        try {
            String email = requestData.get("email");
            String password = requestData.get("password");

            // Validate input
            if (email == null || password == null) {
                return ResponseEntity.badRequest().body("Email and password are required");
            }

            if (adminRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.badRequest().body("Email already exists");
            }

            Admin admin = new Admin();
            admin.setEmail(email);
            admin.setPassword(passwordEncoder.encode(password));

            adminRepository.save(admin);
            return ResponseEntity.ok("Signup successful");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String rawPassword = credentials.get("password");

            // Input validation
            if (email == null || rawPassword == null) {
                return ResponseEntity.badRequest().body("Email and password are required");
            }

            Optional<Admin> adminOpt = adminRepository.findByEmail(email);

            if (adminOpt.isEmpty()) {
                return ResponseEntity.status(401).body("Invalid credentials");
            }

            Admin admin = adminOpt.get();

            if (!passwordEncoder.matches(rawPassword, admin.getPassword())) {
                return ResponseEntity.status(401).body("Invalid credentials");
            }

            // Successful login
            return ResponseEntity.ok().body(Map.of(
                    "message", "Login successful",
                    "email", admin.getEmail()
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Login failed: " + e.getMessage());
        }
    }

    // Add this temporary endpoint to test DB connection
    @GetMapping("/test-db")
    public String testDb() {
        try {
            Admin testAdmin = new Admin();
            testAdmin.setEmail("dbtest@test.com");
            testAdmin.setPassword(passwordEncoder.encode("test123"));
            adminRepository.save(testAdmin);
            return "DB WORKING! Check your PostgreSQL now!";
        } catch (Exception e) {
            return "DB ERROR: " + e.getMessage();
        }
    }
}
