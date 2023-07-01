package com.socialnetwork.api.repository;

import com.socialnetwork.api.model.base.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {

  Optional<Hashtag> findByName(String name);
}
