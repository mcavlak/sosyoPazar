package com.mcavlak.sosyobazaar.services;

import com.mcavlak.sosyobazaar.dtos.ProductDto;
import com.mcavlak.sosyobazaar.dtos.ProductSaveDto;

import java.util.List;

public interface ProductService {

    void save(ProductSaveDto productSaveDto);

    ProductDto getByProductId(Long productId);

    List<ProductDto> findAllByContentOwnerId(Long contentOwnerId);

}
