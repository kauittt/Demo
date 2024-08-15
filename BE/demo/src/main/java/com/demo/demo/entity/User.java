package com.demo.demo.entity;

import com.demo.demo.dto.UserRequestDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Column(name = "id")
    @Id
    private String id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "enabled")
    private Integer enabled;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "users_authorities",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "authorityId")
    )
    private List<Authority> authorities;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Customer> customers;

    public User(UserRequestDTO userRequestDTO) {
        this.id = GenerateID.generateID();
        this.username = userRequestDTO.getUsername();
        this.password = userRequestDTO.getPassword();
        this.email = userRequestDTO.getEmail();
        this.name = userRequestDTO.getName();
        this.phone = userRequestDTO.getPhone();
        this.address = userRequestDTO.getAddress();
        this.enabled = 1;
        this.authorities = new ArrayList<>();
        this.customers = new ArrayList<>();
    }
}
