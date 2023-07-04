package com.socialnetwork.api.service.authorized;

import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.exception.custom.AccessDeniedException;
import com.socialnetwork.api.exception.custom.EmailException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.exception.custom.TokenInvalidException;
import com.socialnetwork.api.mapper.authorized.NotificationMapper;
import com.socialnetwork.api.model.additional.Follow;
import com.socialnetwork.api.model.additional.keys.FollowPk;
import com.socialnetwork.api.model.auth.ConfirmationToken;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.FollowsRepository;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.security.oauth2.AuthProvider;
import com.socialnetwork.api.service.NotificationService;
import com.socialnetwork.api.service.ConfirmationTokenService;
import com.socialnetwork.api.service.CloudinaryService;
import com.socialnetwork.api.service.EmailService;
import com.socialnetwork.api.service.FollowsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Image.BASE_64_PREFIX;
import static com.socialnetwork.api.util.Constants.WebSocket.QUEUE_NOTIFICATION;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final FollowsRepository followsRepository;
  private final EmailService emailService;
  private final NotificationService notificationService;
  private final FollowsService followsService;
  private final ConfirmationTokenService confirmationTokenService;
  private final CloudinaryService cloudinaryService;
  private final ModelMapper modelMapper;
  private final NotificationMapper notificationMapper;
  private final PasswordEncoder passwordEncoder;
  private final SimpMessagingTemplate messagingTemplate;

  public boolean existsByUsername(String username) {
    return userRepository.existsByUsername(username);
  }

  public boolean existsByEmailAddress(String email) {
    return userRepository.existsByEmailAddress(email);
  }

  public User findByUsername(String username) throws NoUserWithSuchCredentialsException {
    return userRepository.findByUsername(username).orElseThrow(NoUserWithSuchCredentialsException::new);
  }

  public User findByEmailAddress(String emailAddress) throws NoUserWithSuchCredentialsException {
    return userRepository.findByEmailAddress(emailAddress).orElseThrow(NoUserWithSuchCredentialsException::new);
  }

  public User save(User user) {
    user.setCreatedDate(LocalDateTime.now());
    user.setProvider(AuthProvider.LOCAL);
    User savedUser = userRepository.save(user);
    ConfirmationToken confirmationToken = new ConfirmationToken(savedUser);
    confirmationTokenService.save(confirmationToken);
    emailService.sendTokenForAccountActivation(savedUser.getEmailAddress(), confirmationToken);
    return savedUser;
  }

  public void verifyAccount(String confirmationToken) throws EmailException, NoUserWithSuchCredentialsException {
    Optional<ConfirmationToken> optionalToken =
            confirmationTokenService.findByConfirmationToken(confirmationToken);

    if (optionalToken.isEmpty()) {
      throw new EmailException("Error: Couldn't verify email");
    }

    ConfirmationToken token = optionalToken.get();
    User user = findByEmailAddress(token.getUser().getEmailAddress());
    user.setEnabled(true);
    confirmationTokenService.deleteById(token.getTokenId());
    userRepository.save(user);
  }

  public List<User> getFollowers(String queryUsername, String currentUserUsername,
                                 int page, int usersForPage) throws NoUserWithSuchCredentialsException {
    User currentUser = findByUsername(currentUserUsername);
    return findByUsername(queryUsername)
            .getFollowers().stream().map(Follow::getFollowerUser)
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
            .peek(f -> f.setCurrUserFollower(queryUsername.equals(currentUserUsername)
                    || isFollowed(currentUser, f))).toList();
  }

  public List<User> getListForConnectPage(String currentUserUsername, int page,
                                          int usersForPage) throws NoUserWithSuchCredentialsException {
    User currentUser = findByUsername(currentUserUsername);
    List<User> following = followsService.findAllByFollowerUser(currentUser);
    return userRepository.findAll().stream()
            .filter(u -> !following.contains(u) && !Objects.equals(currentUser, u))
            .skip(page * usersForPage)
            .limit(usersForPage)
            .toList();
  }

  public boolean isFollowed(User currentUser, User user) {
    return followsRepository.existsById(new FollowPk(currentUser.getId(), user.getId()));
  }

  public User editProfile(UserDto.Request.ProfileEditing editedUser, String username)
          throws NoUserWithSuchCredentialsException {
    User userToUpdate = findByUsername(username);

    if (!editedUser.getProfileImage().isEmpty()) {
      if (editedUser.getProfileImage().startsWith(BASE_64_PREFIX)) {
        editedUser.setProfileImage(cloudinaryService.uploadProfilePic(
                editedUser.getProfileImage(),
                String.valueOf(userToUpdate.getId()))
        );
      }
    } else if (userToUpdate.getProfileImage() != null) {
      editedUser.setProfileImage(null);
      userToUpdate.setProfileImage(null);
    }

    if (!editedUser.getProfileBackgroundImage().isEmpty()) {
      if (editedUser.getProfileBackgroundImage().startsWith(BASE_64_PREFIX)) {
        editedUser.setProfileBackgroundImage(cloudinaryService.uploadBackgroundPic(
                editedUser.getProfileBackgroundImage(),
                String.valueOf(userToUpdate.getId())
        ));
      }
    } else if (userToUpdate.getProfileBackgroundImage() != null) {
      editedUser.setProfileBackgroundImage(null);
      userToUpdate.setProfileBackgroundImage(null);
    }

    modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
    modelMapper.map(editedUser, userToUpdate);

    userRepository.save(userToUpdate);
    return userToUpdate;
  }


  public boolean followUnfollow(String username, String currentUserUsername) throws NoUserWithSuchCredentialsException {
    User user = findByUsername(username);
    User currentUser = findByUsername(currentUserUsername);
    if (!isFollowed(currentUser, user)) {
      followsRepository.save(new Follow(currentUser, user));
      messagingTemplate.convertAndSendToUser(
              username,
              QUEUE_NOTIFICATION,
              notificationMapper.mapNotification(notificationService.saveFollow(currentUser, user))
      );
      return true;
    } else {
      followsRepository.deleteById(new FollowPk(currentUser.getId(), user.getId()));
    }
    return false;
  }

  public void passwordChange(String username, String oldPassword, String newPassword)
          throws NoUserWithSuchCredentialsException, AccessDeniedException {
    User currentUser = findByUsername(username);
    if (passwordEncoder.matches(oldPassword, currentUser.getPassword())) {
      currentUser.setPassword(passwordEncoder.encode(newPassword));
      userRepository.save(currentUser);
    } else {
      throw new AccessDeniedException();
    }
  }

  public void sendEmailForPasswordRecovery(String email) throws NoUserWithSuchCredentialsException {
    User user = findByEmailAddress(email);
    ConfirmationToken confirmationToken = new ConfirmationToken(user);
    confirmationTokenService.save(confirmationToken);
    emailService.sendTokenForPasswordRecovery(email, confirmationToken);
  }

  public void passwordRecovery(String token, String newPassword) throws TokenInvalidException {
    ConfirmationToken confirmationToken = confirmationTokenService
            .findByConfirmationToken(token).orElseThrow(TokenInvalidException::new);
    User user = confirmationToken.getUser();
    confirmationTokenService.deleteById(confirmationToken.getTokenId());
    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);
  }
}
