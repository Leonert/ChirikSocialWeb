package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.chat.ChatDto;
import com.socialnetwork.api.dto.chat.MessageDto;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.models.base.chat.Chat;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.net.URI;
import java.util.List;
@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessagesController {
  private final MessageService messageService;
  private final ModelMapper modelMapper;
  private final UserRepository userRepository;

  @GetMapping
  public ResponseEntity<List<MessageDto>> getAllMessages() {
    List<MessageDto> messages = messageService.getAllMessages();
    return ResponseEntity.ok(messages);
  }

  @GetMapping("/{id}")
  public ResponseEntity<MessageDto> getMessageById(@PathVariable("id") int id) {
    MessageDto message = messageService.getMessageById(id);
    return ResponseEntity.ok(message);
  }

  @PostMapping("/create")
  public ResponseEntity<MessageDto> createMessage(@RequestBody MessageDto.CreateMessageRequestDto requestDto) {
    MessageDto messageDto = modelMapper.map(requestDto, MessageDto.class);
    ChatDto chatDto = new ChatDto(requestDto.getChatId());

    MessageDto createdMessageDto = messageService.createChat(messageDto, chatDto);
    return ResponseEntity.created(URI.create("/api/messages/" + createdMessageDto.getMessageId())).body(createdMessageDto);
  }


  @PutMapping("/{id}")
  public ResponseEntity<MessageDto> updateMessage(@PathVariable("id") int id, @RequestBody MessageDto messageDto) {
    messageDto.setMessageId(id);
    MessageDto updatedMessageDto = messageService.updateMessage(messageDto);
    return ResponseEntity.ok(updatedMessageDto);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMessage(@PathVariable("id") int id) {
    messageService.deleteMessage(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/search")
  public ResponseEntity<List<MessageDto>> searchMessages(@RequestParam("keyword") String keyword) {
    List<MessageDto> messages = messageService.searchMessages(keyword);
    return ResponseEntity.ok(messages);
  }

  @PutMapping("/{id}/mark-as-read")
  public ResponseEntity<Void> markAsRead(@PathVariable("id") int id) {
    messageService.markAsRead(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/chats/create")
  public ResponseEntity<ChatDto> createChat(@RequestBody MessageDto messageDto, @RequestBody ChatDto chatDto) {
    MessageDto createdMessageDto = messageService.createChat(messageDto, chatDto);

    chatDto.setChatId(createdMessageDto.getChatId());
    chatDto.addMessage(createdMessageDto);

    return ResponseEntity.created(URI.create("/api/messages/chats/" + createdMessageDto.getChatId())).body(chatDto);
  }

  @PostMapping("/chats/{chatId}/add-message")
  public ResponseEntity<MessageDto> addMessageToChat(@PathVariable("chatId") int chatId, @RequestBody MessageDto.CreateMessageRequestDto requestDto) {
    ChatDto chatDto = new ChatDto(chatId);
    List<MessageDto> chatMessages = messageService.getMessagesByChatId(chatId);
    if (chatMessages.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    MessageDto messageDto = modelMapper.map(requestDto, MessageDto.class);
    messageDto.setChatId(chatId);

    MessageDto createdMessageDto = messageService.addMessage(messageDto, chatDto);
    return ResponseEntity.created(URI.create("/api/messages/" + createdMessageDto.getMessageId())).body(createdMessageDto);
  }
}
