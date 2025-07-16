package com.aymen.iss.maroc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Command {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    private String fullName;
    private String productName;
    private String price;
    private String date;
    private String status;

   //Getters

   public String getFullName(){
       return this.fullName;
   }

   public String getProductName(){
       return this.productName;
   }

   public String getPrice(){
       return this.price;
   }

   public String getDate(){
       return this.date;
   }

   public String getStatus(){
       return this.status;
   }

   //Setters

    public void setFullName(String fullName){
       this.fullName = fullName;
    }

    public void setProductName(String productName){
       this.productName = productName;
    }

    public void setPrice(String price){
       this.price = price;
    }

    public void setDate(String date){
       this.date = date;
    }

    public void setStatus(String status){
       this.status = status;
    }
}
