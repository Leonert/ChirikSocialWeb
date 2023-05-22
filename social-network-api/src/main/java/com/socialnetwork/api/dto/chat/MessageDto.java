package com.socialnetwork.api.dto.chat;

import lombok.Data;
import java.time.LocalDateTime;
@Data
public class MessageDto {
  private int messageId;
  private boolean isRead;
  private String message;
  private LocalDateTime timestamp;
  private String username;
  private int recipientId;
  private int senderId;
  private int chatId;

  @Data
  public static class DefaultMessageResponseDto {
    private int chatId;
    private boolean isRead;
    private String message;
    private LocalDateTime timestamp;
    private String username;
    private int recipientId;
    private int senderId;
    private int messageId;
  }

  @Data
  public static class CreateMessageRequestDto {
    private boolean isRead;
    private String message;
    private int messageId;
    private int chatId;
    private String keyword;

    public int getChatId() {
      return chatId;
    }
  }
}
