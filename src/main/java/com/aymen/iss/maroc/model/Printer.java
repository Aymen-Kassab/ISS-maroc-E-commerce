package com.aymen.iss.maroc.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Printer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String brand;
    private String speedPrinting;
    private String resolution;
    private String workCycle;
    private String rectoVerso;
    private String price;
    private String stock;
    private String connectivity;

    @ElementCollection
    @CollectionTable(name = "printer_images", joinColumns = @JoinColumn(name = "printer_id"))
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

    public String getSpeedPrinting(){
        return this.speedPrinting;
    }

    public String getResolution(){
        return this.resolution;
    }

    public String getWorkCycle(){
        return this.workCycle;
    }

    public String getRectoVerso(){
        return this.rectoVerso;
    }

    public String getPrice(){
        return this.price;
    }

    public String getStock(){
        return this.stock;
    }

    public String getConnectivity(){
        return this.connectivity;
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

    public void setSpeedPrinting(String speedPrinting){
        this.speedPrinting = speedPrinting;
    }

    public void setResolution(String resolution){
        this.resolution = resolution;
    }

    public void setWorkCycle(String workCycle){
        this.workCycle = workCycle;
    }

    public void setRectoVerso(String rectoVerso){
        this.rectoVerso = rectoVerso;
    }

    public void setPrice(String price){
        this.price = price;
    }

    public void setStock(String stock){
        this.stock = stock;
    }

    public void setConnectivity(String connectivity){
        this.connectivity = connectivity;
    }

    public void setImageUrls(List<String> imageUrls){
        this.imageUrls = imageUrls;
    }
}