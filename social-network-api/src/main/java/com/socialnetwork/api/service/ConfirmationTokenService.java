package com.socialnetwork.api.service;

import com.socialnetwork.api.model.auth.ConfirmationToken;
import com.socialnetwork.api.repository.ConfirmationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenService {

  private final ConfirmationTokenRepository confirmationTokenRepository;

  public Optional<ConfirmationToken> findByConfirmationToken(String confirmationToken) {
    return confirmationTokenRepository.findByConfirmationToken(confirmationToken);
  }

  public void save(ConfirmationToken confirmationToken) {
    confirmationTokenRepository.save(confirmationToken);
  }

  public void deleteById(Long id) {
    confirmationTokenRepository.deleteById(id);
  }
}
