package com.socialnetwork.api.security.oauth2;

import com.socialnetwork.api.mapper.authorized.NotificationMapper;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.UserRepository;
import com.socialnetwork.api.security.jwt.JwtTokenUtil;
import com.socialnetwork.api.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
import static com.socialnetwork.api.util.Constants.WebSocket.QUEUE_NOTIFICATION;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final SimpMessagingTemplate messagingTemplate;
  private final NotificationMapper notificationMapper;
  private final NotificationService notificationService;
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

    messagingTemplate.convertAndSendToUser(
            user.getUsername(),
            QUEUE_NOTIFICATION,
            notificationMapper.mapNotification(notificationService.saveLogin(user))
    );

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
