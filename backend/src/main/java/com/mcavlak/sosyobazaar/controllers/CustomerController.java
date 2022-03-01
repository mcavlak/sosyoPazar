package com.mcavlak.sosyobazaar.controllers;

import com.mcavlak.sosyobazaar.annotations.Authenticated;
import com.mcavlak.sosyobazaar.annotations.OnlyCustomer;
import com.mcavlak.sosyobazaar.dtos.FollowSellerDto;
import com.mcavlak.sosyobazaar.services.CustomerService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin
@Authenticated
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/follow")
    @OnlyCustomer
    public void followSeller(@RequestBody FollowSellerDto followSellerDto) {
        customerService.followSeller(followSellerDto);
    }
}
