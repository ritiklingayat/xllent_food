package com.example.xllent_ecommerce.dto.request;

import com.example.xllent_ecommerce.entity.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CategoryRequest {

    @NotBlank(message = "Category name is required")
    private String categoryName;

    @NotNull(message = "Status is required") // Add this validation
    private Status status;

}