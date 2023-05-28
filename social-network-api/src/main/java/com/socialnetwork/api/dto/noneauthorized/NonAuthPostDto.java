package com.socialnetwork.api.dto.noneauthorized;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.socialnetwork.api.dto.PostDtoInterface;
import com.socialnetwork.api.dto.authorized.UserDto;
import lombok.Data;

import java.time.LocalDateTime;

import static com.socialnetwork.api.util.Constants.Response.TIME_FORMAT;

public enum NonAuthPostDto {
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

    public static class WithAuthor extends WithoutAuthor {
      UserDto.Response.Author author;

      public UserDto.Response.Author getAuthor() {
        return author;
      }

      public void setAuthor(UserDto.Response.Author author) {
        this.author = author;
      }
    }

    @Data
    public static class WithoutAuthor implements PostDtoInterface {
      int id;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = TIME_FORMAT)
      LocalDateTime createdDate;
      String text;
      String image;
      int likesNumber;
      int bookmarksNumber;
      int retweetsNumber;
      int repliesNumber;
      NonAuthPostDto.Response.WithAuthor originalPost;
    }
  }
}
