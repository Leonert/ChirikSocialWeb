package com.socialnetwork.api.controller;

import com.socialnetwork.api.entity.User;
import com.socialnetwork.api.exception.EmailVerificationException;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
  private final UserService userService;
  private static final URL EMAIL_CONFIRMED_HTML_URL
          = AccountController.class.getResource("/html/email-confirmed.html");

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
      String html = new String(Files.readAllBytes(Paths.get(EMAIL_CONFIRMED_HTML_URL.toURI())));
      System.out.println(html);
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.TEXT_HTML);
      userService.verifyAccount(confirmationToken);
      return new ResponseEntity<>(html, headers, HttpStatus.OK);
    } catch (EmailVerificationException evx) {
      return ResponseEntity.badRequest().body(evx.getMessage());
    } catch (IOException | URISyntaxException e) {
      throw new RuntimeException(e);
    }
  }
}
