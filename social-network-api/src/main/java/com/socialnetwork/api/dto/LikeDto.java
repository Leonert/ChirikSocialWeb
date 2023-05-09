package com.socialnetwork.api.dto;

import lombok.Data;

import java.util.List;

public enum LikeDto {
  ;

  private interface UserId {
    Integer getUserId();
  }

  private interface PostId {
    Integer getPostId();
  }

  private interface Likes {
    List<Integer> getLikes();
  }


  public enum Request {
    ;

    @Data
    public static class Default implements UserId, PostId {
      Integer userId;
      Integer postId;
    }

  }

  public enum Response {
    ;

    @Data
    public static class Default implements UserId {
      Integer userId;
    }

    @Data
    public static class LikesList implements Likes {
      List<Integer> likes;
    }
  }
}
