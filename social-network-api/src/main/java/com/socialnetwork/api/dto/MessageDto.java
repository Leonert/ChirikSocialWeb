package com.socialnetwork.api.dto;



import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

import static com.socialnetwork.api.util.Constants.Response.DATE_FORMAT;

@Data
public class MessageDto {
  private int id;
  private boolean isRead;
  private String message;
  private LocalDateTime timestamp;
  private String username;
  private int recipientId;
  private int senderId;
  private int chatId;

  public static class Request {
    @Data
    public static class Create {
      private boolean isRead;
      private String message;
      private int recipientId;
      private int senderId;
      private int chatId;
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
      private int chatId;
    }
  }
}
