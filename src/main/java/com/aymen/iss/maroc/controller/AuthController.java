package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Admin;
import com.aymen.iss.maroc.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public RedirectView register(@ModelAttribute Admin admin) {
        System.out.println("SIGNUP method called");
        System.out.println("Received admin: " + admin.getUsername() + ", " + admin.getEmail());

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);

        return new RedirectView("/admin_login.html");
    }

    @PostMapping("/api/admin/check")
    public ResponseEntity<Map<String, String>> checkAdmin(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");

        if (adminRepository.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Le nom d'utilisateur est déjà pris."));
        }

        if (adminRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "L'email est déjà utilisé."));
        }

        return ResponseEntity.ok(Map.of("message", "Disponible"));
    }
}
