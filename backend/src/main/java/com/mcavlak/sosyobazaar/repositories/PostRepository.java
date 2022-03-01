package com.mcavlak.sosyobazaar.repositories;

import com.mcavlak.sosyobazaar.models.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByContentOwner_IdIn(List<Long> ownerId);

}
