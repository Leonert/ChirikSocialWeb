package com.socialnetwork.api.dto;

import com.socialnetwork.api.models.base.User;
import lombok.Data;
import java.time.LocalDateTime;
@Data
public class MessageDto {
  private String id;
  private boolean read;
  private String message;
  private LocalDateTime timestamp;

  public boolean isRead() {
    return read;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  private interface Id {int getId();}

  private interface Sender { User getSender();}

  private interface Recipient { User getRecipient();}

  private interface Message { String getMessage();}

  private interface Timestamp { LocalDateTime getTimestamp();}

  private interface Read { boolean isRead();}
}