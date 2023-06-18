package com.socialnetwork.api.security.oauth2;

import com.socialnetwork.api.exception.custom.OAuth2AuthenticationProcessingException;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.security.jwt.UserPrincipal;
import com.socialnetwork.api.security.oauth2.user.OAuth2UserInfo;
import com.socialnetwork.api.security.oauth2.user.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

  private final UserRepository userRepository;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest oauth2UserRequest) {
    OAuth2User oauth2User = super.loadUser(oauth2UserRequest);

    try {
      return processOAuth2User(oauth2UserRequest, oauth2User);
    } catch (AuthenticationException ex) {
      throw ex;
    } catch (Exception ex) {
      throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
    }
  }

  private OAuth2User processOAuth2User(OAuth2UserRequest oauth2UserRequest, OAuth2User oauth2User) {
    OAuth2UserInfo oauth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
            oauth2UserRequest.getClientRegistration().getRegistrationId(),
            oauth2User.getAttributes()
    );

    if (oauth2UserInfo.getEmail().isEmpty()) {
      throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
    }

    Optional<User> optionalUser = userRepository.findByEmailAddress(oauth2UserInfo.getEmail());
    User user;

    if (optionalUser.isPresent()) {
      user = optionalUser.get();

      if (!user.getProvider().equals(
              AuthProvider.valueOf(oauth2UserRequest.getClientRegistration().getRegistrationId())
      )) {
        throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with "
                + user.getProvider() + " account. Please use your " + user.getProvider()
                + " account to log in.");
      }

      user = updateExistingUser(user, oauth2UserInfo);
    } else {
      user = registerNewUser(oauth2UserRequest, oauth2UserInfo);
    }

    return UserPrincipal.of(user, oauth2User.getAttributes());
  }

  private User registerNewUser(OAuth2UserRequest oauth2UserRequest, OAuth2UserInfo oauth2UserInfo) {
    User user = new User();

    user.setProvider(AuthProvider.valueOf(oauth2UserRequest.getClientRegistration().getRegistrationId()));
    user.setProviderId(oauth2UserInfo.getId());
    user.setUsername(oauth2UserInfo.getName());
    user.setEmailAddress(oauth2UserInfo.getEmail());
    user.setProfileImage(oauth2UserInfo.getImageUrl());
    return userRepository.save(user);
  }

  private User updateExistingUser(User existingUser, OAuth2UserInfo oauth2UserInfo) {
    existingUser.setUsername(oauth2UserInfo.getName());
    existingUser.setProfileImage(oauth2UserInfo.getImageUrl());
    return userRepository.save(existingUser);
  }
}
