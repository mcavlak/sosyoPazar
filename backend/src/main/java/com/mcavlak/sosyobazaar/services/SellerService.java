package com.mcavlak.sosyobazaar.services;

import com.mcavlak.sosyobazaar.dtos.SellerDto;
import com.mcavlak.sosyobazaar.dtos.SellerWithFollowerDto;
import com.mcavlak.sosyobazaar.models.entities.users.Seller;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SellerService {

  //  void addFollowerToSeller(AddFollowerToSellerDto addFollowerToSellerDto);

    Seller findDataById(Long id);

    List<SellerDto> findAllByProvinceId(Long provinceId);

    List<SellerDto> findAll();

    SellerDto findBySellerId(Long id);

    void addFollowerToSeller(Long id);

    void removeFollowerFromSeller(Long id);

    void uploadProfilePhoto(MultipartFile file);

    void uploadCoverPhoto(MultipartFile file);

    void deleteProfilePhoto(Seller seller);

    void deleteCoverPhoto(Seller seller);

}
