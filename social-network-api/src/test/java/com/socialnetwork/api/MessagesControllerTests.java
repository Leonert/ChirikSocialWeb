package com.socialnetwork.api;

import com.socialnetwork.api.controller.MessagesController;
import com.socialnetwork.api.dto.MessageDto;
import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.models.base.Message;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.MessageRepository;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.service.MessageService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.mockito.Mockito.verify;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
@SpringBootTest
public class MessagesControllerTests {
  @Mock
  private MessageService messageService;
  @Mock
  private MessageRepository messageRepository;
  @Mock
  private ModelMapper modelMapper;
  @Mock
  private UserRepository userRepository;
  @InjectMocks
  private MessagesController messagesController;
  @Test
  public void testGetMessageById() {
    // Arrange
    int messageId = 1;
    MessageDto expectedMessageDto = new MessageDto();
    // Set up the mock behavior
    when(messageService.getMessageById(messageId)).thenReturn(expectedMessageDto);

    // Act
    ResponseEntity<MessageDto> response = messagesController.getMessageById(messageId);

    // Assert
    assertSame(expectedMessageDto, response.getBody());
    assertEquals(HttpStatus.OK, response.getStatusCode());
  }
  @Test
  public void testCreateMessage() {
    // Arrange
    MessageDto messageDto = new MessageDto();
    MessageDto createdMessageDto = new MessageDto();
    // Set up the mock behavior
    when(messageService.createMessage(messageDto)).thenReturn(createdMessageDto);

    // Act
    ResponseEntity<MessageDto> response = messagesController.createMessage(messageDto);

    // Assert
    assertSame(createdMessageDto, response.getBody());
    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    assertEquals("/api/messages/" + createdMessageDto.getId(), response.getHeaders().getLocation().toString());
  }



  @Test
  public void testUpdateMessage() {
    // Arrange
    int messageId = 1;
    MessageDto messageDto = new MessageDto();
    MessageDto updatedMessageDto = new MessageDto();
    // Set up the mock behavior
    when(messageService.updateMessage(messageDto)).thenReturn(updatedMessageDto);

    // Act
    ResponseEntity<MessageDto> response = messagesController.updateMessage(messageId, messageDto);

    // Assert
    assertSame(updatedMessageDto, response.getBody());
    assertEquals(HttpStatus.OK, response.getStatusCode());
  }
  @Test
  public void testDeleteMessage() {
    // Arrange
    int messageId = 1;

    // Act
    ResponseEntity<Void> response = messagesController.deleteMessage(messageId);

    // Assert
    assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    verify(messageRepository).deleteById(messageId);
  }
  @Test
  public void testSearchMessages() {
    // Arrange
    String keyword = "test";
    List<MessageDto> expectedMessages = new ArrayList<>();
    expectedMessages.add(new MessageDto());
    expectedMessages.add(new MessageDto());
    // Set up the mock behavior
    when(messageService.searchMessages(keyword)).thenReturn(expectedMessages);

    // Act
    ResponseEntity<List<MessageDto>> response = messagesController.searchMessages(keyword);

    // Assert
    List<MessageDto> messages = response.getBody();
    assertNotNull(messages);
    assertEquals(2, messages.size());
    assertEquals(HttpStatus.OK, response.getStatusCode());
  }
  @Test
  public void testMarkMessageAsRead() {
    // Arrange
    int messageId = 1;

    // Act
    ResponseEntity<Void> response = messagesController.markMessageAsRead(messageId);

    // Assert
    assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    verify(messageService).markAsRead(messageId);
  }
  @Test
  public void testGetAllUsers() {
    // Arrange
    List<User> users = new ArrayList<>();
    users.add(new User());
    users.add(new User());
    List<UserDto.Response.Listing> expectedUserDtos = new ArrayList<>();
    expectedUserDtos.add(new UserDto.Response.Listing());
    expectedUserDtos.add(new UserDto.Response.Listing());
    // Set up the mock behavior
    when(userRepository.findAll()).thenReturn(users);
    when(modelMapper.map(Mockito.any(), Mockito.eq(UserDto.Response.Listing.class)))
            .thenReturn(new UserDto.Response.Listing());

    // Act
    ResponseEntity<List<UserDto.Response.Listing>> response = messagesController.getAllUsers();

    // Assert
    List<UserDto.Response.Listing> userDtos = response.getBody();
    assertNotNull(userDtos);
    assertEquals(2, userDtos.size());
    assertEquals(HttpStatus.OK, response.getStatusCode());
  }
}
