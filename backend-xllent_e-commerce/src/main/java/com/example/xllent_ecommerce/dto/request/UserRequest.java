package com.example.xllent_ecommerce.dto.request;

import com.example.xllent_ecommerce.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserRequest {

    @NotBlank
    private String firstName;

    private String lastName;

    private String company;

    private String gstino;

    @NotNull
    private String panCard;

    @NotNull
    private String aadhaarCard;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String mobile;

    @NotBlank
    private String password;

    private String gender;

    private Role role;

    private String state;

    private String district;

    private String city;

    private String pincode;

    private String address;

    private Long parentId;

    private MultipartFile profileImage;
}