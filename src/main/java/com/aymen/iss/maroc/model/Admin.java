package com.aymen.iss.maroc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)

    private long id;
    private String username;
    private String email;
    private String password;
}
