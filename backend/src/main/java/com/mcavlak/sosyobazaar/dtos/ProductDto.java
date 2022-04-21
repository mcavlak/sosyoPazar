package com.mcavlak.sosyobazaar.dtos;

import com.mcavlak.sosyobazaar.models.entities.users.Seller;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Lob;

@Getter
@Setter
@NoArgsConstructor
public class ProductDto extends BaseDto {

    private String fileName;
    private String productName;
    private String type;
    @Lob
    private byte[] productPhoto;

    //todo burasını sonradan düzenle.
    private Seller contentOwner;

}
