package com.socialnetwork.api.service;

import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.model.additional.NotificationType;
import com.socialnetwork.api.model.base.Notification;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.NotificationRepository;
import com.socialnetwork.api.repository.PostRepository;
import com.socialnetwork.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {

  private final NotificationRepository notificationRepository;
  private final PostRepository postRepository;
  private final UserRepository userRepository;

  public Optional<Notification> saveReplyRetweet(Post post) {
    if (post.getOriginalPost() != null && post.getText() != null && post.getImage() == null) {
      return Optional.of(notificationRepository.save(new Notification(post.getOriginalPost().getAuthor(),
              post.getAuthor(), post, NotificationType.REPLY)));
    } else if (post.getOriginalPost() != null) {
      return Optional.of(notificationRepository.save(new Notification(post.getOriginalPost().getAuthor(),
              post.getAuthor(), post, NotificationType.RETWEET)));
    }

    return Optional.empty();
  }

  public Notification saveFollow(User currentUser, User user) {
    return notificationRepository.save(new Notification(user, currentUser, null, NotificationType.FOLLOWER));
  }

  public Optional<Notification> saveLike(int userId, int postId) throws NoUserWithSuchCredentialsException {
    Post post = postRepository.getReferenceById(postId);

    if (userId != post.getAuthor().getId()) {
      return Optional.of(notificationRepository.save(
              new Notification(post.getAuthor(), userRepository.findById(userId).get(), post, NotificationType.LIKE)
      ));
    }

    return Optional.empty();
  }

  public Notification saveLogin(User user) {
    return notificationRepository.save(new Notification(user, null, null, NotificationType.ENTRANCE));
  }
}
