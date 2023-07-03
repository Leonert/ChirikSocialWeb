package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.chat.ChatDto;
import com.socialnetwork.api.dto.chat.CreateChatRequestDto;
import com.socialnetwork.api.dto.chat.MessageDto;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.WebSocket.TOPIC_MESSAGES;
import static com.socialnetwork.api.util.Constants.WebSocket.TOPIC_MESSAGE;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessagesController {
  private final MessageService messageService;
  private final ModelMapper modelMapper;
  private final UserRepository userRepository;

  @Autowired
  private SimpMessagingTemplate messagingTemplate;

  @GetMapping
  public ResponseEntity<List<MessageDto>> getAllMessages(@RequestParam("userId") int userId) {
    Optional<User> userOptional = userRepository.findById(userId);

    if (userOptional.isPresent()) {
      User user = userOptional.get();

      List<MessageDto> messages = messageService.getAllMessages(user);
      messagingTemplate.convertAndSendToUser(user.getUsername(), "/queue/messages", messages);

      return ResponseEntity.ok(messages);
    } else {
      return ResponseEntity.notFound().build();
    }
  }


  @GetMapping("/{id}")
  public ResponseEntity<MessageDto> getMessageById(@PathVariable("id") int id) {
    MessageDto message = messageService.getMessageById(id);
    return ResponseEntity.ok(message);
  }

  @PostMapping("/create/messages")
  public ResponseEntity<MessageDto> createMessage(
          @RequestBody MessageDto.CreateMessageRequestDto requestDto) {
    MessageDto messageDto = modelMapper.map(requestDto, MessageDto.class);
    ChatDto chatDto = new ChatDto(requestDto.getChatId());

    MessageDto createdMessageDto = messageService.createChat(messageDto, chatDto);
    return ResponseEntity.created(URI.create("/api/messages/"
            + createdMessageDto.getMessageId())).body(createdMessageDto);
  }


  @PutMapping("/{id}")
  public ResponseEntity<MessageDto> updateMessage(
          @PathVariable("id")
          int id, @RequestBody MessageDto messageDto) {
    messageDto.setMessageId(id);
    MessageDto updatedMessageDto = messageService.updateMessage(messageDto);
    return ResponseEntity.ok(updatedMessageDto);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMessage(@PathVariable("id") int id) {
    messageService.deleteMessage(id);
    messagingTemplate.convertAndSend(TOPIC_MESSAGES, id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/chats/{chatId}")
  public ResponseEntity<?> getChatById(@PathVariable("chatId") int chatId) {
    ChatDto chatDto = messageService.getChatById(chatId);

    if (chatDto.getMessages().isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(chatDto);
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

  @DeleteMapping("/chats/{chatId}")
  public ResponseEntity<Void> deleteChat(@PathVariable("chatId") int chatId) {
    messageService.deleteChat(chatId);
    messagingTemplate.convertAndSend(TOPIC_MESSAGES, chatId);

    return ResponseEntity.noContent().build();
  }

  @PostMapping("/chats/create")
  public ResponseEntity<ChatDto> createChat(@RequestBody CreateChatRequestDto requestDto) {
    MessageDto messageDto = requestDto.getMessageDto();
    ChatDto chatDto = requestDto.getChatDto();
    messageDto.setChatId(chatDto.getChatId());

    MessageDto createdMessageDto = messageService.createChat(messageDto, chatDto);

    chatDto.setChatId(createdMessageDto.getChatId());
    chatDto.addMessage(createdMessageDto);
    messagingTemplate.convertAndSend(TOPIC_MESSAGES, chatDto);
    return ResponseEntity.created(URI.create("/api/messages/chats/"
            + createdMessageDto.getChatId())).body(chatDto);
  }

  @PostMapping("/chats/{chatId}/add-message")
  public ResponseEntity<MessageDto> addMessageToChat(
          @PathVariable("chatId") int chatId,
          @RequestBody MessageDto.CreateMessageRequestDto requestDto) {
    ChatDto chatDto = new ChatDto(chatId);
    List<MessageDto> chatMessages = messageService.getMessagesByChatId(chatId);
    if (chatMessages.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    MessageDto messageDto = modelMapper.map(requestDto, MessageDto.class);
    messageDto.setChatId(chatId);

    MessageDto createdMessageDto = messageService.addMessage(messageDto, chatDto);
    List<MessageDto> updatedMessages = messageService.getMessagesByChatId(chatId);
    messagingTemplate.convertAndSend(TOPIC_MESSAGE, updatedMessages);

    return ResponseEntity.created(URI.create("/api/messages/"
            + createdMessageDto.getMessageId())).body(createdMessageDto);
  }
}
