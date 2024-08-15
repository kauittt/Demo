package com.demo.demo.services;

import com.demo.demo.models.Customer;
import com.demo.demo.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public boolean addCustomer(Customer customer) {
        try{
            customerRepository.save(customer);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
}
