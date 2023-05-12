package com.socialnetwork.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.socialnetwork.api.models.base.Post;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

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

    public static class Registration {
      String username;
      String emailAddress;
      String firstName;
      String lastName;
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
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
      LocalDateTime createdDate;
      String bio;
      String location;
      String website;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
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

    public static class Default {
      String username;
      String firstName;
      String lastName;
      String emailAddress;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
      LocalDateTime createdDate;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
      LocalDateTime birthDate;
      String profileBackgroundImage;
      String profileImage;
    }

    @Data
    public static class AccountData {
      UserDto.Response.Default user;
      String jwt;
    }

    @Data
    public static class Author {
      String username;
      String firstName;
      String lastName;
      String profileImage;
    }
  }
}
