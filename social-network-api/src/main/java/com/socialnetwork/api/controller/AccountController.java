package com.socialnetwork.api.controller;

import com.socialnetwork.api.entity.User;
import com.socialnetwork.api.model.RegistrationData;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
  private final UserService userService;

  private ResponseEntity<String> statusCodeAndMessage(int statusCode, String message) {
    return ResponseEntity.status(statusCode).body(message);
  }

  // for testing in h2 console (http://localhost:8080/h2-console)
  //  INSERT INTO USERS(id, email_address, username) VALUES(1, 'testemail1@gmail.com', 'username1');
  //  INSERT INTO USERS(id, email_address, username) VALUES(2, 'testemail2@gmail.com', 'username2');
  //  INSERT INTO USERS(id, email_address, username) VALUES(3, 'testemail3@gmail.com', 'username3');
  @PostMapping("registration")
  public ResponseEntity<String> handler(@RequestBody RegistrationData accountData) {
    // 1. check if there is no user with such username (if no - send 403 and reason message)
    // 2. check if there is no user with such email    (if no - send 403 and reason message)
    // 3. all ok - email confirmation
    Optional<User> optionalUserByUsername =
            userService.findByUsername(accountData.username());

    if (optionalUserByUsername.isPresent()) {
      return statusCodeAndMessage(403, "User with such username already exists.");
    }

    Optional<User> optionalUserByEmailAddress =
            userService.findByEmailAddress(accountData.emailAddress());

    if (optionalUserByEmailAddress.isPresent()) {
      return statusCodeAndMessage(403, "User with such email address already exists.");
    }

    // email confirmation

    return ResponseEntity.status(200).body("All ok!");
  }
}
