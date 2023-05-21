package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.NotificationDto;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.authorized.NotificationMapper;
import com.socialnetwork.api.service.authorized.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.socialnetwork.api.util.Constants.Auth.USERNAME_ATTRIBUTE;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
  private final UserService userService;
  private final NotificationMapper notificationMapper;

  @GetMapping()
  public ResponseEntity<List<NotificationDto>> getUserNotifications(@RequestAttribute(USERNAME_ATTRIBUTE) String username)
        throws NoUserWithSuchCredentialsException {
    return getListResponseEntity(notificationMapper.mapNotifications(userService.findByUsername(
          username).getNotifications()));
  }

  private ResponseEntity<List<NotificationDto>> getListResponseEntity(List<NotificationDto> list) {
    return ResponseEntity.status(list.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK).body(list);
  }
}
