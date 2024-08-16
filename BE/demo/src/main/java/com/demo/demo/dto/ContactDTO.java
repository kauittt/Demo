package com.demo.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SecondaryRow;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@SecondaryRow
public class ContactDTO {
    private String id;
    private String name;
}
