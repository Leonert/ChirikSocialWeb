package com.socialnetwork.api.dto.chat;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDateTime;

import static com.socialnetwork.api.util.Constants.Response.TIME_FORMAT;

@Data
public class MessageDto {
  private int messageId;
  private boolean isRead;
  private String message;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = TIME_FORMAT)
  private LocalDateTime timestamp;
  private int recipientId;
  private int senderId;
  private int chatId;
  private String senderUsername;
  private String recipientUsername;


  @Data
  public static class DefaultMessageResponseDto {
    private int chatId;
    private boolean isRead;
    private String message;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = TIME_FORMAT)
    private LocalDateTime timestamp;
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
    private int senderId;
    private int recipientId;
    private String keyword;

    public int getChatId() {
      return chatId;
    }
  }
}
