package com.demo.demo.service;

import com.demo.demo.entity.Customer;
import com.demo.demo.repository.CustomerRepository;
import com.demo.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository, UserRepository userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    public List<Customer> findAll() {
        return  customerRepository.findAll();
    }

    public Optional<Customer> findById(String id) {
        return customerRepository.findById(id);
    }
    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }
    public void delete(Customer customer) {
        customerRepository.delete(customer);
    }
    public void deleteById(String id) {
        customerRepository.deleteById(id);
    }
}
