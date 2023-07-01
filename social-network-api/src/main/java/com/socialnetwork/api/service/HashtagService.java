package com.socialnetwork.api.service;

import com.socialnetwork.api.model.base.Hashtag;
import com.socialnetwork.api.repository.HashtagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HashtagService {

  private final HashtagRepository hashtagRepository;

  public void save(Hashtag hashtag) {
    hashtagRepository.save(hashtag);
  }

  public Optional<Hashtag> findByName(String name) {
    return hashtagRepository.findByName(name);
  }

  public List<Hashtag> getHashtags(int page, int hashtagsQuantity) {
    return hashtagRepository.findAll(Sort.by(Sort.Direction.DESC, "quantity")).stream()
            .skip(page * hashtagsQuantity)
            .limit(hashtagsQuantity)
            .toList();
  }
}
