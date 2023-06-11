package com.socialnetwork.api.exception;

import com.socialnetwork.api.exception.custom.AccessDeniedException;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.exception.custom.TokenInvalidException;
import com.socialnetwork.api.exception.custom.EmailException;
import com.socialnetwork.api.exception.custom.PostWithNoDataException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;

import static com.socialnetwork.api.util.Constants.Exception.MISSING_PATH_VARIABLE;
import static com.socialnetwork.api.util.Constants.Exception.MISSING_REQUEST_PARAMETER;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleMissingServletRequestParameter(
          MissingServletRequestParameterException ex,
          HttpHeaders headers,
          HttpStatus status,
          WebRequest request) {
    return buildResponseEntity(new ApiError(BAD_REQUEST, ex.getParameterName() + MISSING_REQUEST_PARAMETER));
  }

  @Override
  protected ResponseEntity<Object> handleMissingPathVariable(
          MissingPathVariableException ex,
          HttpHeaders headers,
          HttpStatus status,
          WebRequest request) {
    return buildResponseEntity(new ApiError(BAD_REQUEST, ex.getVariableName() + MISSING_PATH_VARIABLE));
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<Object> handleAccessDenied(AccessDeniedException ex) {
    return buildResponseEntity(new ApiError(FORBIDDEN, ex));
  }

  @ExceptionHandler({
          NoPostWithSuchIdException.class,
          NoUserWithSuchCredentialsException.class,
          EntityNotFoundException.class
    })
  public ResponseEntity<Object> handleNotFound(Exception ex) {
    return buildResponseEntity(new ApiError(NOT_FOUND, ex));
  }

  @ExceptionHandler({
          TokenInvalidException.class,
          PostWithNoDataException.class
    })
  public ResponseEntity<Object> handleBadRequest(Exception ex) {
    return buildResponseEntity(new ApiError(BAD_REQUEST, ex));
  }

  @ExceptionHandler(EmailException.class)
  public ResponseEntity<Object> handleEmailVerification(EmailException ex) {
    return buildResponseEntity(new ApiError(INTERNAL_SERVER_ERROR, ex));
  }


  private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
    return new ResponseEntity<>(apiError, apiError.getStatus());
  }
}
