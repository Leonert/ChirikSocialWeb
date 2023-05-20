package com.socialnetwork.api.filter;

import com.socialnetwork.api.security.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.socialnetwork.api.util.Constants.Auth.BEARER;
import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;
import static com.socialnetwork.api.util.Constants.Auth.BEARER;
import static com.socialnetwork.api.util.Constants.Auth.USERNAME_ATTRIBUTE;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
  private final JwtTokenUtil jwtTokenUtil;
  private final List<String> globalPaths =
          new ArrayList<>(List.of("/h2-console", "/api/login", "/api/registration", "/api/posts", "api/users",
                  "/api/search"));

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
          throws ServletException, IOException {
    String authHeader = request.getHeader(AUTHORIZATION_HEADER);
    if (authHeader != null) {
      if (authHeader.startsWith(BEARER)) {
        authHeader = authHeader.substring(BEARER.length());
      }
      try {
        request.setAttribute(USERNAME_ATTRIBUTE, jwtTokenUtil.checkTokenValidAndReturnUsername(authHeader
                .substring(BEARER.length())));
      } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException
               | SignatureException | IllegalArgumentException e) {
        response.setStatus(401);
        return;
      }
      chain.doFilter(request, response);
    } else if (globalPaths.stream().anyMatch(request.getRequestURI()::startsWith)) {
      if (request.getAttribute(USERNAME_ATTRIBUTE) != null) {
        request.setAttribute(USERNAME_ATTRIBUTE, null);
      }
      chain.doFilter(request, response);
    } else {
      response.setStatus(401);
    }
  }
}
