package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.NotificationDto;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.base.Notification;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.socialnetwork.api.controller.UserController.AUTHORIZATION_HEADER;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
  private final JwtTokenUtil jwtTokenUtil;
  private final UserService userService;
  private final ModelMapper modelMapper;

  @GetMapping()
  public List<NotificationDto> getUserNotifications(HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return mapNotifications(userService.findByUsername(jwtTokenUtil.getUsernameFromToken(
        request.getHeader(AUTHORIZATION_HEADER))).getNotifications());
  }

  List<NotificationDto> mapNotifications(List<Notification> notifications) {
    return notifications.stream().map(n -> modelMapper.map(n, NotificationDto.class)).toList();
  }
}
