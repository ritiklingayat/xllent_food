package com.example.xllent_ecommerce.repository;

import com.example.xllent_ecommerce.entity.Category;
import java.util.Optional;
import com.example.xllent_ecommerce.entity.Product;
import com.example.xllent_ecommerce.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(Category category);

    boolean existsByProductName(String productName);

    boolean existsByCategoryId(Long categoryId);

    Optional<Product> findByProductName(String productName);
}