package com.socialnetwork.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import static com.socialnetwork.api.util.Const.Response.DATE_FORMAT;
import static com.socialnetwork.api.util.Const.Response.TIME_FORMAT;

public enum UserDto {
  ;

  public enum Request {
    ;

    @Data
    public static class Default {
      int id;
    }

    @Data
    public static class Email {
      String emailAddress;
    }

    @Data
    public static class Username {
      String username;
    }

    @Data
    public static class ProfileEditing {
      String username;
      String profileImage;
      String profileBackgroundImage;
      String bio;
      String location;
      String website;
    }

    @Data
    public static class Registration {
      String username;
      String emailAddress;
      String name;
      String password;
      LocalDateTime birthDate;
    }

    @Data
    public static class Credentials {
      String emailAddress;
      String password;
      Boolean rememberMe;
    }
  }


  public enum Response {
    ;

    @Data
    public static class Profile {
      int id;
      String username;
      String name;
      String emailAddress;
      String profileImage;
      String profileBackgroundImage;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = TIME_FORMAT)
      LocalDateTime createdDate;
      String bio;
      String location;
      String website;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_FORMAT)
      LocalDateTime birthDate;
      List<PostDto.Response.Profile> profilePosts;
      int followersCounter;
      int followedCounter;
      boolean isCurrUserFollower;
    }

    @Data
    public static class Listing {
      int id;
      String username;
      String name;
      String profileImage;
      String bio;
      boolean isCurrUserFollower;
    }

    @Data
    public static class Author {
      int id;
      String username;
      String name;
      String profileImage;
    }

    @Data
    public static class Default {
      String username;
      String name;
      String emailAddress;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_FORMAT)
      LocalDateTime createdDate;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_FORMAT)
      LocalDateTime birthDate;
      String profileBackgroundImage;
      String profileImage;

    }

    @Data
    public static class AccountData {
      UserDto.Response.Default user;
      String jwt;

    }
  }
}
