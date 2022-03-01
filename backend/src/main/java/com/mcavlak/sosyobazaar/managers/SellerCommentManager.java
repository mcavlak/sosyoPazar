package com.mcavlak.sosyobazaar.managers;

import com.mcavlak.sosyobazaar.dtos.AverageScoreDto;
import com.mcavlak.sosyobazaar.dtos.SaveSellerCommentDto;
import com.mcavlak.sosyobazaar.dtos.SellerCommentDto;
import com.mcavlak.sosyobazaar.mappers.SellerCommentMapper;
import com.mcavlak.sosyobazaar.models.entities.SellerComment;
import com.mcavlak.sosyobazaar.models.entities.users.Seller;
import com.mcavlak.sosyobazaar.repositories.SellerCommentRepository;
import com.mcavlak.sosyobazaar.services.SellerCommentService;
import com.mcavlak.sosyobazaar.services.SellerService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@Transactional
public class SellerCommentManager implements SellerCommentService {

    private final SellerCommentRepository sellerCommentRepository;
    private final SellerService sellerService;
    private final SellerCommentMapper sellerCommentMapper;

    public SellerCommentManager(SellerCommentRepository sellerCommentRepository,
                                SellerService sellerService,
                                SellerCommentMapper sellerCommentMapper) {
        this.sellerCommentRepository = sellerCommentRepository;
        this.sellerService = sellerService;
        this.sellerCommentMapper = sellerCommentMapper;
    }


    @Override
    public void save(SaveSellerCommentDto saveSellerCommentDto) {

        Seller seller = sellerService.findDataById(saveSellerCommentDto.getSellerId());
        sellerCommentRepository.save(SellerComment.create(seller, saveSellerCommentDto.getComment(), saveSellerCommentDto.getScore()));
    }

    @Override
    public List<SellerCommentDto> findAllBySellerId(Long sellerId) {

        return sellerCommentMapper.entityListToDtoList(sellerCommentRepository.findBySeller_IdOrderByCreatedDateTimeDesc(sellerId));

    }

    @Override
    public AverageScoreDto getAverageScoreBySellerId(Long sellerId) {

        Seller seller = sellerService.findDataById(sellerId);

        List<SellerComment> sellerCommentList = sellerCommentRepository.findBySeller_IdOrderByCreatedDateTimeDesc(sellerId);

        int size = sellerCommentList.size();

        BigDecimal totalScore = sellerCommentList.stream().map(SellerComment::getScore).reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal averageScore = totalScore.divide(new BigDecimal(size), 1, RoundingMode.HALF_UP);

        return new AverageScoreDto(seller.getId(), averageScore);

    }

}
