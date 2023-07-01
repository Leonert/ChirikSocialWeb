package com.socialnetwork.api.service;

import com.socialnetwork.api.model.additional.Follow;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.FollowsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowsService {

  private final FollowsRepository followsRepository;

  public List<User> findAllByFollowerUser(User user) {
    return followsRepository.findAllByFollowerUser(user).stream()
            .map(Follow::getFollowedUser)
            .toList();
  }
}
