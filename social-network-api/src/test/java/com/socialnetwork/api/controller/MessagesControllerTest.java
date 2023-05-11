package com.socialnetwork.api.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.socialnetwork.api.dto.MessageDto;
import com.socialnetwork.api.service.MessageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class MessagesControllerTest {
  private MockMvc mockMvc;

  @Mock
  private MessageService messageService;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
    MessagesController messagesController = new MessagesController(messageService, new ModelMapper());
    mockMvc = MockMvcBuilders.standaloneSetup(messagesController).build();
  }

  @Test
  public void testGetMessageById() throws Exception {
    int messageId = 1;
    MessageDto messageDto = new MessageDto();
    messageDto.setId(String.valueOf(messageId));
    messageDto.setMessage("Test message");

    when(messageService.getMessageById(messageId)).thenReturn(messageDto);

    mockMvc.perform(get("/api/messages/{id}", messageId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(String.valueOf(messageId)))
            .andExpect(jsonPath("$.message").value("Test message"));

    verify(messageService, times(1)).getMessageById(messageId);
    verifyNoMoreInteractions(messageService);
  }

  @Test
  public void testGetAllMessages() throws Exception {
    MessageDto messageDto1 = new MessageDto();
    messageDto1.setId("1");
    messageDto1.setMessage("Message 1");

    MessageDto messageDto2 = new MessageDto();
    messageDto2.setId("2");
    messageDto2.setMessage("Message 2");

    List<MessageDto> messageDtos = Arrays.asList(messageDto1, messageDto2);

    when(messageService.getAllMessages()).thenReturn(messageDtos);

    mockMvc.perform(get("/api/messages/messages"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value("1"))
            .andExpect(jsonPath("$[0].message").value("Message 1"))
            .andExpect(jsonPath("$[1].id").value("2"))
            .andExpect(jsonPath("$[1].message").value("Message 2"));

    verify(messageService, times(1)).getAllMessages();
    verifyNoMoreInteractions(messageService);
  }

  // Add other test methods for the remaining controller actions

  @Test
  public void testMarkMessageAsRead() throws Exception {
    int messageId = 1;

    mockMvc.perform(put("/api/messages/{id}/read", messageId))
            .andExpect(status().isNoContent());

    verify(messageService, times(1)).markAsRead(messageId);
    verifyNoMoreInteractions(messageService);
  }
}