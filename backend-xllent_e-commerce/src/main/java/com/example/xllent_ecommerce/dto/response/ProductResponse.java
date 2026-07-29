package com.example.xllent_ecommerce.dto.response;

import com.example.xllent_ecommerce.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Long id;

    private String productName;

    private String description;

    private Long categoryId;

    private String category;

    private String imageUrl;

    private BigDecimal mrp;

    private BigDecimal gst;

    /*
     * Base prices entered by Super Admin.
     * These are required when editing the product.
     */
    private BigDecimal superStockistPrice;

    private BigDecimal distributorPrice;

    private BigDecimal shopPrice;

    /*
     * GST-inclusive prices shown in dashboard.
     */
    private BigDecimal finalSuperStockistPrice;

    private BigDecimal finalDistributorPrice;

    private BigDecimal finalShopPrice;

    private Long pieces;

    private Long packets;

    private Long stock_Cartons;

    private Status status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}