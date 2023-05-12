package com.socialnetwork.api.controller;
import com.socialnetwork.api.dto.MessageDto;
import com.socialnetwork.api.models.base.Message;
import com.socialnetwork.api.repository.MessageRepository;
import com.socialnetwork.api.service.MessageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class MessagesControllerTest {
  private MockMvc mockMvc;

  @Mock
  private MessageService messageService;

  @InjectMocks
  private MessagesController messagesController;

  @Mock
  private MessageRepository messageRepository;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
    messagesController = new MessagesController(messageRepository, messageService, new ModelMapper());
    mockMvc = MockMvcBuilders.standaloneSetup(messagesController).build();
  }

  @Test
  public void testGetMessageById() throws Exception {
    int messageId = 1;
    MessageDto messageDto = new MessageDto();
    messageDto.setId(messageId);
    messageDto.setMessage("Test message");

    when(messageService.getMessageById(messageId)).thenReturn(messageDto);

    mockMvc.perform(get("/api/messages/{id}", messageId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(messageId))
            .andExpect(jsonPath("$.message").value("Test message"));

    verify(messageService, times(1)).getMessageById(messageId);
    verifyNoMoreInteractions(messageService);
  }

  @Test
  public void testGetAllMessages() {
    // Create a list of messages
    List<Message> messages = new ArrayList<>();
    Message message1 = new Message();
    message1.setId(1);
    message1.setMessage("Hello");
    messages.add(message1);
    Message message2 = new Message();
    message2.setId(2);
    message2.setMessage("World");
    messages.add(message2);

    // Mock the message repository
    when(messageRepository.findAll()).thenReturn(messages);

    // Act
    ResponseEntity<List<MessageDto>> response = messagesController.getAllMessages();

    // Assert
    assertEquals(HttpStatus.OK, response.getStatusCode());

    List<MessageDto> messageDtos = response.getBody();
    assertEquals(2, messageDtos.size());

    MessageDto messageDto1 = messageDtos.get(0);
    assertEquals(1, messageDto1.getId());
    assertEquals("Hello", messageDto1.getMessage());

    MessageDto messageDto2 = messageDtos.get(1);
    assertEquals(2, messageDto2.getId());
    assertEquals("World", messageDto2.getMessage());
  }

  @Test
  public void testMarkMessageAsRead() throws Exception {
    int messageId = 1;

    mockMvc.perform(put("/api/messages/{id}/read", messageId))
            .andExpect(status().isNoContent());

    verify(messageService, times(1)).markAsRead(messageId);
    verifyNoMoreInteractions(messageService);
  }
}