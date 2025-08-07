package com.aymen.iss.maroc.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Network {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String brand;
    private String model;
    private String type;
    private String description;
    private String price;
    private String stock;

    @ElementCollection
    @CollectionTable(name = "network_images", joinColumns = @JoinColumn(name = "network_id"))
    @Column(name = "imageUrl")
    private List<String> imageUrls = new ArrayList<>();

    // Getters

    public long getId(){
        return this.id;
    }

    public String getName(){
        return this.name;
    }

    public String getBrand(){
        return this.brand;
    }

    public String getModel(){
        return this.model;
    }

    public String getType(){
        return this.type;
    }

    public String getDescription(){
        return this.description;
    }

    public String getPrice(){
        return this.price;
    }

    public String getStock(){
        return this.stock;
    }

    public List<String> getImageUrls(){
        return this.imageUrls;
    }
    // Setters

    public void setId(long id){
        this.id = id;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setBrand(String brand){
        this.brand = brand;
    }

    public void setModel(String model){
        this.model = model;
    }

    public void setType(String type){
        this.type = type;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public void setPrice(String price){
        this.price = price;
    }

    public void setStock(String stock){
        this.stock = stock;
    }

    public void setImageUrls(List<String> imageUrls){
        this.imageUrls = imageUrls;
    }
}
