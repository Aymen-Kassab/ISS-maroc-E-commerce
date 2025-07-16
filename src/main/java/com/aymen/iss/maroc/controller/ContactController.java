package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Contact;
import com.aymen.iss.maroc.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*") //Allow frontend to connect
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    //Post - save new contact
    @PostMapping
    public Contact createContact(@RequestBody Contact contact){
        return contactRepository.save(contact);
    }

    //Get - get all contacts
    @GetMapping
    public List<Contact> getAllContact(){
        return contactRepository.findAll();
    }
    
}
