package com.socialnetwork.api.security.jwt;

import com.socialnetwork.api.model.base.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.HashMap;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class UserPrincipal implements UserDetails, OAuth2User {

  private String username;
  private String password;
  private Map<String, Object> attributes;

  public UserPrincipal(String username, String password) {
    this.username = username;
    this.password = password;
    this.attributes = new HashMap<>();
  }

  public static UserPrincipal of(User user) {
    return new UserPrincipal(user.getUsername(), user.getPassword());
  }

  public static UserPrincipal of(User user, Map<String, Object> attributes) {
    UserPrincipal userPrincipal = UserPrincipal.of(user);
    userPrincipal.setAttributes(attributes);
    return userPrincipal;
  }

  @Override
  public Map<String, Object> getAttributes() {
    return attributes;
  }

  public void setAttributes(Map<String, Object> attributes) {
    this.attributes = attributes;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public String getName() {
    return null;
  }
}
