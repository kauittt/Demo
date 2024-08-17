package com.demo.demo.service;

import com.demo.demo.dto.ContactDTO;
import com.demo.demo.dto.CustomerDTO;
import com.demo.demo.entity.Customer;
import com.demo.demo.entity.User;
import com.demo.demo.repository.CustomerRepository;
import com.demo.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
        return customerRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public List<Customer> findByIdOrName(String keyword) {
        String lowerCaseKeyword = keyword.toLowerCase();
        StringBuilder modifiedKeyword = new StringBuilder();
        for (int i = 0; i < keyword.length(); i++) {
            modifiedKeyword.append(lowerCaseKeyword.charAt(i));
            if (i < keyword.length() - 1) {
                modifiedKeyword.append('%');
            }
        }
        return customerRepository.findByIdOrNameContaining(modifiedKeyword.toString());
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
                userRepository.findById(customerDTO.getContact().getId()).orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"))
        );

        Customer savedCustomer = customerRepository.save(customer);

        return new CustomerDTO(savedCustomer.getId(),savedCustomer.getName(), savedCustomer.getPhone(),savedCustomer.getPrice(), new ContactDTO(savedCustomer.getUser().getId(),savedCustomer.getUser().getName())
        );
    }
    public CustomerDTO update(CustomerDTO customerDTO) {
        if (customerRepository.findById(customerDTO.getId()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "ID not found: " + customerDTO.getId());
        }


        Customer customer = new Customer(customerDTO.getId(), customerDTO.getName(), customerDTO.getPhone(), customerDTO.getPrice(),
                userRepository.findById(customerDTO.getContact().getId()).orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"))
        );

        Customer savedCustomer = customerRepository.save(customer);

        return new CustomerDTO(savedCustomer.getId(),savedCustomer.getName(), savedCustomer.getPhone(),savedCustomer.getPrice(), new ContactDTO(savedCustomer.getId(),savedCustomer.getUser().getName())
        );
    }

    public boolean delete(String customerId) {
        if (customerRepository.existsById(customerId)) {
            customerRepository.deleteById(customerId);
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
