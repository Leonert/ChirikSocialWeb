package com.socialnetwork.api.dto;

import com.socialnetwork.api.models.additional.Bookmark;
import com.socialnetwork.api.models.additional.Follow;
import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.View;
import com.socialnetwork.api.models.base.Message;
import lombok.Data;
import lombok.Value;

import java.time.LocalDateTime;
import java.util.List;

public enum UserDto {
  ;

  public enum Request {
    ;

    @Data
    public static class Default implements Id, Username {
      int id;
      String username;
    }
  }

  public enum Response {
    ;

    @Data
    public static class Default implements Id, Username {
      int id;
      String username;
    }
  }

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

  private interface CreatedDate {
    LocalDateTime getCreatedDate();
  }

  private interface ProfileBackgroundImageUrl {
    String getProfileBackgroundImageUrl();
  }

  private interface ProfileImageUrl {
    String getProfileImageUrl();
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
}
