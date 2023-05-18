package com.socialnetwork.api.dto;



import lombok.Data;

import java.time.LocalDateTime;


@Data
public class MessageDto {
  private int id;
  private boolean isRead;
  private String message;
  private LocalDateTime timestamp;
  private String username;
  private int recipientId;
  private int senderId;

  public static class Request {
    @Data
    public static class Create {
      private boolean isRead;
      private String message;
      private int recipientId;
      private int senderId;
    }
  }

  public static class Response {
    @Data
    public static class Default {
      private int id;
      private boolean isRead;
      private String message;
      private LocalDateTime timestamp;
      private String username;
      private int recipientId;
      private int senderId;
    }
  }
}
