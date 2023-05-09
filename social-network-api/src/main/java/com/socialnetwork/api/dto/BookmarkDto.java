package com.socialnetwork.api.dto;

import lombok.Data;

import java.util.List;

public enum BookmarkDto {
  ;

  private interface UserId {
    Integer getUserId();
  }

  private interface PostId {
    Integer getPostId();
  }

  private interface Bookmarks {
    List<Integer> getBookmarks();
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
    public static class BookmarksList implements Bookmarks {
      List<Integer> bookmarks;
    }
  }
}
