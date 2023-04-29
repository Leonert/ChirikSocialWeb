package com.socialnetwork.api.advice;

import com.socialnetwork.api.DTO.Response;
import com.socialnetwork.api.exception.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class PostAdvice {
  @ExceptionHandler({NoUserWithSuchCredentialsException.class, NoPostWithSuchIdException.class})
  public ResponseEntity<Response> handleException(Exception e) {
    return new ResponseEntity<>(new Response(e.getMessage()), HttpStatus.BAD_REQUEST);
  }
}
