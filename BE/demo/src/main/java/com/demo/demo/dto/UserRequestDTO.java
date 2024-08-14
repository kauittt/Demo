package com.demo.demo.dto;

import jakarta.persistence.Column;
import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDTO {
    private String username;
    private String password;
    private String email;
    private String name;
    private String phone;
    private String address;
}
