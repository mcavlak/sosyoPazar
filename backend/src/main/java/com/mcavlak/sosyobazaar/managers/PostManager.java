package com.mcavlak.sosyobazaar.managers;

import com.mcavlak.sosyobazaar.dtos.PostDto;
import com.mcavlak.sosyobazaar.dtos.PostSaveDto;
import com.mcavlak.sosyobazaar.mappers.PostMapper;
import com.mcavlak.sosyobazaar.models.entities.Post;
import com.mcavlak.sosyobazaar.models.entities.users.Customer;
import com.mcavlak.sosyobazaar.models.entities.users.Seller;
import com.mcavlak.sosyobazaar.repositories.PostRepository;
import com.mcavlak.sosyobazaar.services.PostService;
import com.mcavlak.sosyobazaar.utils.SecurityContextUtil;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostManager implements PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;

    public PostManager(PostRepository postRepository, PostMapper postMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
    }

    @Override
    public void save(PostSaveDto postSaveDto) {
        postRepository.save(Post.create(postSaveDto));
    }

    @Override
    public List<PostDto> findAll() {
        return postMapper.entityListToDtoList(postRepository.findAll());
    }

    @Override
    public List<PostDto> findAllMyFollow() {

        Customer customer = SecurityContextUtil.getCurrentCustomer();
        List<Long> sellerIdList = customer.getFollows().stream().map(Seller::getId).collect(Collectors.toList());
        List<Post> postList = postRepository.findByContentOwner_IdIn(sellerIdList);
        return postMapper.entityListToDtoList(postList);
    }


}
