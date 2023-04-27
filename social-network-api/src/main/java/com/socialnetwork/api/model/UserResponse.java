package com.socialnetwork.api.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {

  private final String jwt;

  private final String username;

  private final String firstName;

  private final String lastName;

  private final String emailAddress;

  private final LocalDateTime createdDate;

  private final String profileBackgroundImageUrl;

  private final String profileImageUrl;

  public UserResponse(User user, String jwt) {
    this.username = user.getUsername();
    this.firstName = user.getFirstName();
    this.lastName = user.getLastName();
    this.emailAddress = user.getEmailAddress();
    this.createdDate = user.getCreatedDate();
    this.profileBackgroundImageUrl = user.getProfileBackgroundImageUrl();
    this.profileImageUrl = user.getProfileImageUrl();
    this.jwt = jwt;
  }
}
