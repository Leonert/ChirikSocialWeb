package com.socialnetwork.api.util;

import org.springframework.util.SerializationUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Base64;
import java.util.Optional;

public class CookieUtils {

  public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
    Cookie[] cookies = request.getCookies();

    return cookies != null ? Arrays.stream(cookies)
            .filter(cookie -> cookie.getName().equals(name))
            .findFirst() : Optional.empty();
  }

  public static String serialize(Object object) {
    return Base64.getUrlEncoder()
            .encodeToString(SerializationUtils.serialize(object));
  }

  public static <T> T deserialize(Cookie cookie, Class<T> cls) {
    return cls.cast(SerializationUtils.deserialize(
            Base64.getUrlDecoder().decode(cookie.getValue())));
  }

  public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
    Cookie cookie = new Cookie(name, value);
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    cookie.setMaxAge(maxAge);
    response.addCookie(cookie);
  }

  public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
    Cookie[] cookies = request.getCookies();

    if (cookies != null) {
      Arrays.stream(cookies)
              .filter(cookie -> cookie.getName().equals(name))
              .forEach(cookie -> response.addCookie(resetCookie(cookie)));
    }
  }

  private static Cookie resetCookie(Cookie cookie) {
    cookie.setValue("");
    cookie.setComment("/");
    cookie.setMaxAge(0);
    return cookie;
  }
}
