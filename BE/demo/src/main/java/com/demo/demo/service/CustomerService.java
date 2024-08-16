package com.demo.demo.service;

import com.demo.demo.dto.ContactDTO;
import com.demo.demo.dto.CustomerDTO;
import com.demo.demo.entity.Customer;
import com.demo.demo.entity.User;
import com.demo.demo.repository.CustomerRepository;
import com.demo.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<Customer> findByIdOrName(String keyword) {
        return customerRepository.findByIdOrNameContaining(keyword);
    }

    public CustomerDTO add(CustomerDTO customerDTO) {
        if (customerRepository.findById(customerDTO.getId()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "ID already exists: " + customerDTO.getId());
        }

        if (customerDTO.getId() == null || customerDTO.getId().isEmpty()) {
            String newId = generateNextId();
            customerDTO.setId(newId);
        }

        Customer customer = new Customer(customerDTO.getId(), customerDTO.getName(), customerDTO.getPhone(), customerDTO.getPrice(),
                userRepository.findById(customerDTO.getContact()).orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"))
        );

        Customer savedCustomer = customerRepository.save(customer);

        return new CustomerDTO(savedCustomer.getId(),savedCustomer.getName(), savedCustomer.getPhone(),savedCustomer.getPrice(), savedCustomer.getUser().getName()
        );
    }
    public Customer update(Customer customer) {
        return customerRepository.save(customer);
    }
    public boolean delete(Customer customer) {
        if (customerRepository.existsById(customer.getId())) {
            customerRepository.deleteById(customer.getId());
            return true;
        }
        return false;
    }

    public List<ContactDTO> getAllContact() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ContactDTO convertToDTO(User user) {
        return new ContactDTO(user.getId(), user.getName());
    }

    private String generateNextId() {
        Optional<String> maxId = customerRepository.findMaxId();
        int max = maxId.map(id -> Integer.parseInt(id.replace("cus", ""))).orElse(0);

        int nextId = max + 1;
        return String.format("cus%03d", nextId);
    }
}
