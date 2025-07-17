package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Contact;
import com.aymen.iss.maroc.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*") //Allow frontend to connect
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    //Post - save new contact
    @PostMapping
    public ResponseEntity<Map<String, String>> createContact(@RequestBody Contact contact){
        contactRepository.save(contact);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Message received");
        return ResponseEntity.ok(response);
    }

    //Get - get all contacts
    @GetMapping
    public List<Contact> getAllContact(){
        return contactRepository.findAll();
    }
}
