package com.socialnetwork.api.service;

import com.socialnetwork.api.entity.ConfirmationToken;
import com.socialnetwork.api.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
  private final JavaMailSender javaMailSender;
  private static final String EMAIL_ADDRESS_FROM = "java.test.email000@gmail.com";

  @Async
  public void sendEmail(User user, ConfirmationToken token, String url) {
    MimeMessagePreparator mailMessage = mimeMessage -> {
      MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
      try {
        message.setFrom(EMAIL_ADDRESS_FROM, "FP3 Social Network");
        message.addTo(user.getEmailAddress());
        message.setSubject("Complete Registration");
        message.setText("To confirm your account, please click here : " + url + token.getConfirmationToken());
      } catch (Exception e) {
        throw new Exception("Unexpected error");
      }
    };

    javaMailSender.send(mailMessage);
  }
}
