package com.mcavlak.sosyobazaar.services;

import com.mcavlak.sosyobazaar.dtos.PostDto;
import com.mcavlak.sosyobazaar.dtos.PostSaveDto;

import java.util.List;

public interface PostService {

    void save(PostSaveDto postSaveDto);

    List<PostDto> findAll();

    List<PostDto> findAllMyFollow();
}
