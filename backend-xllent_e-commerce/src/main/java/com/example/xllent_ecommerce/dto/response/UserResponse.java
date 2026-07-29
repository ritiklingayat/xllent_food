package com.example.xllent_ecommerce.dto.response;

import com.example.xllent_ecommerce.entity.Role;
import com.example.xllent_ecommerce.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String company;

    private String email;

    private String mobile;

    private String gender;

    private Status status;

    private Role role;

    private String state;

    private String district;

    private String city;

    private String pincode;

    private String address;

    private String aadhaarCard;

    private String panCard;

    private String profileImage;

    private Long parentId;

    private String parentName;

    private Role parentRole;

}