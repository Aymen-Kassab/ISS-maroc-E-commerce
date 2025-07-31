package com.aymen.iss.maroc.dto;

public class LoginRequest {

    private String email;
    private String password;

    //Getters
    public String getEmail(){
        return this.email;
    }

    public String getPassword(){
        return this.password;
    }

    //Setters
    public void setEmail(String email){
        this.email = email;
    }

    public void setPassword(String password){
        this.password = password;
    }
}
