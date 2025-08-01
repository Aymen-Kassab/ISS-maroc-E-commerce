package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Admin;
import com.aymen.iss.maroc.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@Controller
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

}
