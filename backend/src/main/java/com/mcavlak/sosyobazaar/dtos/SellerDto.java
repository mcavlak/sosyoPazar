package com.mcavlak.sosyobazaar.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mcavlak.sosyobazaar.models.entities.users.Customer;
import com.mcavlak.sosyobazaar.utils.SecurityContextUtil;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Lob;
import java.util.Set;

@Getter
@Setter
public class SellerDto extends UserDto {

    private String storeName;
    private ProvinceDto province;
    private IndustryResponseDto industry;
    private int followersCount;
    @Lob
    private byte[] profilePhoto;

    @Lob
    private byte[] coverPhoto;

    @JsonProperty
    public boolean followed(){
        Customer c = SecurityContextUtil.getCurrentCustomer();
        if(c != null){
            return c.getFollows().stream().anyMatch(seller -> seller.getId() == this.getId());
        }
        return false;
    }
}
