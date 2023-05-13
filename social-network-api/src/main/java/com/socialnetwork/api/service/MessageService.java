package com.socialnetwork.api.service;

import com.socialnetwork.api.dto.MessageDto;

import java.util.List;

public interface MessageService {

  MessageDto getMessageById(int id);

  List<MessageDto> getAllMessages();

  MessageDto createMessage(MessageDto messageDto);

  MessageDto updateMessage(MessageDto messageDto);

  void deleteMessage(int id);

  List<MessageDto> searchMessages(String keyword);

  void markAsRead(int id);

}