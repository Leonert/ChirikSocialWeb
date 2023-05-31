package com.socialnetwork.api.dto.noneauthorized;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.socialnetwork.api.dto.UserDtoInterface;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import static com.socialnetwork.api.util.Constants.Response.DATE_FORMAT;
import static com.socialnetwork.api.util.Constants.Response.TIME_FORMAT;

public enum NonAuthUserDto {
  ;

  public enum Request {
    ;

    @Data
    public static class Default {
      int id;
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
    public static class Profile implements UserDtoInterface {
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
      List<NonAuthPostDto.Response.WithoutAuthor> withoutAuthorPosts;
      int followersCounter;
      int followedCounter;
    }

    @Data
    public static class Listing implements UserDtoInterface {
      int id;
      String username;
      String name;
      String profileImage;
      String bio;
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
      NonAuthUserDto.Response.Default user;
      String jwt;
    }
  }
}
