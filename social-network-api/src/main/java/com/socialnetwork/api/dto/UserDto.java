package com.socialnetwork.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.socialnetwork.api.models.additional.Bookmark;
import com.socialnetwork.api.models.additional.Follow;
import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.View;
import com.socialnetwork.api.models.base.Message;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

public enum UserDto {
  ;

  private interface Id {
    int getId();
  }

  private interface Username {
    String getUsername();
  }

  private interface FirstName {
    String getFirstName();
  }

  private interface LastName {
    String getLastName();
  }

  private interface Password {
    String getPassword();
  }

  private interface EmailAddress {
    String getEmailAddress();
  }

  private interface BirthDate {
    LocalDateTime getBirthDate();
  }

  private interface CreatedDate {
    LocalDateTime getCreatedDate();
  }


  private interface ProfileBackgroundImage {
    String getProfileBackgroundImage();
  }

  private interface ProfileImage {
    String getProfileImage();
  }

  private interface User {
    UserDto.Response.Default getUser();
  }

  private interface Jwt {
    String getJwt();
  }

  private interface RememberMe {
    Boolean getRememberMe();
  }

  private interface Followers {
    List<Follow> getFollowers();
  }

  private interface Followed {
    List<Follow> getFollowed();
  }

  private interface SeenPosts {
    List<View> getSeenPosts();
  }

  private interface LikedPosts {
    List<Like> getLikedPosts();
  }

  private interface BookMarkedPosts {
    List<Bookmark> getBookmarkedPosts();
  }

  private interface SentMessages {
    List<Message> getSentMessages();
  }

  private interface ReceivedMessages {
    List<Message> getReceivedMessages();
  }


  public enum Request {
    ;

    @Data
    public static class Email implements EmailAddress {
      String emailAddress;
    }

    @Data
    public static class Name implements Username {
      String username;
    }

    @Data
    public static class Registration implements
            Username, EmailAddress, FirstName, LastName, Password, BirthDate {
      String username;
      String emailAddress;
      String firstName;
      String lastName;
      String password;
      LocalDateTime birthDate;
    }

    @Data
    public static class Credentials implements EmailAddress, Password, RememberMe {
      String emailAddress;
      String password;
      Boolean rememberMe;
    }
  }

  public enum Response {
    ;

    @Data
    public static class Default implements
            Username, FirstName, LastName, EmailAddress,
            CreatedDate, BirthDate, ProfileBackgroundImage, ProfileImage {
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
    public static class AccountData implements User, Jwt {
      UserDto.Response.Default user;
      String jwt;
    }

    @Data
    public static class Author implements Username, FirstName, LastName, ProfileImage {
      String username;
      String firstName;
      String lastName;
      String profileImage;
    }
  }
}
