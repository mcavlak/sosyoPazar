package com.mcavlak.sosyobazaar.controllers;

import com.mcavlak.sosyobazaar.annotations.Authenticated;
import com.mcavlak.sosyobazaar.annotations.PermitAllCustom;
import com.mcavlak.sosyobazaar.dtos.AddFollowerToSellerDto;
import com.mcavlak.sosyobazaar.dtos.SellerDto;
import com.mcavlak.sosyobazaar.services.SellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

   /* @Authenticated
    @PostMapping("/addFollower")
    public void addFollower(@Valid @RequestBody AddFollowerToSellerDto addFollowerToSellerDto) {
        sellerService.addFollowerToSeller(addFollowerToSellerDto);
    }*/


    @GetMapping
    public ResponseEntity<List<SellerDto>> findAllByProvinceId(@RequestParam(name = "provinceId") Long provinceId) {
        return ResponseEntity.ok(sellerService.findAllByProvinceId(provinceId));
    }


}
