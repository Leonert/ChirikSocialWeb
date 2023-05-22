package com.socialnetwork.api.dto.chat;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ChatDto {
  private int chatId;
  private List<MessageDto> messages;

  public ChatDto(int chatId) {
    this.chatId = chatId;
    this.messages = new ArrayList<>();
  }
  public ChatDto() {
    this.messages = new ArrayList<>();
  }


  public void addMessage(MessageDto message) {
    messages.add(message);
  }
}

