package com.socialnetwork.api.service;

import com.socialnetwork.api.model.ConfirmationToken;
import com.socialnetwork.api.model.User;
import com.socialnetwork.api.exception.EmailVerificationException;
import com.socialnetwork.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  private final ConfirmationTokenService confirmationTokenService;

  private final EmailService emailService;

  public Optional<User> findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public Optional<User> findByEmailAddress(String emailAddress) {
    return userRepository.findByEmailAddress(emailAddress);
  }

  public void saveUser(User user) {
    userRepository.save(user);

    ConfirmationToken confirmationToken = new ConfirmationToken(user);
    confirmationTokenService.save(confirmationToken);

    emailService.sendEmail(user, confirmationToken);
  }

  public void verifyAccount(String confirmationToken) throws EmailVerificationException {
    Optional<ConfirmationToken> optionalToken =
            confirmationTokenService.findByConfirmationToken(confirmationToken);

    if (optionalToken.isEmpty()) {
      throw new EmailVerificationException("Error: Couldn't verify email");
    }

    ConfirmationToken token = optionalToken.get();
    User user = findByEmailAddress(token.getUser().getEmailAddress()).get();
    user.setEnabled(true);
    confirmationTokenService.deleteById(token.getTokenId());
    userRepository.save(user);
  }

  public Optional<User> findById(int id) {
    return userRepository.findById(id);
  }
}