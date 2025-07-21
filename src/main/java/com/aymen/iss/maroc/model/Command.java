package com.aymen.iss.maroc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Command {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    private String fullName;
    private String phoneNumber;
    private int quantity;
    private String address;
    private String productName;
    private BigDecimal price;
    private LocalDateTime date;
    private String status;

   //Getters

   public long getId(){
       return this.id;
   }

   public String getFullName(){
       return this.fullName;
   }

   public String getPhoneNumber(){
       return this.phoneNumber;
   }

   public int getQuantity(){
       return this.quantity;
   }

   public String getAddress(){
       return this.address;
   }

   public String getProductName(){
       return this.productName;
   }

   public BigDecimal getPrice(){
       return this.price;
   }

   public LocalDateTime getDate(){
       return this.date;
   }

   public String getStatus(){
       return this.status;
   }

   //Setters

    public void setId(long id){
       this.id = id;
    }

    public void setFullName(String fullName){
       this.fullName = fullName;
    }

    public void setPhoneNumber(String phoneNumber){
       this.phoneNumber = phoneNumber;
    }

    public void setQuantity(int quantity){
       this.quantity = quantity;
    }

    public void setAddress(String address){
       this.address = address;
    }

    public void setProductName(String productName){
       this.productName = productName;
    }

    public void setPrice(BigDecimal price){
       this.price = price;
    }

    public void setDate(LocalDateTime date){
       this.date = date;
    }

    public void setStatus(String status){
       this.status = status;
    }
}
