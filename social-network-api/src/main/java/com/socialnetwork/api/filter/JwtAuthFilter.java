package com.socialnetwork.api.filter;

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
import java.util.ArrayList;
import java.util.List;

import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;
import static com.socialnetwork.api.util.Constants.Auth.BEARER;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
  private final JwtTokenUtil jwtTokenUtil;
  private final JwtUserDetailsService jwtUserDetailsService;
  private final List<String> globalPaths =
      new ArrayList<>(List.of("/h2-console", "/api/login", "/api/registration", "/api/posts", "api/users",
          "/api/search"));

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    String requestUri = request.getRequestURI();

    if (globalPaths.stream().anyMatch(requestUri::startsWith)) {
      chain.doFilter(request, response);
      return;
    }

    String authHeader = request.getHeader(AUTHORIZATION_HEADER);


    String username = null;
    String jwtToken = null;

    if (jwtTokenUtil.isTokenExists(authHeader)) {
      jwtToken = authHeader.substring(BEARER.length());
      try {
        username = jwtTokenUtil.getUsernameFromToken(jwtToken);
      } catch (Exception e) {
        response.setStatus(401);
      }
    } else {
      response.setStatus(401);
    }

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);

      if (jwtTokenUtil.isTokenValid(jwtToken, userDetails)) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
            userDetails, null, userDetails.getAuthorities());
        usernamePasswordAuthenticationToken
            .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
      } else {
        response.setStatus(401);
      }
    }

    chain.doFilter(request, response);
  }
}
