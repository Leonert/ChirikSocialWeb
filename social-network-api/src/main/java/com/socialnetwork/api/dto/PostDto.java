package com.socialnetwork.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

public enum PostDto {
  ;

  public enum Request {
    ;

    @Data
    public static class Default {
      int id;
    }

    @Data
    public static class Action {
      UserDto.Request.Default user;
      PostDto.Request.Default post;
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
    public static class Default {
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
}
