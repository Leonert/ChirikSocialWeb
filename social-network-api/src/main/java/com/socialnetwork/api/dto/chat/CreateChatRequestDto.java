package com.socialnetwork.api.dto.chat;

import lombok.Data;

@Data
public class CreateChatRequestDto {
  private MessageDto messageDto;
  private ChatDto chatDto;

  public MessageDto getMessageDto() {
    return messageDto;
  }

  public void setMessageDto(MessageDto messageDto) {
    this.messageDto = messageDto;
  }

  public ChatDto getChatDto() {
    return chatDto;
  }

  public void setChatDto(ChatDto chatDto) {
    this.chatDto = chatDto;
  }
}