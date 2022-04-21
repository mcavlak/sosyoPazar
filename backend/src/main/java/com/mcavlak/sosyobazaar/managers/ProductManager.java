package com.mcavlak.sosyobazaar.managers;

import com.mcavlak.sosyobazaar.dtos.ProductDto;
import com.mcavlak.sosyobazaar.dtos.ProductSaveDto;
import com.mcavlak.sosyobazaar.exception.EntityNotFoundException;
import com.mcavlak.sosyobazaar.mappers.ProductMapper;
import com.mcavlak.sosyobazaar.models.entities.Product;
import com.mcavlak.sosyobazaar.repositories.ProductRepository;
import com.mcavlak.sosyobazaar.services.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class ProductManager implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductManager(ProductRepository productRepository,
                          ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public void save(ProductSaveDto productSaveDto) {

        String fileName = StringUtils.cleanPath(Objects.requireNonNull(productSaveDto.getFile().getOriginalFilename()));
        try {
            Product product = Product.create(fileName, productSaveDto.getProductName(), productSaveDto.getFile().getContentType(), productSaveDto.getFile().getBytes());
            productRepository.save(product);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public ProductDto getByProductId(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return productMapper.entityToDto(optionalProduct.orElseThrow(() -> new EntityNotFoundException("Ürün bulunamadı.")));
    }

    @Override
    public List<ProductDto> findAllByContentOwnerId(Long contentOwnerId) {
        return productMapper.entityListToDtoList(productRepository.findByContentOwner_Id(contentOwnerId));
    }


}
