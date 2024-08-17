package com.demo.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CustomerDTO {
    private String id;
    private String name;
    private String phone;
    private String price;
    private ContactDTO contact;
}
