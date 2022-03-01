package com.mcavlak.sosyobazaar.services;

import com.mcavlak.sosyobazaar.dtos.AddFollowerToSellerDto;
import com.mcavlak.sosyobazaar.dtos.SellerDto;
import com.mcavlak.sosyobazaar.models.entities.users.Seller;

import java.util.List;

public interface SellerService {

  //  void addFollowerToSeller(AddFollowerToSellerDto addFollowerToSellerDto);

    Seller findDataById(Long id);

    List<SellerDto> findAllByProvinceId(Long provinceId);

}
