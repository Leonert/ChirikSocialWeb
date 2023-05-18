package com.socialnetwork.api.security;

import com.socialnetwork.api.exception.custom.InvalidTokenUsernameException;
import com.socialnetwork.api.exception.custom.TokenExpiredException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Optional;
import java.util.function.Function;

import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;
import static com.socialnetwork.api.util.Constants.Auth.BEARER;

@Component
@PropertySource("classpath:application.properties")
public class JwtTokenUtil {

  @Value("${jwt.secret}")
  private String jwtSecret;

  @Value("${jwt.expire.normal}")
  private Long expirationDefault;

  @Value("${jwt.expire.remember}")
  private Long expirationRemember;

  public boolean isTokenExists(String authHeader) {
    return authHeader != null && authHeader.startsWith(BEARER);
  }

  public boolean isAuthTokenExists(HttpServletRequest request) {
    return request.getHeader(AUTHORIZATION_HEADER) != null && !request.getHeader(AUTHORIZATION_HEADER).isBlank();
  }

  public String getUsernameFromToken(String authHeader) {
    return getClaimsFromToken(authHeader.startsWith(BEARER) ? authHeader.substring(BEARER.length())
        : authHeader, Claims::getSubject);

  }

  public String getUsernameFromTokenAndCheckIt(String authHeader)
      throws TokenExpiredException, InvalidTokenUsernameException {
    authHeader = authHeader.startsWith(BEARER) ? authHeader.substring(BEARER.length()) : authHeader;
    checkTokenExpired(authHeader);
    return Optional.of(getClaimsFromToken(authHeader, Claims::getSubject)).orElseThrow(InvalidTokenUsernameException::new);
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

  private void checkTokenExpired(String token) throws TokenExpiredException {
    if (getExpirationDateFromToken(token).before(new Date())) {
      throw new TokenExpiredException();
    }
  }

  public String generateToken(String username, boolean isToRemember) {
    Date now = new Date();

    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(now)
        .setExpiration(new Date(now.getTime() + (isToRemember ? expirationRemember : expirationDefault)))
        .signWith(SignatureAlgorithm.HS512, jwtSecret)
        .compact();
  }

  public Boolean isTokenValid(String username, UserDetails userDetails) {
    return (username.equals(userDetails.getUsername()));
  }
}