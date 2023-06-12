package com.socialnetwork.api.exception.custom;

import static com.socialnetwork.api.util.Constants.Exception.EMPTY_POST;

public class PostWithNoDataException extends Exception {
  public PostWithNoDataException() {
    super(EMPTY_POST);
  }
}
