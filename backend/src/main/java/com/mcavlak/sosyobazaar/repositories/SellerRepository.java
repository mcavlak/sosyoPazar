package com.mcavlak.sosyobazaar.repositories;

import com.mcavlak.sosyobazaar.dtos.SellerDto;
import com.mcavlak.sosyobazaar.models.entities.users.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    boolean existsByStoreName(String storeName);

    List<Seller> findAllByProvince_Id(Long provinceId);


}
