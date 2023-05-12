package com.socialnetwork.api.dto;


import com.socialnetwork.api.models.base.User;
import lombok.Data;
import java.time.LocalDateTime;
@Data

public class MessageDto {
  private int id;
  private boolean read;
  private String message;
  private LocalDateTime timestamp;
  private String username;

}