package com.mcavlak.sosyobazaar.controllers;

import com.mcavlak.sosyobazaar.annotations.Authenticated;
import com.mcavlak.sosyobazaar.annotations.OnlySeller;
import com.mcavlak.sosyobazaar.annotations.PermitAllCustom;
import com.mcavlak.sosyobazaar.dtos.SellerDto;
import com.mcavlak.sosyobazaar.services.SellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/seller")
@CrossOrigin
@PermitAllCustom
public class SellerController {

    private final SellerService sellerService;

    public SellerController(SellerService sellerService) {
        this.sellerService = sellerService;
    }


    @Authenticated
    @PutMapping("/{id}/follow")
    public void follow(@PathVariable Long id) {
        sellerService.addFollowerToSeller(id);
    }

    @Authenticated
    @PutMapping("/{id}/unfollow")
    public void unfollow(@PathVariable Long id) {
        sellerService.removeFollowerFromSeller(id);
    }

    @GetMapping
    public ResponseEntity<List<SellerDto>> findAll() {
        return ResponseEntity.ok(sellerService.findAll());
    }

    @GetMapping("/province/{provinceId}")
    public ResponseEntity<List<SellerDto>> findAllByProvinceId(@PathVariable Long provinceId) {
        return ResponseEntity.ok(sellerService.findAllByProvinceId(provinceId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SellerDto> findBySellerId(@PathVariable Long id) {
        return ResponseEntity.ok(sellerService.findBySellerId(id));
    }

    @PutMapping("/upload/profilePhoto")
    @OnlySeller
    public void uploadProfilePhoto(@RequestParam(name = "file") MultipartFile file) {
        sellerService.uploadProfilePhoto(file);
    }

    @PutMapping("/upload/coverPhoto")
    @OnlySeller
    public void uploadCoverPhoto(@RequestParam(name = "file") MultipartFile file) {
        sellerService.uploadCoverPhoto(file);
    }


}
