package com.socialnetwork.api.filter;

import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.JwtUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;

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
      try {
        request.setAttribute(USERNAME_ATTRIBUTE, jwtTokenUtil.checkTokenValidAndReturnUsername(authHeader));
      }
      catch (Exception e) {
        response.setStatus(401);
        return;
      }
      chain.doFilter(request, response);
    }
    else if (globalPaths.stream().anyMatch(request.getRequestURI()::startsWith)
        && request.getAttribute(USERNAME_ATTRIBUTE) == null) {
      if (request.getAttribute(USERNAME_ATTRIBUTE) != null) request.setAttribute(USERNAME_ATTRIBUTE, null);
      chain.doFilter(request, response);
    }
    else {
      response.setStatus(401);
    }
  }
}
