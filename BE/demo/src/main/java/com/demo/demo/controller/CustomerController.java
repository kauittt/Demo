package com.demo.demo.controller;

import com.demo.demo.dto.ContactDTO;
import com.demo.demo.dto.CustomerDTO;
import com.demo.demo.entity.Customer;
import com.demo.demo.service.CustomerService;
import com.demo.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    private final CustomerService customerService;
    private final UserService userService;

    @Autowired
    public CustomerController(CustomerService customerService, UserService userService) {
        this.customerService = customerService;
        this.userService = userService;
    }

    @GetMapping(value = "")
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        List<Customer> customers = customerService.findAll();
        List<CustomerDTO> customerDTOs = customers.stream()
                .map(customer -> new CustomerDTO(customer.getId(), customer.getName(),customer.getPhone(),customer.getPrice(),new ContactDTO(customer.getUser().getId(),customer.getUser().getName())))
                .collect(Collectors.toList());
        return ResponseEntity.ok(customerDTOs);
    }

    @PostMapping(value = "")
    public ResponseEntity<?> addCustomer(@RequestBody CustomerDTO customer) {
        try {
            return ResponseEntity.ok(customerService.add(customer));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping(value = "")
    public ResponseEntity<?> updateCustomer(@RequestBody CustomerDTO customer) {
        try {
            return ResponseEntity.ok(customerService.update(customer));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable String id) {
        boolean isDeleted = customerService.delete(id);
        if (isDeleted) {
            return ResponseEntity.ok("Customer deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer deleted fail");
        }
    }
    @GetMapping(value = "/all_contact")
    public ResponseEntity<List<ContactDTO>> contacts() {
        return ResponseEntity.ok(customerService.getAllContact());
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<CustomerDTO>> searchCustomer(@RequestParam String keyword) {
        List<Customer> customers = customerService.findByIdOrName(keyword);
        List<CustomerDTO> customerDTOs = customers.stream()
                .map(customer -> new CustomerDTO(customer.getId(), customer.getName(),customer.getPhone(),customer.getPrice(),new ContactDTO(customer.getUser().getId(),customer.getUser().getName())))
                .collect(Collectors.toList());
        return ResponseEntity.ok(customerDTOs);
    }
}
