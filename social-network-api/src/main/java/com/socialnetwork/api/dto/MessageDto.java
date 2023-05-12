package com.socialnetwork.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.socialnetwork.api.models.base.User;
import lombok.Data;
import java.time.LocalDateTime;
@Data
public class MessageDto {
  private int id;
  private boolean read;
  private String message;
  @JsonFormat (shape = JsonFormat. Shape. STRING, pattern = "yyyy-MM-dd HH:mm: ss")
  private LocalDateTime timestamp;

}