package com.socialnetwork.api.dto;

import com.socialnetwork.api.models.base.User;
import lombok.Data;
import lombok.Value;
import java.time.LocalDateTime;
@Data
public class MessageDto {
  private String id;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  private interface Id {int getId();}

  private interface Sender { User getSender();}

  private interface Recipient { User getRecipient();}

  private interface Message { String getMessage();}

  private interface Timestamp { LocalDateTime getTimestamp();}

  private interface Read { boolean isRead();}

  public enum Request {;
    @Value public static class Default implements Id{
      int id;
    }
  }

  public enum Response {;
    @Value public static class Default implements Id{
      int id;
    }
  }
}
