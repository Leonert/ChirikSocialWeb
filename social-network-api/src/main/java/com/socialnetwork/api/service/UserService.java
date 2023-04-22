package com.socialnetwork.api.service;

import com.socialnetwork.api.entity.User;
import com.socialnetwork.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  public Optional<User> findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public Optional<User> findByEmailAddress(String emailAddress) {
    return userRepository.findByEmailAddress(emailAddress);
  }
}
