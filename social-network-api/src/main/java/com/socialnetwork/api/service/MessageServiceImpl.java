package com.socialnetwork.api.service;

import com.socialnetwork.api.dto.chat.ChatDto;
import com.socialnetwork.api.dto.chat.MessageDto;
import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.model.base.chat.Chat;
import com.socialnetwork.api.model.base.chat.Message;
import com.socialnetwork.api.repository.ChatRepository;
import com.socialnetwork.api.repository.MessageRepository;
import com.socialnetwork.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
  private final MessageRepository messageRepository;
  private final ModelMapper modelMapper;
  private final UserRepository userRepository;
  private final ChatRepository chatRepository;

  @Override
  public List<MessageDto> getAllMessages(User recipient) {
    List<Message> receivedMessages = messageRepository.findByRecipient(recipient);
    List<Message> sentMessages = messageRepository.findBySender(recipient);

    List<MessageDto> messageDtos = new ArrayList<>();

    for (Message message : receivedMessages) {
      messageDtos.add(convertToMessageDto(message));
    }

    for (Message message : sentMessages) {
      messageDtos.add(convertToMessageDto(message));
    }

    return messageDtos;
  }

  @Override
  public List<UserDto.Response.Listing> searchUsers(String keyword) {
    List<User> users = userRepository.findByUsernameContainingIgnoreCase(keyword);
    return users.stream()
            .map(user -> modelMapper.map(user, UserDto.Response.Listing.class))
            .collect(Collectors.toList());
  }

  @Override
  public MessageDto getMessageById(int id) {
    Message message = messageRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Message not found with id: " + id));
    return convertToMessageDto(message);
  }

  @Override
  public ChatDto getChatById(int chatId) {
    Chat chat = chatRepository.findById(chatId)
            .orElseThrow(() -> new EntityNotFoundException("Chat not found with id: " + chatId));
    ChatDto chatDto = convertToChatDto(chat);
    List<MessageDto> messages = getMessagesByChatId(chatId);
    chatDto.setMessages(messages);
    return chatDto;
  }

  private ChatDto convertToChatDto(Chat chat) {
    return modelMapper.map(chat, ChatDto.class);
  }

  @Override
  public MessageDto addMessage(MessageDto messageDto, ChatDto chatDto) {
    User sender = userRepository.findById(messageDto.getSenderId())
            .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + messageDto.getSenderId()));

    User recipient = userRepository.findById(messageDto.getRecipientId())
            .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + messageDto.getRecipientId()));

    Message message = new Message();
    message.setRecipient(recipient);
    message.setSender(sender);
    message.setMessage(messageDto.getMessage());
    message.setTimestamp(LocalDateTime.now());
    message.setRead(false);

    Chat chat = chatRepository.findById(chatDto.getChatId())
            .orElseThrow(() -> new EntityNotFoundException("Chat not found with id: " + chatDto.getChatId()));

    message.setChat(chat);

    message = messageRepository.save(message);

    return convertToMessageDto(message);
  }

  @Override
  public MessageDto updateMessage(MessageDto messageDto) {
    Message message = convertToMessage(messageDto);
    message = messageRepository.save(message);
    return convertToMessageDto(message);
  }

  @Override
  public void deleteMessage(int id) {
    messageRepository.deleteById(id);
  }

  @Override
  public void deleteChat(int chatId) {
    chatRepository.deleteById(chatId);
  }

  @Override
  public List<MessageDto> searchMessages(String keyword) {
    List<Message> messages = messageRepository.findByMessageContainingIgnoreCase(keyword);
    return messages.stream()
            .map(this::convertToMessageDto)
            .collect(Collectors.toList());
  }

  @Override
  public void markAsRead(int id) {
    Message message = messageRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Message not found with id: " + id));
    message.setRead(true);
    messageRepository.save(message);
  }

  @Override
  public MessageDto createChat(MessageDto messageDto, ChatDto chatDto) {
    Message message = new Message();
    message.setRead(false);
    message.setMessage(messageDto.getMessage());
    message.setTimestamp(LocalDateTime.now());

    User recipient = userRepository.findById(messageDto.getRecipientId())
            .orElseThrow(() ->
                    new EntityNotFoundException("Recipient not found with id: "
                            + messageDto.getRecipientId()));
    User sender = userRepository.findById(messageDto.getSenderId())
            .orElseThrow(() ->
                    new EntityNotFoundException("Sender not found with id: "
                            + messageDto.getSenderId()));

    Chat chat = new Chat();
    chat.setUsers(Arrays.asList(recipient, sender));
    chat = chatRepository.save(chat);

    message.setChat(chat);
    message.setRecipient(recipient);
    message.setSender(sender);

    message = messageRepository.save(message);

    return convertToMessageDto(message);
  }

  @Override
  public List<MessageDto> getMessagesByChatId(int chatId) {
    List<Message> messages = messageRepository.findByChat_ChatIdOrderByTimestampDesc(chatId);
    return messages.stream()
            .map(this::convertToMessageDto)
            .collect(Collectors.toList());
  }

  private MessageDto convertToMessageDto(Message message) {
    MessageDto messageDto = modelMapper.map(message, MessageDto.class);
    messageDto.setSenderUsername(message.getSender().getUsername());
    messageDto.setRecipientUsername(message.getRecipient().getUsername());
    return messageDto;
  }

  private Message convertToMessage(MessageDto messageDto) {
    return modelMapper.map(messageDto, Message.class);
  }
}

