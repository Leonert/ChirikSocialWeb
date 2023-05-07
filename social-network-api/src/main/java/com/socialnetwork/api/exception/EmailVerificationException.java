package com.socialnetwork.api.exception;

public class EmailVerificationException extends Exception {
  public EmailVerificationException(String errorMessage) {
    super(errorMessage);
  }
}
