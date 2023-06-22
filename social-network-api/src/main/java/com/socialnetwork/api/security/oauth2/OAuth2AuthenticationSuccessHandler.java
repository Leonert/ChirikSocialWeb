package com.socialnetwork.api.security.oauth2;

import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.security.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import static com.socialnetwork.api.util.Constants.Auth.OAUTH_REDIRECT_URL;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final UserRepository userRepository;
  private final JwtTokenUtil jwtTokenUtil;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) throws IOException {
    CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();
    Optional<User> optionalUser = userRepository.findByEmailAddress(oauthUser.getEmail());
    User user;

    if (optionalUser.isEmpty()) {
      user = new User();
      user.setCreatedDate(LocalDateTime.now());
      user.setName(oauthUser.getName());
      user.setUsername(generateUsername(oauthUser.getEmail()));
      user.setEmailAddress(oauthUser.getEmail());
      user.setEnabled(true);
      user.setBio("");
      user.setLocation("");
      user.setWebsite("");
      user.setProvider(AuthProvider.GOOGLE);
      user.setGoogleId(oauthUser.getSub());
      userRepository.save(user);
    } else if (optionalUser.get().getProvider() != AuthProvider.GOOGLE) {
      response.sendRedirect(OAUTH_REDIRECT_URL);
      return;
    } else {
      user = userRepository.findByEmailAddress(oauthUser.getEmail()).get();
    }

    response.sendRedirect(
            OAUTH_REDIRECT_URL + "?token=" + jwtTokenUtil.generateToken(user.getUsername(), false)
    );
  }

  private String generateUsername(String email) {
    String username = email.substring(0, email.indexOf("@"));
    Random random = new Random();

    while (userRepository.findByUsername(username).isPresent()) {
      username = username + random.nextInt(10);
    }

    return username;
  }
}
