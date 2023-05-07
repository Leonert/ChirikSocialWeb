package com.socialnetwork.api.models.auth;

public class JwtResponse {

  private final String jwt;

  public JwtResponse(String jwt) {
    this.jwt = jwt;
  }

  public String getJwt() {
    return this.jwt;
  }
}
