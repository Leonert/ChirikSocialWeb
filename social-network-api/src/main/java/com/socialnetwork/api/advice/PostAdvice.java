package com.socialnetwork.api.advice;

import com.socialnetwork.api.dto.Response;
import com.socialnetwork.api.exception.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class PostAdvice {
  @ExceptionHandler({NoUserWithSuchCredentialsException.class, NoPostWithSuchIdException.class})
  public ResponseEntity<Response> handleException(Exception exception) {
    return new ResponseEntity<>(new Response(exception.getMessage()), HttpStatus.BAD_REQUEST);
  }
}
