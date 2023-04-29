package com.socialnetwork.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class NoPostWithSuchIdException extends Exception {
  public NoPostWithSuchIdException() {
    super("Post with such id wasn`t found");
  }
}
