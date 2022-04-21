package com.mcavlak.sosyobazaar.controllers;

import com.mcavlak.sosyobazaar.annotations.PermitAllCustom;
import com.mcavlak.sosyobazaar.dtos.ProductDto;
import com.mcavlak.sosyobazaar.dtos.ProductSaveDto;
import com.mcavlak.sosyobazaar.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin
@PermitAllCustom
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public void save(@Valid @RequestBody ProductSaveDto productSaveDto) {
        productService.save(productSaveDto);
    }

    @GetMapping
    public ResponseEntity<ProductDto> getWithFileByProductId(@RequestParam Long productId) {
        return ResponseEntity.ok(productService.getByProductId(productId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> findAllProductByContentOwnerId(@RequestParam Long contentOwnerId) {
        return ResponseEntity.ok(productService.findAllByContentOwnerId(contentOwnerId));
    }


}
