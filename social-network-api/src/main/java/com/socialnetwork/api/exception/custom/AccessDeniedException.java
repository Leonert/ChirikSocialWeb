package com.socialnetwork.api.exception.custom;

import static com.socialnetwork.api.util.Constants.Exception.ACCESS_DENIED;

public class AccessDeniedException extends Exception {
  public AccessDeniedException() {
    super(ACCESS_DENIED);
  }
}
