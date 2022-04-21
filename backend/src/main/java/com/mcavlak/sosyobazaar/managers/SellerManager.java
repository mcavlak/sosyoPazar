package com.mcavlak.sosyobazaar.managers;

import com.mcavlak.sosyobazaar.dtos.SellerDto;
import com.mcavlak.sosyobazaar.exception.EntityNotFoundException;
import com.mcavlak.sosyobazaar.mappers.SellerMapper;
import com.mcavlak.sosyobazaar.models.entities.users.Customer;
import com.mcavlak.sosyobazaar.models.entities.users.Seller;
import com.mcavlak.sosyobazaar.repositories.SellerRepository;
import com.mcavlak.sosyobazaar.services.SellerService;
import com.mcavlak.sosyobazaar.utils.SecurityContextUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

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
        return sellerMapper.entityListToDtoList(sellerRepository.findAllByProvince_Id(provinceId));
    }

    @Override
    public List<SellerDto> findAll() {
        List<SellerDto> list = sellerMapper.entityListToDtoList(sellerRepository.findAll());
        return list;
    }

    @Override
    public SellerDto findBySellerId(Long id) {
        return sellerMapper.entityToDto(sellerRepository.getById(id));
    }

    @Override
    public void addFollowerToSeller(Long id) {
        Customer customer = SecurityContextUtil.getCurrentCustomer();
        Seller seller = sellerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Satıcı bulunamadı."));
        seller.addFollower(customer);
        sellerRepository.save(seller);
    }

    @Override
    public void removeFollowerFromSeller(Long id) {
        Customer me = SecurityContextUtil.getCurrentCustomer();
        Seller seller = sellerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Satıcı bulunamadı."));
        seller.removeFollower(me);
        sellerRepository.save(seller);
    }

    @Override
    public void uploadProfilePhoto(MultipartFile file) {

        Seller seller = SecurityContextUtil.getCurrentSeller();
        if (Objects.nonNull(seller.getProfilePhoto())) {
            deleteProfilePhoto(seller);
        }
        try {
            Objects.requireNonNull(seller).updateProfilePhoto(file);
            sellerRepository.save(seller);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void uploadCoverPhoto(MultipartFile file) {
        Seller seller = SecurityContextUtil.getCurrentSeller();
        if (Objects.nonNull(seller.getProfilePhoto())) {
            deleteCoverPhoto(seller);
        }
        try {
            Objects.requireNonNull(seller).updateCoverPhoto(file);
            sellerRepository.save(seller);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void deleteProfilePhoto(Seller seller) {
        seller.deleteProfilePhoto();
        sellerRepository.save(seller);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void deleteCoverPhoto(Seller seller) {
        seller.deleteCoverPhoto();
        sellerRepository.save(seller);
    }


}
