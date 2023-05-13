package com.socialnetwork.api.service;

import com.socialnetwork.api.models.additional.NotificationType;
import com.socialnetwork.api.models.base.Notification;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.NotificationRepository;
import com.socialnetwork.api.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationService {
  private final NotificationRepository notificationRepository;
  private final PostRepository postRepository;

  public void saveReplyRetweet(Post post) {
    if (post.getOriginalPost() != null && post.getText() != null && post.getImage() == null) {
      notificationRepository.save(new Notification(post.getOriginalPost().getAuthor(),
          post.getAuthor(), post, NotificationType.REPLY));
    } else if (post.getOriginalPost() != null) {
      notificationRepository.save(new Notification(post.getOriginalPost().getAuthor(),
          post.getAuthor(), post, NotificationType.RETWEET));
    }
  }

  public void saveFollow(User currentUser, User user) {
    notificationRepository.save(new Notification(user, currentUser, null, NotificationType.FOLLOWER));
  }

  public void saveLike(int userId, int postId) {
    Post post = postRepository.getReferenceById(postId);
    if (userId != post.getAuthor().getId()) notificationRepository.save(
        new Notification(post.getAuthor(), new User(userId), post, NotificationType.LIKE));
  }

  public void saveLogin(User user) {
    notificationRepository.save(new Notification(user, null, null, NotificationType.ENTRANCE));
  }
}
