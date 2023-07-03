package com.socialnetwork.api.model.additional;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Response {
  private String message;

  public static Response of(String message) {
    return new Response(message);
  }
}
