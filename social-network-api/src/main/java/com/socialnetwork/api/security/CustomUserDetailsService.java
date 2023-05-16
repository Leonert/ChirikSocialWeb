package com.socialnetwork.api.security;

import com.socialnetwork.api.exception.ResourceNotFoundException;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
  UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email)
          throws UsernameNotFoundException {
    User user = userRepository.findByEmailAddress(email)
            .orElseThrow(() ->
                    new UsernameNotFoundException("User not found with email : " + email)
            );

    return UserPrincipal.create(user);
  }

  @Transactional
  public UserDetails loadUserById(int id) {
    User user = userRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("User", "id", id)
    );

    return UserPrincipal.create(user);
  }
}
