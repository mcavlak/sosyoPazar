package com.mcavlak.sosyobazaar.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerDto {

    private Long id;
    private String storeName;
    private ProvinceDto province;
    private IndustryResponseDto industry;

}
