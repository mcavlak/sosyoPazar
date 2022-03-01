package com.mcavlak.sosyobazaar.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Lob;
import java.time.LocalDateTime;

@Getter
@Setter
public class PostDto {

    @Lob
    private String content;
    private SellerDto contentOwner;
    private LocalDateTime createdDateTime;

}
