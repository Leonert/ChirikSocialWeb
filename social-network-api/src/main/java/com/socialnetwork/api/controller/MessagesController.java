package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.MessageDto;
import com.socialnetwork.api.models.base.Message;
import com.socialnetwork.api.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.net.URI;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
public class MessagesController {
  private final MessageService messageService;
  private final ModelMapper modelMapper;

  @GetMapping("/{id}")
  public ResponseEntity<MessageDto> getMessageById(@PathVariable int id) {
    MessageDto messageDto = messageService.getMessageById(id);
    return ResponseEntity.ok(messageDto);
  }

  @GetMapping("/messages")
  public ResponseEntity<List<MessageDto>> getAllMessages() {
    List<MessageDto> messageDtos = messageService.getAllMessages();
    return ResponseEntity.ok(messageDtos);
  }

  @PostMapping("/create")
  public ResponseEntity<MessageDto> createMessage(@RequestBody MessageDto messageDto) {
    MessageDto createdMessageDto = messageService.createMessage(messageDto);
    return ResponseEntity.created(URI.create("/api/messages" + createdMessageDto.getId())).body(createdMessageDto);
  }

  @PutMapping("/{id}")
  public ResponseEntity<MessageDto> updateMessage(@PathVariable int id, @RequestBody MessageDto messageDto) {
    messageDto.setId(String.valueOf(id));
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

  private Message convertToMessage(MessageDto messageDto) {
    return modelMapper.map(messageDto, Message.class);
  }
}