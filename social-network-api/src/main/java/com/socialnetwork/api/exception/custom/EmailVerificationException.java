package com.socialnetwork.api.exception.custom;

public class EmailVerificationException extends Exception {
  public EmailVerificationException(String errorMessage) {
    super(errorMessage);
  }
}
