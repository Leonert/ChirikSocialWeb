package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.MessageDto;
import com.socialnetwork.api.models.base.Message;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.MessageRepository;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.persistence.EntityNotFoundException;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
public class MessagesController {
  private final MessageRepository messageRepository;
  private final MessageService messageService;
  private final ModelMapper modelMapper;

  @GetMapping("/{id}")
  public ResponseEntity<MessageDto> getMessageById(@PathVariable int id) {
    MessageDto messageDto = messageService.getMessageById(id);
    return ResponseEntity.ok(messageDto);
  }

  @GetMapping()
  public ResponseEntity<List<MessageDto>> getAllMessages() {
    List<Message> messages = messageRepository.findAll();
    List<MessageDto> messageDtos = messages.stream()
            .map(message -> modelMapper.map(message, MessageDto.class))
            .collect(Collectors.toList());

    // Журналирование списка messageDtos
    messageDtos.forEach(messageDto -> {
      System.out.println("ID: " + messageDto.getId());
      System.out.println("Message: " + messageDto.getMessage());
    });

    return ResponseEntity.ok(messageDtos);
  }

  @PostMapping("/create")
  public ResponseEntity<MessageDto> createMessage(@RequestBody MessageDto messageDto) {
    MessageDto createdMessageDto = messageService.createMessage(messageDto);
    return ResponseEntity.created(URI.create("/api/messages/" + createdMessageDto.getId()))
            .body(createdMessageDto);
  }

  @PutMapping("/{id}")
  public ResponseEntity<MessageDto> updateMessage(@PathVariable int id, @RequestBody MessageDto messageDto) {
    messageDto.setId(Integer.parseInt(String.valueOf(id)));
    MessageDto updatedMessageDto = messageService.updateMessage(messageDto);
    return ResponseEntity.ok(updatedMessageDto);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMessage(@PathVariable int id) {
    messageService.deleteMessage(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/search")
  public ResponseEntity<List<MessageDto>> searchMessages(@RequestParam("keyword") String keyword) {
    List<MessageDto> messages = messageService.searchMessages(keyword);
    return ResponseEntity.ok(messages);
  }

  @PutMapping("/{id}/read")
  public ResponseEntity<Void> markMessageAsRead(@PathVariable int id) {
    messageService.markAsRead(id);
    return ResponseEntity.noContent().build();
  }

  private Message convertToMessage(MessageDto messageDto) {
    return modelMapper.map(messageDto, Message.class);
  }
}



//@PostMapping("/create")
//public ResponseEntity<MessageDto> createMessage(@RequestBody MessageDto messageDto) {
//  // Опрацювання отриманих даних про відправника і отримувача
////    int senderId = messageDto.getSenderId();
////    int recipientId = messageDto.getRecipientId();
//  String username = messageDto.getUsername();
//
////    // Запит до бази даних для отримання користувача-відправника
////    User sender = userRepository.findById(senderId)
////            .orElseThrow(() -> new EntityNotFoundException("Sender not found with id: " + senderId));
////
////    // Запит до бази даних для отримання користувача-отримувача
////    User recipient = userRepository.findById(recipientId)
////            .orElseThrow(() -> new EntityNotFoundException("Recipient not found with id: " + recipientId));
//
//  // Оновлення інформації у messageDto
////    messageDto.setSenderId(sender.getId());
////    messageDto.setRecipientId(recipient.getId());
//  messageDto.setUsername(username);
//
//  // Створення повідомлення через сервіс повідомлень
//  MessageDto createdMessageDto = messageService.createMessage(messageDto);
//
//  // Повернення статусу 201 Created і створеного повідомлення
//  return ResponseEntity.created(URI.create("/api/messages/" + createdMessageDto.getId()))
//          .body(createdMessageDto);
//}