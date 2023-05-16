package com.socialnetwork.api.mapper;

import com.socialnetwork.api.dto.NotificationDto;
import com.socialnetwork.api.models.base.Notification;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class NotificationMapper{

  private final ModelMapper modelMapper;

  public List<NotificationDto> mapNotifications(List<Notification> notifications) {
    return notifications.stream().map(n -> modelMapper.map(n, NotificationDto.class)).toList();
  }
}
