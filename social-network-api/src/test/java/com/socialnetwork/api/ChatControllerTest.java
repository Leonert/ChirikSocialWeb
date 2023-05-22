package com.socialnetwork.api;
import com.socialnetwork.api.controller.MessagesController;
import com.socialnetwork.api.dto.chat.ChatDto;
import com.socialnetwork.api.dto.chat.MessageDto;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.service.MessageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.net.URI;
import java.util.Optional;

import static org.aspectj.bridge.MessageUtil.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ChatControllerTest {

//  @Mock
//  private UserRepository userRepository;
//
//  @Mock
//  private MessageService messageService;
//
//  @InjectMocks
//  private MessagesController chatController;
//
//  @BeforeEach
//  void setUp() {
//    MockitoAnnotations.openMocks(this);
//  }
//
//  @Test
//  void createChat_ValidIds_ReturnsCreatedResponse() {
//    // Mock the UserRepository
//    User recipient = new User();
//    recipient.setId(1);
//    User sender = new User();
//    sender.setId(2);
//    when(userRepository.findById(1)).thenReturn(Optional.of(recipient));
//    when(userRepository.findById(2)).thenReturn(Optional.of(sender));
//
//    // Mock the MessageService
//    MessageDto createdMessageDto = new MessageDto();
//    createdMessageDto.setChatId(1);
//    when(messageService.createChat(any(MessageDto.class), any(ChatDto.class))).thenReturn(createdMessageDto);
//
//    // Call the createChat method
//    ResponseEntity<ChatDto> response = chatController.createChat();
//
//    // Verify the UserRepository interactions
//    verify(userRepository, times(1)).findById(1);
//    verify(userRepository, times(1)).findById(2);
//    verifyNoMoreInteractions(userRepository);
//
//    // Verify the MessageService interactions
//    verify(messageService, times(1)).createChat(any(MessageDto.class), any(ChatDto.class));
//    verifyNoMoreInteractions(messageService);
//
//    // Verify the response
//    assertEquals(HttpStatus.CREATED, response.getStatusCode());
//    assertEquals("/api/messages/chats/1", response.getHeaders().getLocation().toString());
//    assertEquals(createdMessageDto.getChatId(), response.getBody().getChatId());
//  }
//  @Test
//  void createChat_InvalidRecipientId_ThrowsEntityNotFoundException() {
//    // Mock the UserRepository
//    when(userRepository.findById(1)).thenReturn(Optional.empty());
//
//    // Call the createChat method and expect an exception
//    try {
//      chatController.createChat();
//    } catch (EntityNotFoundException e) {
//      // Verify the UserRepository interaction
//      verify(userRepository, times(1)).findById(1);
//      verifyNoMoreInteractions(userRepository);
//
//      // Verify that the exception message contains the correct recipient ID
//      assertEquals("Recipient not found with id: 1", e.getMessage());
//      return;
//    }
//
//    // Fail the test if no exception is thrown
//    fail("Expected EntityNotFoundException, but no exception was thrown.");
//  }
//
//  @Test
//  void createChat_InvalidSenderId_ThrowsEntityNotFoundException() {
//    // Mock the UserRepository
//    User recipient = new User();
//    recipient.setId(1);
//    when(userRepository.findById(1)).thenReturn(Optional.of(recipient));
//    when(userRepository.findById(2)).thenReturn(Optional.empty());
//
//    // Call the createChat method and expect an exception
//    try {
//      chatController.createChat();
//    } catch (EntityNotFoundException e) {
//      // Verify the UserRepository interactions
//      verify(userRepository, times(1)).findById(1);
//      verify(userRepository, times(1)).findById(2);
//      verifyNoMoreInteractions(userRepository);
//
//      // Verify that the exception message contains the correct sender ID
//      assertEquals("Sender not found with id: 2", e.getMessage());
//      return;
//    }
//
//    // Fail the test if no exception is thrown
//    fail("Expected EntityNotFoundException, but no exception was thrown.");
//  }
}
