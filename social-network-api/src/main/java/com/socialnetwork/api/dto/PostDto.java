package com.socialnetwork.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.socialnetwork.api.models.additional.Bookmark;
import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.Reply;
import com.socialnetwork.api.models.additional.View;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.List;

public enum PostDto {
  ;

  private interface Id {
    int getId();
  }

  private interface Author {
    UserDto.Response.Author getAuthor();
  }

  private interface AuthorId {
    Integer getAuthorId();
  }

  private interface OriginalPostId {
    @Nullable Integer getOriginalPostId();
  }

  private interface OriginalPost {
    @Nullable PostDto.Response.Default getOriginalPost();
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

  private interface Posts {
    List<PostDto.Response.Default> getPosts();
  }

  private interface Views {
    List<View> getViews();
  }

  private interface Likes {
    List<Like> getLikes();
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

  public enum Request {
    ;

    @Data
    public static class Created implements Id, AuthorId, Text, Image, OriginalPostId {
      int id;
      Integer authorId;
      String text;
      String image;
      Integer originalPostId;
    }
  }

  public enum Response {
    ;

    @Data
    public static class Default implements Id, Author, CreatedDate, Text, Image, OriginalPost {
      int id;
      UserDto.Response.Author author;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
      LocalDateTime createdDate;
      String text;
      String image;
      // Ids of the people who liked this post
      List<Integer> likes;
      // Ids of the people who bookmarked this post
      List<Integer> bookmarks;
      PostDto.Response.Default originalPost;
    }

    @Data
    public static class Feed implements Posts {
      List<PostDto.Response.Default> posts;
    }
  }
}
