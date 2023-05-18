package com.socialnetwork.api.exception.custom;

import static com.socialnetwork.api.util.Constants.Exception.POST_NOT_FOUND;

public class NoPostWithSuchIdException extends Exception {
  public NoPostWithSuchIdException() {
    super(POST_NOT_FOUND);
  }
}
