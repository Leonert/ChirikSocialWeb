package com.socialnetwork.api.security;

import com.socialnetwork.api.exception.AccessDeniedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Objects;
import java.util.function.Function;

@Component
@PropertySource("classpath:application.properties")
public class JwtTokenUtil {
  public static final String BEARER = "Bearer ";

  @Value("${jwt.secret}")
  private String jwtSecret;

  @Value("${jwt.expire.normal}")
  private Long expirationDefault;

  @Value("${jwt.expire.remember}")
  private Long expirationRemember;

  public boolean isTokenExists(String authHeader) {
    return authHeader != null && authHeader.startsWith(BEARER);
  }

  public String getUsernameFromToken(String token) {
    return getClaimsFromToken(token, Claims::getSubject);
  }

  public void verifyUsernames(String authHeader, String username) throws AccessDeniedException {
    if (isTokenExists(authHeader)) {
      String jwtUsername = getUsernameFromToken(authHeader.substring(BEARER.length()));

      if (!Objects.equals(jwtUsername, username)) {
        throw new AccessDeniedException();
      }

    } else {
      throw new AccessDeniedException();
    }
  }

  public Date getExpirationDateFromToken(String token) {
    return getClaimsFromToken(token, Claims::getExpiration);
  }

  public <T> T getClaimsFromToken(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = getAllClaimsFromToken(token);
    return claimsResolver.apply(claims);
  }

  private Claims getAllClaimsFromToken(String token) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
  }

  private Boolean isTokenExpired(String token) {
    final Date expiration = getExpirationDateFromToken(token);
    return expiration.before(new Date());
  }

  public String generateToken(String username, boolean isToRemember) {
    Date now = new Date();
    Date expiration = new Date(now.getTime() + (isToRemember ? expirationRemember : expirationDefault));

    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(now)
        .setExpiration(expiration)
        .signWith(SignatureAlgorithm.HS512, jwtSecret)
        .compact();
  }

  public Boolean isTokenValid(String token, UserDetails userDetails) {
    String username = getUsernameFromToken(token);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }
}