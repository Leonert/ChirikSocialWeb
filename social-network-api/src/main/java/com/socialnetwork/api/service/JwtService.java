//package com.socialnetwork.api.service;
//
//import com.socialnetwork.api.exception.custom.AccessDeniedException;
//import com.socialnetwork.api.security.JwtTokenUtil;
//import com.socialnetwork.api.service.authorized.UserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.Objects;
//
//import static com.socialnetwork.api.util.Constants.Auth.BEARER;
//
//@Service
//@RequiredArgsConstructor
//public class JwtService {
//  private final JwtTokenUtil jwtTokenUtil;
//  private final UserService userService;
//
//  public void verifyById(String authHeader, int userId) throws AccessDeniedException {
//    isTokenExists(authHeader);
//    userService
//        .getByUsernameAndId(
//            jwtTokenUtil.getUsernameFromToken(authHeader.substring(BEARER.length())),
//            userId)
//        .orElseThrow(AccessDeniedException::new);
//  }
//
//  public void verifyByUsername(String authHeader, String username) throws AccessDeniedException {
//    isTokenExists(authHeader);
//    if (!Objects.equals(
//        jwtTokenUtil.getUsernameFromToken(authHeader.substring(BEARER.length())),
//        username)) {
//      throw new AccessDeniedException();
//    }
//  }
//
//  private void isTokenExists(String authHeader) throws AccessDeniedException {
//    if (!jwtTokenUtil.isTokenExists(authHeader)) {
//      throw new AccessDeniedException();
//    }
//  }
//}
