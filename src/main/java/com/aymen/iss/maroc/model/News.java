package com.aymen.iss.maroc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    private String imageUrl;

    // Constractor

    public News() {}

    public News(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // Getter

    public long getId(){
        return this.id;
    }

    public String getImageUrl(){
        return this.imageUrl;
    }

    // Setter

    public void setImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
    }

}
