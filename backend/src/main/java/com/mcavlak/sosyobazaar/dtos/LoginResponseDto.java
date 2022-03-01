package com.mcavlak.sosyobazaar.dtos;

import lombok.Getter;

@Getter
public class LoginResponseDto {

    private final String username;
    private final String token;

    public LoginResponseDto(String username, String token) {
        this.username = username;
        this.token = token;
    }
}
