package com.socialnetwork.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

import static com.socialnetwork.api.util.Constants.Response.TIME_FORMAT;

public enum PostDto {
  ;

  public enum Request {
    ;

    @Data
    public static class Default {
      int id;
    }

    @Data
    public static class Editable {
      int id;
      String text;
      String image;
    }

    @Data
    public static class Created {
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
    public static class Id {
      int id;
    }

    public interface PostInfo {
      void setLikesNumber(int likesNumber);

      void setBookmarksNumber(int bookmarksNumber);

      void setRetweetsNumber(int retweetsNumber);

      void setRepliesNumber(int repliesNumber);

      PostDto.Response.PostInfo getOriginalPost();

      int getId();
    }

    @Data
    public static class Default implements PostInfo {
      int id;
      UserDto.Response.Author author;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = TIME_FORMAT)
      LocalDateTime createdDate;
      String text;
      String image;
      int likesNumber;
      int bookmarksNumber;
      int retweetsNumber;
      int repliesNumber;
      PostDto.Response.Default originalPost;
    }

    @Data
    public static class Profile implements PostInfo {
      int id;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = TIME_FORMAT)
      LocalDateTime createdDate;
      String text;
      String image;
      int likesNumber;
      int bookmarksNumber;
      int retweetsNumber;
      int repliesNumber;
      PostDto.Response.Profile originalPost;
    }
  }
}
