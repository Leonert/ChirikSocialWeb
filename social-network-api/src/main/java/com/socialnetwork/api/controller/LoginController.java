package com.socialnetwork.api.controller;

import com.socialnetwork.api.model.Credentials;
import com.socialnetwork.api.model.JwtResponse;
import com.socialnetwork.api.model.User;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

  private final UserService userService;

  private final PasswordEncoder passwordEncoder;

  private final JwtTokenUtil jwtTokenUtil;

  private static final String NO_SUCH_USERNAME = "User with such username doesnt`t exist.";

  private static final String WRONG_PASSWORD = "You entered an incorrect password. Check the password.";

  @PostMapping("/authenticate")
  public ResponseEntity<?> createAuthToken(@RequestBody Credentials credentials) {
    Optional<User> optionalUser = userService.findByUsername(credentials.getUsername());

    if (optionalUser.isEmpty()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(NO_SUCH_USERNAME);
    }

    User user = optionalUser.get();

    if (!passwordEncoder.matches(credentials.getPassword(), user.getPassword())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(WRONG_PASSWORD);
    }

    String jwt = jwtTokenUtil.generateToken(credentials.getUsername(), credentials.isRememberMe());

    return ResponseEntity.ok(new JwtResponse(jwt));
  }
}
