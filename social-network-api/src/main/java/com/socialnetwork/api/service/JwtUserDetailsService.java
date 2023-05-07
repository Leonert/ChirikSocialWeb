package com.socialnetwork.api.service;

import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.security.JwtUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> optionalUser = userRepository.findByUsername(username);

    if (optionalUser.isEmpty()) {
      throw new UsernameNotFoundException("There is no user with such username");
    }

    return new JwtUserDetails(optionalUser.get());
  }
}
