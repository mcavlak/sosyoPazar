package com.mcavlak.sosyobazaar.models.entities;

import com.mcavlak.sosyobazaar.models.entities.abstracts.LocalDateTimeEntity;
import com.mcavlak.sosyobazaar.models.entities.users.Seller;
import com.mcavlak.sosyobazaar.utils.SecurityContextUtil;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter(AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends LocalDateTimeEntity {

    private String fileName;
    private String productName;
    private String type;
    @Lob
    private byte[] productPhoto;
    @ManyToOne
    private Seller contentOwner;

    public static Product create(String fileName, String productName, String type, byte[] productPhoto) {
        Product product = new Product();
        product.fileName = fileName;
        product.productName = productName;
        product.type = type;
        product.productPhoto = productPhoto;
        product.contentOwner = SecurityContextUtil.getCurrentSeller();
        return product;
    }

}
