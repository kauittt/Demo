package com.demo.demo.controllers;

import com.demo.demo.models.Customer;
import com.demo.demo.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController {
    @Autowired
    private CustomerService service;

    public ResponseEntity<Customer> addCustomer(Customer customer) {
        service.addCustomer(customer);
        return ResponseEntity.ok(customer);
    }

    public ResponseEntity<List<Customer>> listCustomer(){
        List<Customer> listC = service.getAllCustomers();
        return new ResponseEntity<>(listC, HttpStatus.OK);
    }
}
