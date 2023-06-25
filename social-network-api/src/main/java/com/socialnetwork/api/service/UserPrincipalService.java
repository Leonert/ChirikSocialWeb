package com.socialnetwork.api.service;

import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.security.jwt.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static com.socialnetwork.api.util.Constants.Exception.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class UserPrincipalService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return UserPrincipal.of(
            userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND))
    );
  }
}
