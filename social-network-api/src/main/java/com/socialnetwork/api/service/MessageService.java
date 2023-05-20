package com.socialnetwork.api.service;

import com.socialnetwork.api.dto.MessageDto;
import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.models.base.Message;

import java.util.List;

public interface MessageService {
  MessageDto getMessageById(int id);

  List<MessageDto> getAllMessages();

  MessageDto createMessage(MessageDto messageDto);

  MessageDto updateMessage(MessageDto messageDto);

  void deleteMessage(int id);

  List<MessageDto> searchMessages(String keyword);

  void markAsRead(int id);

  MessageDto convertToMessageDto(Message message);

  Message convertToMessage(MessageDto messageDto);

  List<UserDto.Response.Listing> searchUsers(String keyword);
  MessageDto addMessage(MessageDto messageDto);

}