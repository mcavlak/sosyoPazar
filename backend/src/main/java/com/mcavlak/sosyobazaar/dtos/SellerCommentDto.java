package com.mcavlak.sosyobazaar.dtos;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SellerCommentDto {

    private CustomerDtoForSellerCommentDto customer;
    private SellerDtoForSellerCommentDto seller;
    private String comment;
    private BigDecimal score;

}
