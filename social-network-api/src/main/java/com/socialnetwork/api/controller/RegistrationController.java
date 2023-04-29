package com.socialnetwork.api.controller;

import com.socialnetwork.api.exception.EmailVerificationException;
import com.socialnetwork.api.model.BadResponse;
import com.socialnetwork.api.model.GoodResponse;
import com.socialnetwork.api.model.User;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/api/registration")
@RequiredArgsConstructor
public class RegistrationController {

  private static final String USERNAME_TAKEN = "User with such username already exists.";
  private static final String EMAIL_TAKEN = "User with such email address already exists.";
  private static final URL EMAIL_CONFIRMED_HTML_URL
      = RegistrationController.class.getResource("/html/email-confirmed.html");
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;

  @PostMapping("check-email")
  public ResponseEntity<?> checkIfEmailExists(@RequestBody User user) {
    Optional<User> optionalUserByEmailAddress =
        userService.findByEmailAddress(user.getEmailAddress());

    if (optionalUserByEmailAddress.isPresent()) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(new BadResponse(EMAIL_TAKEN));
    }

    return ResponseEntity.ok(new GoodResponse("Ok"));
  }

  @PostMapping("check-username")
  public ResponseEntity<?> checkIfUsernameExists(@RequestBody User user) {
    Optional<User> optionalUserByUsername =
        userService.findByUsername(user.getUsername());

    if (optionalUserByUsername.isPresent()) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(new BadResponse(USERNAME_TAKEN));
    }

    return ResponseEntity.ok(new GoodResponse("Ok"));
  }

  @PostMapping("save-user")
  public ResponseEntity<?> saveUserAndSendConfirmation(@RequestBody User user) {
    String rawPassword = user.getPassword();
    user.setPassword(passwordEncoder.encode(rawPassword));
    userService.saveUser(user);
    return ResponseEntity.ok(new GoodResponse("Ok"));
  }

  @RequestMapping(value = "activate", method = {RequestMethod.GET, RequestMethod.POST})
  public ResponseEntity<?> confirmUserAccount(@RequestParam("token") String confirmationToken)
      throws IOException, URISyntaxException {
    try {
      String html = new String(Files.readAllBytes(Paths.get(EMAIL_CONFIRMED_HTML_URL.toURI())));
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.TEXT_HTML);
      userService.verifyAccount(confirmationToken);
      return new ResponseEntity<>(html, headers, HttpStatus.OK);
    } catch (EmailVerificationException evx) {
      return ResponseEntity.badRequest().body(new BadResponse(evx.getMessage()));
    }
  }
}
