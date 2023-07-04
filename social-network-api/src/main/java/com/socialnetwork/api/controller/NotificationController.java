package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.NotificationDto;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.authorized.NotificationMapper;
import com.socialnetwork.api.security.CurrentUser;
import com.socialnetwork.api.security.jwt.UserPrincipal;
import com.socialnetwork.api.service.authorized.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

  private final UserService userService;
  private final NotificationMapper notificationMapper;

  @GetMapping()
  public ResponseEntity<List<NotificationDto>> getUserNotifications(@CurrentUser UserPrincipal currentUser)
          throws NoUserWithSuchCredentialsException {
    List<NotificationDto> notifications = new ArrayList<>(notificationMapper.mapNotifications(userService.findByUsername(
            currentUser.getUsername()).getNotifications()));

    Collections.reverse(notifications);

    return getListResponseEntity(notifications);
  }

  private ResponseEntity<List<NotificationDto>> getListResponseEntity(List<NotificationDto> list) {
    return ResponseEntity.status(list.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK).body(list);
  }
}
