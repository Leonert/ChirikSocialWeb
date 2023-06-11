package com.socialnetwork.api.exception.custom;

import static com.socialnetwork.api.util.Constants.Exception.TOKEN_INVALID;

public class TokenInvalidException extends Exception {
  public TokenInvalidException() {
    super(TOKEN_INVALID);
  }
}
