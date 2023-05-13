package com.socialnetwork.api.service;

import com.socialnetwork.api.dto.UserDto;
import com.socialnetwork.api.exception.EmailVerificationException;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.additional.Follow;
import com.socialnetwork.api.models.additional.keys.FollowPk;
import com.socialnetwork.api.models.auth.ConfirmationToken;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.FollowsRepository;
import com.socialnetwork.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final FollowsRepository followsRepository;
  private final ConfirmationTokenService confirmationTokenService;
  private final ModelMapper modelMapper;

  private final EmailService emailService;

  public boolean existsByUsername(String username) {
    return userRepository.existsByUsername(username);
  }

  public User findByUsername(String username) throws NoUserWithSuchCredentialsException {
    return userRepository.findByUsername(username).orElseThrow(NoUserWithSuchCredentialsException::new);
  }

  public Optional<User> findByEmailAddress(String emailAddress) {
    return userRepository.findByEmailAddress(emailAddress);
  }

  public boolean existsById(Integer id) {
    return userRepository.existsById(id);
  }

  public Optional<User> getByUsernameAndId(String username, int id) {
    return userRepository.findByUsernameAndId(username, id);
  }

  public void save(User user) {
    user.setCreatedDate(LocalDateTime.now());

    userRepository.save(user);

    ConfirmationToken confirmationToken = new ConfirmationToken(user);
    confirmationTokenService.save(confirmationToken);

    emailService.sendEmail(user, confirmationToken);
    System.out.println(confirmationToken);
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

  public User findById(int id) throws NoUserWithSuchCredentialsException {
    return userRepository.findById(id).orElseThrow(NoUserWithSuchCredentialsException::new);
  }

  public List<User> getFollowers(String queryUsername, String currentUserUsername,
                                 int page, int usersForPage) throws NoUserWithSuchCredentialsException {
    User currentUser = findByUsername(currentUserUsername);
    return findByUsername(queryUsername)
            .getFollowers().stream().map(Follow::getFollowerUser)
            // 1  10    1*10=10           2*10=20
            .skip(page * usersForPage).limit(usersForPage)
            .peek(f -> f.setCurrUserFollower(isFollowed(currentUser, f)))
            .toList();
  }

  public List<User> getFollowed(String queryUsername, String currentUserUsername,
                                int page, int usersForPage) throws NoUserWithSuchCredentialsException {
    User currentUser = findByUsername(currentUserUsername);
    return findByUsername(queryUsername)
            .getFollowed().stream().map(Follow::getFollowedUser)
            .skip(page * usersForPage).limit(usersForPage)
            .peek(f -> {
              if (queryUsername.equals(currentUserUsername)) {
                f.setCurrUserFollower(true);
              } else {
                f.setCurrUserFollower(isFollowed(currentUser, f));
              }
            }).toList();
  }

  public List<User> getListForConnectPage(String currentUserUsername, int page,
                                          int usersForPage) throws NoUserWithSuchCredentialsException {
    User currentUser = findByUsername(currentUserUsername);
    return userRepository.findAll(PageRequest.of(page, usersForPage))
            .stream().filter(u -> !isFollowed(currentUser, u)).toList();
  }

  public boolean isFollowed(User currentUser, User user) {
    return followsRepository.existsById(new FollowPk(currentUser.getId(), user.getId()));
  }

  public void editProfile(UserDto.Request.ProfileEditing editedUser) throws NoUserWithSuchCredentialsException {
    User userToUpdate = findByUsername(editedUser.getUsername());
    modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
    modelMapper.map(editedUser, userToUpdate);
    userRepository.save(userToUpdate);
  }

  public boolean followUnfollow(String username, String currentUserUsername) throws NoUserWithSuchCredentialsException {
    User user = findByUsername(username);
    User currentUser = findByUsername(currentUserUsername);
    if (!isFollowed(currentUser, user)) {
      followsRepository.save(new Follow(currentUser, user));
      return true;
    } else {
      followsRepository.deleteById(new FollowPk(currentUser.getId(), user.getId()));
    }
    return false;
  }

  public User getReferenceById(int id) {
    return userRepository.getReferenceById(id);
  }
}
