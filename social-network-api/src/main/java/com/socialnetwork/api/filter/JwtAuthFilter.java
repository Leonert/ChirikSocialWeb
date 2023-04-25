package com.socialnetwork.api.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.JwtUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtTokenUtil jwtTokenUtil;

  private final JwtUserDetailsService jwtUserDetailsService;

  private static final String BEARER = "Bearer ";

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
          throws ServletException, IOException {
    String authHeader = request.getHeader("Authorization");

    String username = null;
    String jwtToken = null;

    if (authHeader != null && authHeader.startsWith(BEARER)) {
      jwtToken = authHeader.substring(BEARER.length());
      try {
        username = jwtTokenUtil.getUsernameFromToken(jwtToken);
      } catch (Exception e) {
        System.out.println(e.getMessage());
      }
    }

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);

      if (jwtTokenUtil.isTokenValid(jwtToken, userDetails)) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        usernamePasswordAuthenticationToken
                .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
      }
    }
    chain.doFilter(request, response);
  }
}

