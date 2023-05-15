package com.socialnetwork.api.exception.custom;

import static com.socialnetwork.api.util.Constants.Exception.USER_NOT_FOUND;

public class NoUserWithSuchCredentialsException extends Exception {
  public NoUserWithSuchCredentialsException() {
    super(USER_NOT_FOUND);
  }
}
