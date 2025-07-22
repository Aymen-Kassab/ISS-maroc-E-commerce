package com.aymen.iss.maroc.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(indexes = @Index(name = "idx_status_date", columnList = "status, date"))
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

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String status = "pending";

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

   public LocalDate getDate(){
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

    public void setDate(LocalDate date){
       this.date = date;
    }

    public void setStatus(String status){
       this.status = status;
    }
}