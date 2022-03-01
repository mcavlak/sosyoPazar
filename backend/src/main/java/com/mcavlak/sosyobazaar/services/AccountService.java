package com.mcavlak.sosyobazaar.services;

import com.mcavlak.sosyobazaar.dtos.CustomerRegisterRequestDto;
import com.mcavlak.sosyobazaar.dtos.LoginRequestDto;
import com.mcavlak.sosyobazaar.dtos.LoginResponseDto;
import com.mcavlak.sosyobazaar.dtos.SellerRegisterRequestDto;

public interface AccountService {

    LoginResponseDto login(LoginRequestDto loginRequestDto);

    void registerCustomer(CustomerRegisterRequestDto customerRegisterRequestDto);

    void registerSeller(SellerRegisterRequestDto sellerRegisterRequestDto);

}
