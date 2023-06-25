package com.socialnetwork.api.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@PropertySource("classpath:application.properties")
public class JwtTokenUtil {

  @Value("${jwt.secret}")
  private String jwtSecret;

  @Value("${jwt.expire.normal}")
  private Long expirationDefault;

  @Value("${jwt.expire.remember}")
  private Long expirationRemember;

  public String generateToken(String username, boolean isToRemember) {
    Date now = new Date();

    return Jwts.builder()
          .setSubject(username)
          .setIssuedAt(now)
          .setExpiration(new Date(now.getTime() + (isToRemember ? expirationRemember : expirationDefault)))
          .signWith(SignatureAlgorithm.HS512, jwtSecret)
          .compact();
  }

  public String checkTokenValidAndReturnUsername(String authHeader) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authHeader).getBody().getSubject();
  }
}