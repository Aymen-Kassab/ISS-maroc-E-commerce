package com.aymen.iss.maroc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    //Getters

    public long getId(){
        return this.id;
    }

    public String getUsername(){
        return this.username;
    }

    public String getEmail(){
        return this.email;
    }

    @JsonIgnore
    public String getPassword(){
        return this.password;
    }

    //Setters

    public void setId(long id){
        this.id = id;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public void setPassword(String password){
        this.password = password;
    }
}
