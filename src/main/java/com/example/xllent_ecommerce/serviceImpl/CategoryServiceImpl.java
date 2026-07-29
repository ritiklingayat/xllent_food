package com.example.xllent_ecommerce.serviceImpl;

import com.example.xllent_ecommerce.dto.request.CategoryRequest;
import com.example.xllent_ecommerce.dto.response.CategoryResponse;
import com.example.xllent_ecommerce.entity.Category;
import com.example.xllent_ecommerce.entity.Status;
import com.example.xllent_ecommerce.repository.CategoryRepository;
import com.example.xllent_ecommerce.repository.ProductRepository;
import com.example.xllent_ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {

        if (categoryRepository.existsByCategoryName(request.getCategoryName())) {
            throw new RuntimeException("Category already exists.");
        }

        Category category = modelMapper.map(request, Category.class);

        Category savedCategory = categoryRepository.save(category);

        return modelMapper.map(savedCategory, CategoryResponse.class);
    }

    @Override
    public CategoryResponse getCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category not found."));

        return modelMapper.map(category, CategoryResponse.class);
    }

    @Override
    public List<CategoryResponse> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(category -> modelMapper.map(category, CategoryResponse.class))
                .toList();
    }

    @Override
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category not found."));

        category.setCategoryName(request.getCategoryName());

        Category updatedCategory = categoryRepository.save(category);

        return modelMapper.map(updatedCategory, CategoryResponse.class);
    }

    @Override
    public void deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category not found."));

        if (productRepository.existsByCategoryId(id)) {
            throw new RuntimeException(
                    "Cannot delete category. Products are assigned to it."
            );
        }

        categoryRepository.delete(category);
    }

}