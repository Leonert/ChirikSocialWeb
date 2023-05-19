package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.exception.custom.AccessDeniedException;
import com.socialnetwork.api.exception.custom.InvalidTokenUsernameException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.exception.custom.TokenExpiredException;
import com.socialnetwork.api.mapper.authorized.UserMapper;
import com.socialnetwork.api.models.additional.Response;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.NotificationService;
import com.socialnetwork.api.service.authorized.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;
import static com.socialnetwork.api.util.Constants.Auth.CONFIRMATION_REQUIRED;
import static com.socialnetwork.api.util.Constants.Auth.WRONG_PASSWORD;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class LoginController {
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenUtil jwtTokenUtil;
  private final UserMapper userMapper;
  private final NotificationService notificationService;


  @PostMapping()
  public ResponseEntity<?> logIn(@RequestBody UserDto.Request.Credentials userDto) throws AccessDeniedException {
    User user = userService.findByEmailAddress(userDto.getEmailAddress()).orElseThrow(AccessDeniedException::new);

    if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(WRONG_PASSWORD));
    }

    if (!user.isEnabled()) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response(CONFIRMATION_REQUIRED));
    }
    notificationService.saveLogin(user);

    return ResponseEntity.ok(userMapper.convertToAccountData(user,
            jwtTokenUtil.generateToken(user.getUsername(), userDto.getRememberMe())));
  }

  @GetMapping("jwt")
  public ResponseEntity<?> loginByToken(HttpServletRequest request)
          throws NoUserWithSuchCredentialsException {
    String auth = request.getHeader(AUTHORIZATION_HEADER);
    User user = userService.findByUsername((String) request.getAttribute("username"));
    return ResponseEntity.ok(userMapper.convertToAccountData(user, auth));
  }
}