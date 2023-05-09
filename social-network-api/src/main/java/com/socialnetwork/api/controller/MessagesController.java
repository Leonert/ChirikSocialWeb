package com.socialnetwork.api.controller;

import com.socialnetwork.api.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class MessagesController {
  private final MessageService chatService;


}
