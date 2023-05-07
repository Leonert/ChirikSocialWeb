package com.socialnetwork.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NoUserWithSuchCredentialsException extends Exception {
  public NoUserWithSuchCredentialsException() {
    super("User with such credentials wasn`t found");
  }
}
