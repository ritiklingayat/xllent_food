package com.example.xllent_ecommerce.dto.request;

import com.example.xllent_ecommerce.entity.Status;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    @NotBlank(message = "Product name is required")
    private String productName;

    private String description;

    @NotNull(message = "Category is required")
    private Long categoryId;

    private MultipartFile image;

    @NotNull(message = "MRP is required")
    @DecimalMin(
            value = "0.0",
            inclusive = true,
            message = "MRP cannot be negative"
    )
    private BigDecimal mrp;

    @NotNull(message = "GST is required")
    @DecimalMin(
            value = "0.0",
            inclusive = true,
            message = "GST cannot be negative"
    )
    private BigDecimal gst;

    @NotNull(message = "Super stockist price is required")
    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal superStockistPrice;

    @NotNull(message = "Distributor price is required")
    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal distributorPrice;

    @NotNull(message = "Shop price is required")
    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal shopPrice;

    @NotNull(message = "Pieces are required")
    @Min(value = 0, message = "Pieces cannot be negative")
    private Long pieces;

    @NotNull(message = "Packets are required")
    @Min(value = 0, message = "Packets cannot be negative")
    private Long packets;

    @NotNull(message = "Stock cartons are required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Long stock_Cartons;

    @NotNull(message = "Status is required")
    private Status status;
}