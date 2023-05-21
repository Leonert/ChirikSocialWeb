package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.MessageDto;
import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
public class MessagesController {
  private final MessageService messageService;
  private final ModelMapper modelMapper;
  private final UserRepository userRepository;

  @GetMapping("/{id}")
  public ResponseEntity<MessageDto> getMessageById(@PathVariable int id) {
    MessageDto messageDto = messageService.getMessageById(id);
    return ResponseEntity.ok(messageDto);
  }

  @GetMapping()
  public ResponseEntity<List<MessageDto>> getAllMessages() {
    List<MessageDto> messageDtos = messageService.getAllMessages();

    messageDtos.forEach(messageDto -> {
      System.out.println("ID: " + messageDto.getId());
      System.out.println("Message: " + messageDto.getMessage());
    });

    return ResponseEntity.ok(messageDtos);
  }

  @PostMapping("/create")
  public ResponseEntity<MessageDto> createMessage(@RequestBody MessageDto messageDto) {
    MessageDto createdMessageDto = messageService.createMessage(messageDto);
    return ResponseEntity.created(URI.create("/api/messages/" + createdMessageDto.getId())).body(createdMessageDto);
  }

  @PutMapping("/{id}")
  public ResponseEntity<MessageDto> updateMessage(@PathVariable int id, @RequestBody MessageDto messageDto) {
    messageDto.setId(id);
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

  @GetMapping("/users")
  public ResponseEntity<List<UserDto.Response.Listing>> getAllUsers() {
    List<User> users = userRepository.findAll();
    List<UserDto.Response.Listing> userDtos = users.stream()
            .map(user -> modelMapper.map(user, UserDto.Response.Listing.class))
            .collect(Collectors.toList());

    return ResponseEntity.ok(userDtos);
  }

  @PostMapping("/addMessage")
  public ResponseEntity<MessageDto> addMessage(@RequestBody MessageDto messageDto) {
    MessageDto createdMessageDto = messageService.addMessage(messageDto);
    return ResponseEntity.created(URI.create("/api/messages/" + createdMessageDto.getId())).body(createdMessageDto);
  }

  @GetMapping("/users/search")
  public ResponseEntity<Page<UserDto.Response.Listing>> searchUsers(
          @RequestParam("keyword") String keyword,
          Pageable pageable
  ) {
    Page<User> usersPage = userRepository.findByUsernameContainingIgnoreCaseOrNameContaining(keyword, keyword, pageable);
    List<UserDto.Response.Listing> userDtos = usersPage.getContent().stream()
            .map(user -> modelMapper.map(user, UserDto.Response.Listing.class))
            .collect(Collectors.toList());

    Page<UserDto.Response.Listing> userDtosPage = new PageImpl<>(userDtos, pageable, usersPage.getTotalElements());

    return ResponseEntity.ok(userDtosPage);
  }
}