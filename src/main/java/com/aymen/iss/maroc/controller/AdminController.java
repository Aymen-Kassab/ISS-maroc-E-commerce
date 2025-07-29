package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Admin;
import com.aymen.iss.maroc.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.lang.classfile.Opcode;
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
    public ResponseEntity<?> signup(@RequestBody Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword())); //Bcrypt encryption algorithm
        adminRepository.save(admin);
        return ResponseEntity.ok("Admin registered.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin request) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(request.getEmail());

        if (adminRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(400).body("Email already registered.");
        }

        if (adminOpt.isPresent() && passwordEncoder.matches(request.getPassword(), adminOpt.get().getPassword())) {
            return ResponseEntity.ok("Login success");
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
