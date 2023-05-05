package com.socialnetwork.api.controller;

import com.socialnetwork.api.model.BadResponse;
import com.socialnetwork.api.model.Credentials;
import com.socialnetwork.api.model.User;
import com.socialnetwork.api.model.UserResponse;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class LoginController {

  private static final String NO_SUCH_USERNAME = "User with such username doesnt`t exist.";
  private static final String WRONG_PASSWORD = "You entered an incorrect password. Check the password.";
  private static final String CONFIRMATION_REQUIRED = "The account exists but needs to be activated.";
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenUtil jwtTokenUtil;

  @PostMapping("/authenticate")
  public ResponseEntity<?> createAuthToken(@RequestBody Credentials credentials) {
    Optional<User> optionalUser = userService.findByUsername(credentials.getUsername());

    if (optionalUser.isEmpty()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BadResponse(NO_SUCH_USERNAME));
    }

    User user = optionalUser.get();

    if (!passwordEncoder.matches(credentials.getPassword(), user.getPassword())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BadResponse(WRONG_PASSWORD));
    }

    if (!user.isEnabled()) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new BadResponse(CONFIRMATION_REQUIRED));
    }

    String jwt = jwtTokenUtil.generateToken(credentials.getUsername(), credentials.isRememberMe());

    return ResponseEntity.ok(new UserResponse(user, jwt));
  }
}
