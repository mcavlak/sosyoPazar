package com.mcavlak.sosyobazaar.controllers;

import com.mcavlak.sosyobazaar.annotations.Authenticated;
import com.mcavlak.sosyobazaar.annotations.PermitAllCustom;
import com.mcavlak.sosyobazaar.dtos.CustomerRegisterRequestDto;
import com.mcavlak.sosyobazaar.dtos.LoginRequestDto;
import com.mcavlak.sosyobazaar.dtos.LoginResponseDto;
import com.mcavlak.sosyobazaar.dtos.SellerRegisterRequestDto;
import com.mcavlak.sosyobazaar.services.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/account")
@CrossOrigin
@Authenticated
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/login")
    @PermitAllCustom
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        return ResponseEntity.ok(accountService.login(loginRequestDto));
    }


    @PostMapping("/register/customer")
    @PermitAllCustom
    public void registerCustomer(@Valid @RequestBody CustomerRegisterRequestDto customerRegisterRequestDto) {
        accountService.registerCustomer(customerRegisterRequestDto);
    }

    @PostMapping("/register/seller")
    @PermitAllCustom
    public void registerSeller(@Valid @RequestBody SellerRegisterRequestDto sellerRegisterRequestDto) {
        accountService.registerSeller(sellerRegisterRequestDto);
    }


}
