package com.socialnetwork.api.security.oauth2;

import com.socialnetwork.api.util.CookieUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

  private final HttpCookieOAuth2AuthorizationRequestRepository httpOAuth2RequestRepository;

  @Override
  public void onAuthenticationFailure(
          HttpServletRequest request,
          HttpServletResponse response,
          AuthenticationException ex) throws IOException {
    String targetUrl =
            CookieUtils.getCookie(request, HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
                    .map(Cookie::getValue)
                    .orElse(("/"));

    targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
            .queryParam("error", ex.getLocalizedMessage())
            .build()
            .toUriString();

    httpOAuth2RequestRepository.removeAuthRequestCookies(request, response);

    getRedirectStrategy().sendRedirect(request, response, targetUrl);
  }
}
