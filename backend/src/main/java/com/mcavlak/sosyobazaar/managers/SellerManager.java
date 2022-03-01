package com.mcavlak.sosyobazaar.managers;

import com.mcavlak.sosyobazaar.dtos.SellerDto;
import com.mcavlak.sosyobazaar.exception.EntityNotFoundException;
import com.mcavlak.sosyobazaar.mappers.SellerMapper;
import com.mcavlak.sosyobazaar.models.entities.users.Seller;
import com.mcavlak.sosyobazaar.repositories.SellerRepository;
import com.mcavlak.sosyobazaar.services.SellerService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class SellerManager implements SellerService {

    private final SellerRepository sellerRepository;
    private final SellerMapper sellerMapper;


    public SellerManager(SellerRepository sellerRepository,
                         SellerMapper sellerMapper) {
        this.sellerRepository = sellerRepository;
        this.sellerMapper = sellerMapper;
    }

/*
    @Override
    public void addFollowerToSeller(AddFollowerToSellerDto addFollowerToSellerDto) {

        Seller seller = findDataById(addFollowerToSellerDto.getSellerId());

        Set<Customer> followerList = seller.getFollowers();
        followerList.add(SecurityContextUtil.getCurrentCustomer());
        sellerRepository.save(seller);
    }*/

    @Override
    public Seller findDataById(Long id) {
        return sellerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Satıcı bulunamadı."));
    }

    @Override
    public List<SellerDto> findAllByProvinceId(Long provinceId) {
        return sellerMapper.entityListToDtoList(sellerRepository.findByProvince_Id(provinceId));
    }

}
