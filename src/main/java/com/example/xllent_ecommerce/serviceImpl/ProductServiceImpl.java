package com.example.xllent_ecommerce.serviceImpl;

import com.example.xllent_ecommerce.dto.request.ProductRequest;
import com.example.xllent_ecommerce.dto.response.ProductResponse;
import com.example.xllent_ecommerce.entity.Category;
import com.example.xllent_ecommerce.entity.Product;
import com.example.xllent_ecommerce.repository.CategoryRepository;
import com.example.xllent_ecommerce.repository.ProductRepository;
import com.example.xllent_ecommerce.service.CloudinaryService;
import com.example.xllent_ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CloudinaryService cloudinaryService;

    /*
    ==========================================
    ADD PRODUCT
    ==========================================
    */

    @Override
    public ProductResponse addProduct(ProductRequest request) {

        String productName = request.getProductName().trim();

        if (productRepository.existsByProductName(productName)) {
            throw new RuntimeException("Product already exists.");
        }

        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException("Category not found."));

        Product product = new Product();

        /*
         * This method stores the original base prices
         * entered by the Super Admin.
         */
        copyRequestToProduct(
                request,
                product,
                category
        );

        try {

            if (request.getImage() != null &&
                    !request.getImage().isEmpty()) {

                String imageUrl =
                        cloudinaryService.uploadImage(
                                request.getImage()
                        );

                product.setImageUrl(imageUrl);
            }

        } catch (IOException exception) {

            throw new RuntimeException(
                    "Product image upload failed.",
                    exception
            );
        }

        Product savedProduct =
                productRepository.save(product);

        /*
         * GST-inclusive prices are calculated
         * while preparing the response.
         */
        return mapToResponse(savedProduct);
    }

    /*
    ==========================================
    UPDATE PRODUCT
    ==========================================
    */

    @Override
    public ProductResponse updateProduct(
            Long id,
            ProductRequest request
    ) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found."));

        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException("Category not found."));

        String requestedProductName =
                request.getProductName().trim();

        /*
         * Check duplicate name only when another
         * product already uses the requested name.
         */
        productRepository
                .findByProductName(requestedProductName)
                .ifPresent(existingProduct -> {

                    if (!existingProduct.getId().equals(id)) {
                        throw new RuntimeException(
                                "Another product already uses this name."
                        );
                    }
                });

        /*
         * Update product details while keeping
         * base prices in the database.
         */
        copyRequestToProduct(
                request,
                product,
                category
        );

        try {

            if (request.getImage() != null &&
                    !request.getImage().isEmpty()) {

                if (product.getImageUrl() != null &&
                        !product.getImageUrl().isBlank()) {

                    cloudinaryService.deleteImage(
                            product.getImageUrl()
                    );
                }

                String newImageUrl =
                        cloudinaryService.uploadImage(
                                request.getImage()
                        );

                product.setImageUrl(newImageUrl);
            }

        } catch (IOException exception) {

            throw new RuntimeException(
                    "Product image update failed.",
                    exception
            );
        }

        Product updatedProduct =
                productRepository.save(product);

        return mapToResponse(updatedProduct);
    }

    /*
    ==========================================
    GET PRODUCT BY ID
    ==========================================
    */

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found."));

        return mapToResponse(product);
    }

    /*
    ==========================================
    GET ALL PRODUCTS
    ==========================================
    */

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {

        return productRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /*
    ==========================================
    DELETE PRODUCT
    ==========================================
    */

    @Override
    public void deleteProduct(Long id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found."));

        try {

            if (product.getImageUrl() != null &&
                    !product.getImageUrl().isBlank()) {

                cloudinaryService.deleteImage(
                        product.getImageUrl()
                );
            }

        } catch (IOException exception) {

            throw new RuntimeException(
                    "Unable to delete product image.",
                    exception
            );
        }

        productRepository.delete(product);
    }

    /*
    ==========================================
    COPY REQUEST DATA TO PRODUCT ENTITY
    ==========================================

    Only base prices are stored in the database.

    Example:
    Base Super Stockist Price = 100
    GST = 18

    Database stores:
    superStockistPrice = 100
    gst = 18

    API response gives:
    finalSuperStockistPrice = 118
    */

    private void copyRequestToProduct(
            ProductRequest request,
            Product product,
            Category category
    ) {

        product.setProductName(
                request.getProductName().trim()
        );

        product.setDescription(
                request.getDescription() != null
                        ? request.getDescription().trim()
                        : null
        );

        product.setCategory(category);

        product.setMrp(request.getMrp());

        product.setGst(
                request.getGst() != null
                        ? request.getGst()
                        : BigDecimal.ZERO
        );

        /*
         * Store original prices entered
         * by Super Admin.
         */
        product.setSuperStockistPrice(
                request.getSuperStockistPrice()
        );

        product.setDistributorPrice(
                request.getDistributorPrice()
        );

        product.setShopPrice(
                request.getShopPrice()
        );

        product.setPieces(
                request.getPieces()
        );

        product.setPackets(
                request.getPackets()
        );

        product.setStock_Cartons(
                request.getStock_Cartons()
        );

        product.setStatus(
                request.getStatus()
        );
    }

    /*
    ==========================================
    MAP PRODUCT ENTITY TO API RESPONSE
    ==========================================
    */

    private ProductResponse mapToResponse(
            Product product
    ) {

        BigDecimal gst =
                product.getGst() != null
                        ? product.getGst()
                        : BigDecimal.ZERO;

        /*
         * Calculate GST-inclusive final prices.
         */
        BigDecimal finalSuperStockistPrice =
                calculatePriceWithGst(
                        product.getSuperStockistPrice(),
                        gst
                );

        BigDecimal finalDistributorPrice =
                calculatePriceWithGst(
                        product.getDistributorPrice(),
                        gst
                );

        BigDecimal finalShopPrice =
                calculatePriceWithGst(
                        product.getShopPrice(),
                        gst
                );

        return ProductResponse.builder()
                .id(product.getId())

                .productName(
                        product.getProductName()
                )

                .description(
                        product.getDescription()
                )

                .categoryId(
                        product.getCategory() != null
                                ? product.getCategory().getId()
                                : null
                )

                .category(
                        product.getCategory() != null
                                ? product
                                .getCategory()
                                .getCategoryName()
                                : null
                )

                .imageUrl(
                        product.getImageUrl()
                )

                .mrp(
                        product.getMrp()
                )

                .gst(gst)

                /*
                 * Base prices used by the edit form.
                 */
                .superStockistPrice(
                        product.getSuperStockistPrice()
                )

                .distributorPrice(
                        product.getDistributorPrice()
                )

                .shopPrice(
                        product.getShopPrice()
                )

                /*
                 * GST-inclusive prices used by
                 * the products dashboard.
                 */
                .finalSuperStockistPrice(
                        finalSuperStockistPrice
                )

                .finalDistributorPrice(
                        finalDistributorPrice
                )

                .finalShopPrice(
                        finalShopPrice
                )

                .pieces(
                        product.getPieces()
                )

                .packets(
                        product.getPackets()
                )

                .stock_Cartons(
                        product.getStock_Cartons()
                )

                .status(
                        product.getStatus()
                )

                .createdAt(
                        product.getCreatedAt()
                )

                .updatedAt(
                        product.getUpdatedAt()
                )

                .build();
    }

    /*
    ==========================================
    CALCULATE PRICE INCLUDING GST
    ==========================================

    Formula:

    final price =
    base price + (base price × GST / 100)
    */

    private BigDecimal calculatePriceWithGst(
            BigDecimal basePrice,
            BigDecimal gst
    ) {

        if (basePrice == null) {
            return BigDecimal.ZERO.setScale(
                    2,
                    RoundingMode.HALF_UP
            );
        }

        BigDecimal gstPercentage =
                gst != null
                        ? gst
                        : BigDecimal.ZERO;

        BigDecimal gstAmount = basePrice
                .multiply(gstPercentage)
                .divide(
                        BigDecimal.valueOf(100),
                        2,
                        RoundingMode.HALF_UP
                );

        return basePrice
                .add(gstAmount)
                .setScale(
                        2,
                        RoundingMode.HALF_UP
                );
    }
}