package com.socialnetwork.api.dto;

import lombok.Data;

public enum HashtagDto {
  ;

  public enum  Response {
    ;

    @Data
    public static class Default implements HashtagDtoInterface {
      Integer id;
      String name;
      int quantity;
    }
  }
}
