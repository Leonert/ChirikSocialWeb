package com.socialnetwork.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.socialnetwork.api.dto.MessageDto;
import com.socialnetwork.api.service.MessageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebMvcTest(MessagesController.class)
public class MessagesControllerCreateTest {
//  @Autowired
//  private MockMvc mockMvc;
//
//  @Autowired
//  private ObjectMapper objectMapper;
//
//  @MockBean
//  private MessageService messageService;

//  @Test
//  public void testCreateMessage() throws Exception {
    // Prepare the input message
//    MessageDto inputMessage = new MessageDto();
//    inputMessage.setMessage("Test message");
//    inputMessage.setRead(false);

    // Prepare the created message
//    MessageDto createdMessage = new MessageDto();
//    createdMessage.setId("1");
//    createdMessage.setMessage("Test message");
//    createdMessage.setRead(false);
//    createdMessage.setTimestamp(LocalDateTime.now());

    // Mock the messageService.createMessage() method
//    when(messageService.createMessage(any(MessageDto.class))).thenReturn(createdMessage);

    // Perform the POST request
//    mockMvc.perform(MockMvcRequestBuilders.post("/api/messages/create")
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(objectMapper.writeValueAsString(inputMessage)))
//            .andExpect(MockMvcResultMatchers.status().isCreated())
//            .andExpect(MockMvcResultMatchers.header().string("Location", "/api/messages/1"))
//            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("1"))
//            .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Test message"))
//            .andExpect(MockMvcResultMatchers.jsonPath("$.read").value(false));
  }
//}
