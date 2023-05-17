package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.UserDto;
import com.socialnetwork.api.exception.custom.EmailVerificationException;
import com.socialnetwork.api.mapper.UserMapper;
import com.socialnetwork.api.models.additional.Response;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PatchMapping;


import static com.socialnetwork.api.util.Constants.Auth.EMAIL_TAKEN;
import static com.socialnetwork.api.util.Constants.Auth.USERNAME_TAKEN;

@RestController
@RequestMapping("/api/registration")
@RequiredArgsConstructor
public class RegistrationController {
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final UserMapper userMapper;


  @GetMapping("email")
  public ResponseEntity<?> checkIfEmailExists(@RequestParam("e") String email) {
    return userService.existsByEmailAddress(email)
            ? ResponseEntity.status(HttpStatus.CONFLICT).body(new Response(EMAIL_TAKEN)) :
            ResponseEntity.ok(new Response("Ok"));
  }

  @GetMapping("username")
  public ResponseEntity<?> checkIfUsernameExists(@RequestParam("u") String username) {
    return userService.existsByUsername(username)
            ? ResponseEntity.status(HttpStatus.CONFLICT).body(new Response(USERNAME_TAKEN)) :
            ResponseEntity.ok(new Response("Ok"));
  }

  @PostMapping()
  public ResponseEntity<?> saveUser(@RequestBody UserDto.Request.Registration userDto) {
    User user = userMapper.convertToUser(userDto);
    String rawPassword = user.getPassword();
    user.setPassword(passwordEncoder.encode(rawPassword));
    userService.save(user);
    return ResponseEntity.ok(new Response("Ok"));
  }

  @PatchMapping()
  public ResponseEntity<?> activateAccount(@RequestParam("token") String confirmationToken) {
    try {
      userService.verifyAccount(confirmationToken);
      return ResponseEntity.ok(new Response("Ok"));
    } catch (EmailVerificationException evx) {
      return ResponseEntity.badRequest().body(new Response(evx.getMessage()));
    }
  }
}
