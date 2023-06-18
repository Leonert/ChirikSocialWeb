package com.socialnetwork.api.security.oauth2.user;

import com.socialnetwork.api.exception.custom.OAuth2AuthenticationProcessingException;

import java.util.Map;

import static com.socialnetwork.api.security.oauth2.AuthProvider.google;

public class OAuth2UserInfoFactory {

  public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
    if (registrationId.equalsIgnoreCase(google.toString())) {
      return new GoogleOAuth2UserInfo(attributes);
    } else {
      throw new OAuth2AuthenticationProcessingException("Login with " + registrationId + " is not supported yet!");
    }
  }
}
