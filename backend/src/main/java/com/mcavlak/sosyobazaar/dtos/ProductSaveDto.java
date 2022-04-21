package com.mcavlak.sosyobazaar.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ProductSaveDto {

    @NotNull
    private MultipartFile file;

    @NotNull
    private String productName;


}
