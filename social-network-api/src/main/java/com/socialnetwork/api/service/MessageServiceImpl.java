package com.socialnetwork.api.service;

import com.socialnetwork.api.dto.MessageDto;
import com.socialnetwork.api.exception.ResourceNotFoundException;
import com.socialnetwork.api.models.base.Message;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;


import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
  private final MessageRepository messageRepository;
  private final ModelMapper modelMapper;

  @Override
  public List<MessageDto> getAllMessages() {
    List<Message> messages = messageRepository.findAll();
    return messages.stream()
            .map(message -> modelMapper.map(message, MessageDto.class))
            .collect(Collectors.toList());
  }

  @Override
  public MessageDto getMessageById(int id) {
    Message message = messageRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Message not found with id: " + id));
    return modelMapper.map(message, MessageDto.class);
  }

  @Override
  public MessageDto updateMessage(MessageDto messageDto) {
    Message message = convertToMessage(messageDto);
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
    return messages.stream()
            .map(message -> modelMapper.map(message, MessageDto.class))
            .collect(Collectors.toList());
  }

  private Message convertToMessage(MessageDto messageDto) {
    return modelMapper.map(messageDto, Message.class);
  }


  public MessageDto createMessage(MessageDto messageDto) {
    Message message = convertToMessage(messageDto);
    messageRepository.save(message);
    return convertToMessageDto(message);
  }


  private MessageDto convertToMessageDto(Message message){
    return modelMapper.map(message, MessageDto.class);
  }
}
