package com.socialnetwork.api.security.oauth2;

import com.socialnetwork.api.security.jwt.JwtTokenUtil;
import com.socialnetwork.api.security.jwt.UserPrincipal;
import com.socialnetwork.api.util.CookieUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final JwtTokenUtil jwtTokenUtil;
  private final HttpCookieOAuth2AuthorizationRequestRepository httpOAuth2RequestRepository;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) throws IOException {
    String targetUrl = determineTargetUrl(request, response, authentication);

    if (response.isCommitted()) {
      return;
    }

    clearAuthenticationAttributes(request, response);
    getRedirectStrategy().sendRedirect(request, response, targetUrl);
  }

  protected String determineTargetUrl(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) {
    Optional<String> redirectUri = CookieUtils
            .getCookie(request, HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
            .map(Cookie::getValue);

    String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    String token = jwtTokenUtil.generateToken(userPrincipal.getUsername(), false);

    return UriComponentsBuilder.fromUriString(targetUrl)
            .queryParam("token", token)
            .build().toUriString();
  }

  protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
    super.clearAuthenticationAttributes(request);
    httpOAuth2RequestRepository.removeAuthRequestCookies(request, response);
  }
}
