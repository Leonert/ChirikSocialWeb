package com.socialnetwork.api.controller;

import com.socialnetwork.api.entity.User;
import com.socialnetwork.api.exception.EmailVerificationException;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
  private final UserService userService;

  // for testing in h2 console (http://localhost:8080/h2-console)
  // INSERT INTO USERS(id, email_address, username, is_enabled) VALUES(1, 'testemail1@gmail.com', 'username1', false);
  // INSERT INTO USERS(id, email_address, username, is_enabled) VALUES(2, 'testemail2@gmail.com', 'username2', false);
  // INSERT INTO USERS(id, email_address, username, is_enabled) VALUES(3, 'testemail3@gmail.com', 'username3', false);
  @PostMapping("registration/check-credentials")
  public ResponseEntity<String> checkRegistrationCredentials(@RequestBody User user) {
    Optional<User> optionalUserByUsername =
            userService.findByUsername(user.getUsername());

    if (optionalUserByUsername.isPresent()) {
      return ResponseEntity.badRequest().body("User with such username already exists.");
    }

    Optional<User> optionalUserByEmailAddress =
            userService.findByEmailAddress(user.getEmailAddress());

    if (optionalUserByEmailAddress.isPresent()) {
      return ResponseEntity.badRequest().body("User with such email address already exists.");
    }

    return ResponseEntity.ok("Ok");
  }

  @PostMapping("registration/register")
  public ResponseEntity<String> registerUser(@RequestBody User user) {
    userService.saveUser(user);
    return ResponseEntity.ok("Ok");
  }

  @RequestMapping(value = "registration/confirm-account", method = {RequestMethod.GET, RequestMethod.POST})
  public ResponseEntity<String> confirmUserAccount(@RequestParam("token") String confirmationToken) {
    try {
      userService.confirmEmail(confirmationToken);
      return ResponseEntity.ok("Ok");
    } catch (EmailVerificationException evx) {
      return ResponseEntity.badRequest().body(evx.getMessage());
    }
  }
}
