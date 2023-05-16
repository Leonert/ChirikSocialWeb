package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.NotificationDto;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.NotificationMapper;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
  private final JwtTokenUtil jwtTokenUtil;
  private final UserService userService;
  private final NotificationMapper notificationMapper;

  @GetMapping()
  public List<NotificationDto> getUserNotifications(HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return notificationMapper.mapNotifications(userService.findByUsername(jwtTokenUtil.getUsernameFromToken(
        request.getHeader(AUTHORIZATION_HEADER))).getNotifications());
  }
}
