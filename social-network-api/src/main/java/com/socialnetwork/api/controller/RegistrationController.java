package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.exception.custom.EmailException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.authorized.UserMapper;
import com.socialnetwork.api.model.additional.Response;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.service.authorized.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.socialnetwork.api.util.Constants.Auth.OK;
import static com.socialnetwork.api.util.Constants.Auth.EMAIL_TAKEN;
import static com.socialnetwork.api.util.Constants.Request.QUERY;
import static com.socialnetwork.api.util.Constants.Request.TOKEN_PARAMETER;
import static com.socialnetwork.api.util.Constants.Auth.USERNAME_TAKEN;

import static org.springframework.http.HttpStatus.CONFLICT;

@RestController
@RequestMapping("/api/registration")
@RequiredArgsConstructor
public class RegistrationController {

  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final UserMapper userMapper;


  @GetMapping("email")
  public ResponseEntity<Response> checkIfEmailExists(@RequestParam(QUERY) String email) {
    return response(userService.existsByEmailAddress(email), EMAIL_TAKEN);
  }

  @GetMapping("username")
  public ResponseEntity<Response> checkIfUsernameExists(@RequestParam(QUERY) String username) {
    return response(userService.existsByUsername(username), USERNAME_TAKEN);
  }

  @PostMapping()
  public ResponseEntity<Response> saveUser(@Valid @RequestBody UserDto.Request.Registration userDto) {
    User user = userMapper.convertToUser(userDto);
    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
    userService.save(user);
    return ResponseEntity.ok(Response.of(OK));
  }

  @PatchMapping()
  public ResponseEntity<Response> activateAccount(@RequestParam(TOKEN_PARAMETER) String confirmationToken)
      throws EmailException, NoUserWithSuchCredentialsException {
    userService.verifyAccount(confirmationToken);
    return ResponseEntity.ok(Response.of(OK));
  }

  private ResponseEntity<Response> response(boolean expression, String msg) {
    return expression
            ? ResponseEntity.status(CONFLICT).body(Response.of(msg))
            : ResponseEntity.ok(Response.of(OK));
  }
}
