package com.demo.demo.models;

import com.demo.demo.roles.LocationCode;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "customers")
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Column(name = "responsibility_center")
    private String responsibilityCenter;
    @Column(name = "location_code")
    @Enumerated(EnumType.ORDINAL)
    private LocationCode locationCode;
    private String phone;
    private String contact;
    private double balance;
    @Column(name = "balance_due")
    private double balanceDue;
    private double sale;
    private double payment;

}
