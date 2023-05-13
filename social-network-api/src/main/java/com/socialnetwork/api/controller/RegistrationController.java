package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.UserDto;
import com.socialnetwork.api.exception.EmailVerificationException;
import com.socialnetwork.api.models.additional.Response;
import com.socialnetwork.api.models.base.User;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@RestController
@RequestMapping("/api/registration")
@RequiredArgsConstructor
public class RegistrationController {
  private static final String USERNAME_TAKEN = "User with such username already exists.";
  private static final String EMAIL_TAKEN = "User with such email address already exists.";
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final ModelMapper modelMapper;


  @PostMapping("check-email")
  public ResponseEntity<?> checkIfEmailExists(@RequestBody UserDto.Request.Email userDto) {
    Optional<User> optionalUserByEmailAddress =
            userService.findByEmailAddress(userDto.getEmailAddress());

    if (optionalUserByEmailAddress.isPresent()) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(new Response(EMAIL_TAKEN));
    }

    return ResponseEntity.ok(new Response("Ok"));
  }

  @PostMapping("check-username")
  public ResponseEntity<?> checkIfUsernameExists(@RequestBody UserDto.Request.Username userDto) {
    return userService.existsByUsername(userDto.getUsername())
            ? ResponseEntity.status(HttpStatus.CONFLICT).body(new Response(USERNAME_TAKEN)) :
            ResponseEntity.ok(new Response("Ok"));
  }

  @PostMapping("save-user")
  public ResponseEntity<?> saveUserAndSendConfirmation(@RequestBody UserDto.Request.Registration userDto) {
    User user = convertToUser(userDto);
    String rawPassword = user.getPassword();
    user.setPassword(passwordEncoder.encode(rawPassword));
    userService.save(user);
    return ResponseEntity.ok(new Response("Ok"));
  }

  @RequestMapping(value = "activate", method = {RequestMethod.GET, RequestMethod.POST})
  public ResponseEntity<?> confirmUserAccount(@RequestParam("token") String confirmationToken) {
    try {
      userService.verifyAccount(confirmationToken);
      return ResponseEntity.ok(new Response("Ok"));
    } catch (EmailVerificationException evx) {
      return ResponseEntity.badRequest().body(new Response(evx.getMessage()));
    }
  }

  private User convertToUser(UserDto.Request.Registration userDto) {
    return modelMapper.map(userDto, User.class);
  }
}
