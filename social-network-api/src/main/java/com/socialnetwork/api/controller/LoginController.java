package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.UserDto;
import com.socialnetwork.api.exception.AccessDeniedException;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.additional.Response;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.NotificationService;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class LoginController {

  private static final String NO_SUCH_EMAIL = "User with such email doesnt`t exist.";
  private static final String WRONG_PASSWORD = "You entered an incorrect password. Check the password.";
  private static final String CONFIRMATION_REQUIRED = "The account exists but needs to be activated.";
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenUtil jwtTokenUtil;
  private final ModelMapper modelMapper;
  private final NotificationService notificationService;


  @PostMapping("/authenticate")
  public ResponseEntity<?> createAuthToken(@RequestBody UserDto.Request.Credentials userDto) throws AccessDeniedException {
    User user = userService.findByEmailAddress(userDto.getEmailAddress()).orElseThrow(AccessDeniedException::new);

    if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(WRONG_PASSWORD));
    }

    if (!user.isEnabled()) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response(CONFIRMATION_REQUIRED));
    }

    String jwt = jwtTokenUtil.generateToken(user.getUsername(), userDto.getRememberMe());

    UserDto.Response.AccountData userDtoResponse = new UserDto.Response.AccountData();
    userDtoResponse.setUser(convertToUserDto(user));
    userDtoResponse.setJwt(jwt);

    notificationService.saveLogin(user);

    return ResponseEntity.ok(userDtoResponse);
  }

  private UserDto.Response.Default convertToUserDto(User user) {
    return modelMapper.map(user, UserDto.Response.Default.class);
  }
}