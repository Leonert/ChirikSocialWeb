package com.socialnetwork.api.dto.authorized;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.socialnetwork.api.dto.UserDtoInterface;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

import static com.socialnetwork.api.util.Constants.Validation.USERNAME_MAX_LENGTH;
import static com.socialnetwork.api.util.Constants.Validation.PASSWORD_MIN_LENGTH;
import static com.socialnetwork.api.util.Constants.Validation.USERNAME_TOO_BIG;
import static com.socialnetwork.api.util.Constants.Validation.USERNAME_NULL;
import static com.socialnetwork.api.util.Constants.Validation.USERNAME_BLANK;
import static com.socialnetwork.api.util.Constants.Validation.NAME_NULL;
import static com.socialnetwork.api.util.Constants.Validation.NAME_BLANK;
import static com.socialnetwork.api.util.Constants.Validation.EMAIL_NULL;
import static com.socialnetwork.api.util.Constants.Validation.EMAIL_NOT_VALID;
import static com.socialnetwork.api.util.Constants.Validation.EMAIL_REGEXP;
import static com.socialnetwork.api.util.Constants.Validation.PASSWORD_NULL;
import static com.socialnetwork.api.util.Constants.Validation.PASSWORD_TOO_SMALL;
import static com.socialnetwork.api.util.Constants.Response.DATE_FORMAT;
import static com.socialnetwork.api.util.Constants.Response.TIME_FORMAT;

public enum UserDto {
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
      String name;
      String profileImage;
      String profileBackgroundImage;
      String bio;
      String location;
      String website;
      LocalDateTime birthDate;
    }

    @Data
    public static class Registration {
      @NotBlank(message = USERNAME_BLANK)
      @NotNull(message = USERNAME_NULL)
      @Size(message = USERNAME_TOO_BIG, max = USERNAME_MAX_LENGTH)
      String username;

      @Email(message = EMAIL_NOT_VALID, regexp = EMAIL_REGEXP)
      @NotNull(message = EMAIL_NULL)
      String emailAddress;

      @NotBlank(message = NAME_BLANK)
      @NotNull(message = NAME_NULL)
      String name;

      @NotNull(message = PASSWORD_NULL)
      @Size(message = PASSWORD_TOO_SMALL, min = PASSWORD_MIN_LENGTH)
      String password;

      LocalDateTime birthDate;
    }

    @Data
    public static class Credentials {
      @Email(message = EMAIL_NOT_VALID, regexp = EMAIL_REGEXP)
      @NotNull(message = EMAIL_NULL)
      String emailAddress;

      @NotNull(message = PASSWORD_NULL)
      @Size(message = PASSWORD_TOO_SMALL, min = PASSWORD_MIN_LENGTH)
      String password;

      Boolean rememberMe;
    }

    @Data
    public static class PasswordEditing {
      @NotNull(message = PASSWORD_NULL)
      @Size(message = PASSWORD_TOO_SMALL, min = PASSWORD_MIN_LENGTH)
      String oldPassword;

      @NotNull(message = PASSWORD_NULL)
      @Size(message = PASSWORD_TOO_SMALL, min = PASSWORD_MIN_LENGTH)
      String newPassword;
    }

    @Data
    public static class PasswordRecovery {
      String token;

      @NotNull(message = PASSWORD_NULL)
      @Size(message = PASSWORD_TOO_SMALL, min = PASSWORD_MIN_LENGTH)
      String newPassword;
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
      List<PostDto.Response.WithoutAuthor> withoutAuthorPosts;
      int followersCounter;
      int followedCounter;
      boolean isCurrUserFollower;
    }

    @Data
    public static class Listing implements UserDtoInterface {
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
      String provider;
      String jwt;
    }
  }
}
