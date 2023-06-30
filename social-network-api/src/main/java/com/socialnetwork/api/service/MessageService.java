package com.socialnetwork.api.service;

import com.socialnetwork.api.dto.chat.ChatDto;
import com.socialnetwork.api.dto.chat.MessageDto;
import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.model.base.User;

import java.util.List;

public interface MessageService {

  List<MessageDto> getAllMessages(User recipient);

  List<UserDto.Response.Listing> searchUsers(String keyword);

  MessageDto getMessageById(int id);

  ChatDto getChatById(int chatId);

  MessageDto addMessage(MessageDto messageDto, ChatDto chatDto);

  MessageDto updateMessage(MessageDto messageDto);

  void deleteMessage(int id);

  void deleteChat(int chatId);

  List<MessageDto> searchMessages(String keyword);

  void markAsRead(int id);

  MessageDto createChat(MessageDto messageDto, ChatDto chatDto);

  List<MessageDto> getMessagesByChatId(int chatId);
}
