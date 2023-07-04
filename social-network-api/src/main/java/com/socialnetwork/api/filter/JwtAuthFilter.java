package com.socialnetwork.api.filter;

import com.socialnetwork.api.security.jwt.JwtTokenUtil;
import com.socialnetwork.api.service.UserPrincipalService;
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

import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;
import static com.socialnetwork.api.util.Constants.Auth.BEARER;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtTokenUtil jwtTokenUtil;
  private final UserPrincipalService userPrincipalService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
          throws ServletException, IOException {
    try {

      String authHeader = request.getHeader(AUTHORIZATION_HEADER);

      if (authHeader == null || !authHeader.startsWith(BEARER)) {
        chain.doFilter(request, response);
        return;
      }

      String username = jwtTokenUtil.checkTokenValidAndReturnUsername(authHeader.substring(BEARER.length()));
      UserDetails userDetails = userPrincipalService.loadUserByUsername(username);
      UsernamePasswordAuthenticationToken auth =
              new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
      auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

      SecurityContextHolder.getContext().setAuthentication(auth);
    } catch (Exception ex) {
      System.out.println("Exception in JwtAuthFilter.");
    }

    chain.doFilter(request, response);
  }
}