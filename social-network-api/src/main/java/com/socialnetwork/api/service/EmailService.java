package com.socialnetwork.api.service;

import com.socialnetwork.api.models.auth.ConfirmationToken;
import com.socialnetwork.api.models.base.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:application.properties")
public class EmailService {

  private final JavaMailSender javaMailSender;

  @Value("${spring.mail.username}")
  private String emailAddressFrom;

  @Value("${email.confirmation.url}")
  private String confirmAccountUrl;

  @Value("${email.recovery.url}")
  private String passwordRecoveryUrl;

  @Async
  public void sendTokenForAccountActivation(User user, ConfirmationToken token) {
    MimeMessagePreparator mailMessage = mimeMessage -> {
      MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
      message.setFrom(emailAddressFrom, "FP3 Social Network");
      message.addTo(user.getEmailAddress());
      message.setSubject("Complete Registration");
      message.setText("To confirm your account, please click here: "
          + confirmAccountUrl + token.getConfirmationToken());
      System.out.println(token.getConfirmationToken());
    };

    javaMailSender.send(mailMessage);
  }

  @Async
  public void sendTokenForPasswordRecovery(String email, ConfirmationToken token) {
    MimeMessagePreparator mailMessage = mimeMessage -> {
      MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
      message.setFrom(emailAddressFrom, "FP3 Social Network");
      message.addTo(email);
      message.setSubject("Recover your password");
      message.setText("To recover your password, please click here: "
          + passwordRecoveryUrl + token.getConfirmationToken());
      System.out.println(token.getConfirmationToken());
    };

    javaMailSender.send(mailMessage);
  }
}