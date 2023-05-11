package com.socialnetwork.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;

public enum PostDto {
  ;

  public enum Request {
    ;

    @Data
    public static class Default implements Id {
      int id;
    }

    @Data
    public static class Action implements User, Post {
      UserDto.Request.Default user;
      PostDto.Request.Default post;
    }

    @Data
    public static class Editable implements Id, Text, Image {
      int id;
      String text;
      String image;
    }

    @Data
    public static class Created implements Id, User, Text, Image, OriginalPostId {
      int id;
      UserDto.Request.Default user;
      String text;
      String image;
      Integer originalPostId;
    }
  }

  public enum Response {
    ;

    @Data
    public static class Default implements Id, Author, CreatedDate, Text, Image,
        LikesNumber, BookmarksNumber, OriginalPost {
      int id;
      UserDto.Response.Author author;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
      LocalDateTime createdDate;
      String text;
      String image;
      int likesNumber;
      int bookmarksNumber;
      PostDto.Response.Default originalPost;
    }
  }

  private interface Id {
    int getId();
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

  private interface Post {
    PostDto.Request.Default getPost();
  }

  private interface User {
    UserDto.Request.Default getUser();
  }

  private interface Author {
    UserDto.Response.Author getAuthor();
  }

  private interface OriginalPostId {
    @Nullable
    Integer getOriginalPostId();
  }

  private interface OriginalPost {
    @Nullable
    PostDto.Response.Default getOriginalPost();
  }

  private interface LikesNumber {
    int getLikesNumber();
  }

  private interface BookmarksNumber {
    int getBookmarksNumber();
  }
}
