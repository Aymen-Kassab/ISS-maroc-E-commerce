package com.aymen.iss.maroc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Computer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    private String name;
    private String brand;
    private String type;
    private String processor;
    private String memory;
    private String storage;
    private String storageType;
    private String price;
    private String stock;

    @ElementCollection
    @CollectionTable(name = "computer_images", joinColumns = @JoinColumn(name = "computer_id"))
    @Column(name = "imageUrl")
    private List<String> imageUrls = new ArrayList<>();

    // Getters methods

    public long getId() {
        return this.id;
    }

    public String getName(){
        return this.name;
    }

    public String getBrand(){
        return this.brand;
    }

    public String getType(){
        return this.type;
    }

    public String getProcessor(){
        return this.processor;
    }

    public String getMemory(){
        return this.memory;
    }

    public String getStorage(){
        return this.storage;
    }

    public String getStorageType(){
        return this.storageType;
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

    // Setters methods

    public void setName(String name){
        this.name = name;
    }

    public void setBrand(String brand){
        this.brand = brand;
    }

    public void setType(String type){
        this.type = type;
    }

    public void setProcessor(String processor){
        this.processor = processor;
    }

    public void setMemory(String memory){
        this.memory = memory;
    }

    public void setStorage(String storage){
        this.storage =  storage;
    }

    public void setStorageType(String storageType){
        this.storageType = storageType;
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