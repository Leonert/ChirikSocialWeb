package com.socialnetwork.api.service;

import com.socialnetwork.api.dto.MessageDto;
import com.socialnetwork.api.exception.ResourceNotFoundException;
import com.socialnetwork.api.models.base.Message;
import com.socialnetwork.api.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
  private final MessageRepository messageRepository;
  private final ModelMapper modelMapper;

  @Override
  public MessageDto getMessageById(int id) {
    Message message = messageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Message", "id", id));
    return modelMapper.map(message, MessageDto.class);
  }

  @Override
  public List<MessageDto> getAllMessages() {
    List<Message> messages = messageRepository.findAll();
    return messages.stream().map(message -> modelMapper.map(message, MessageDto.class)).collect(Collectors.toList());
  }

  @Override
  public MessageDto createMessage(MessageDto messageDto) {
    Message message = modelMapper.map(messageDto, Message.class);
    message.setId(0);
    message = messageRepository.save(message);
    return modelMapper.map(message, MessageDto.class);
  }

  @Override
  public MessageDto updateMessage(MessageDto messageDto) {
    Message message = modelMapper.map(messageDto, Message.class);
    message = messageRepository.save(message);
    return modelMapper.map(message, MessageDto.class);
  }

  @Override
  public void deleteMessage(int id) {
    messageRepository.deleteById(id);
  }

  @Override
  public List<MessageDto> searchMessages(String keyword) {
    List<Message> messages = messageRepository.findByMessageContainingIgnoreCase(keyword);
    return messages.stream().map(message -> modelMapper.map(message, MessageDto.class)).collect(Collectors.toList());
  }
}

