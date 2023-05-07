package com.socialnetwork.api.dto;


import com.socialnetwork.api.models.additional.Bookmark;
import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.Reply;
import com.socialnetwork.api.models.additional.Retweet;
import com.socialnetwork.api.models.additional.View;
import com.socialnetwork.api.models.base.User;
import lombok.Value;

import java.time.LocalDateTime;
import java.util.List;

public enum PostDto {
  ;

  public enum Request {
    ;

    @Value
    public static class Default implements Id, Author {
      int id;
      User author;
    }
  }

  public enum Response {
    ;

    @Value
    public static class Default implements Id, Author {
      int id;
      User author;
    }
  }

  private interface Id {
    int getId();
  }

  private interface Author {
    User getAuthor();
  }

  private interface Text {
    String getText();
  }

  private interface Image {
    String getImage();
  }

  private interface CreatedDate {
    LocalDateTime getCreatedDate();
  }

  private interface Views {
    List<View> getViews();
  }

  private interface Likes {
    List<Like> getLikes();
  }

  private interface Retweets {
    List<Retweet> getRetweets();
  }

  private interface Bookmarks {
    List<Bookmark> getBookmarks();
  }

  private interface Replies {
    List<Reply> getReplies();
  }

  private interface RepliedTo {
    Reply getRepliedTo();
  }
}
