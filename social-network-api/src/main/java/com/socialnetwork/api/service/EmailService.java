package com.socialnetwork.api.service;

import com.socialnetwork.api.model.ConfirmationToken;
import com.socialnetwork.api.model.User;
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
  private static final String CONFIRM_ACCOUNT_URL = "http://localhost:8080/registration/activate?token=";

  @Async
  public void sendEmail(User user, ConfirmationToken token) {
    MimeMessagePreparator mailMessage = mimeMessage -> {
      MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
      try {
        message.setFrom(EMAIL_ADDRESS_FROM, "FP3 Social Network");
        message.addTo(user.getEmailAddress());
        message.setSubject("Complete Registration");
        message.setText("To confirm your account, please click here: "
                + CONFIRM_ACCOUNT_URL + token.getConfirmationToken());
      } catch (Exception e) {
        throw new Exception("Unexpected error");
      }
    };

    javaMailSender.send(mailMessage);
  }
}
