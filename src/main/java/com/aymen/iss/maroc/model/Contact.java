package com.aymen.iss.maroc.model;

import jakarta.persistence.*;

@Entity
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String subject;

    @Lob
    private String message;

    // Getters

    public String getFirstName(){
        return this.firstName;
    }

    public String getLastName(){
        return this.lastName;
    }

    public String getEmail(){
        return this.email;
    }

    public String getPhoneNumber(){
        return this.phoneNumber;
    }

    public String getSubject(){
        return this.subject;
    }

    // Setters

    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public void setSubject(String subject){
        this.subject = subject;
    }
}
