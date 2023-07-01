package com.socialnetwork.api.service.authorized;

import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.authorized.NotificationMapper;
import com.socialnetwork.api.model.additional.Like;
import com.socialnetwork.api.model.additional.keys.LikePk;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.LikeRepository;
import com.socialnetwork.api.repository.PostRepository;
import com.socialnetwork.api.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.socialnetwork.api.util.Constants.WebSocket.QUEUE_NOTIFICATION;

@Service
@RequiredArgsConstructor
public class LikeService {

  private final LikeRepository likeRepository;
  private final UserService userService;
  private final PostService postService;
  private final NotificationService notificationService;
  private final PostRepository postRepository;
  private final NotificationMapper notificationMapper;
  private final SimpMessagingTemplate messagingTemplate;

  public boolean likeUnlike(int userId, int postId) throws NoUserWithSuchCredentialsException {
    if (!existsByIds(userId, postId)) {
      save(userId, postId);
      notificationService.saveLike(userId, postId)
              .ifPresent(notification ->
                messagingTemplate.convertAndSendToUser(
                        postService.findById(postId).get().getAuthor().getUsername(),
                        QUEUE_NOTIFICATION,
                        notificationMapper.mapNotification(notification))
        );
      return true;
    } else {
      delete(userId, postId);
      return false;
    }
  }

  public List<Post> getUserLikedPosts(User user) {
    return likeRepository.findPostsByUserLiked(user);
  }

  public void save(int userId, int postId) {
    likeRepository.save(new Like(new User(userId), new Post(postId)));
  }

  public void delete(int userId, int postId) {
    likeRepository.deleteByLikedByAndLikedPost(new User(userId), new Post(postId));
  }

  public List<User> getLikes(int id, String username, int page, int usersForPage)
          throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {
    if (!postRepository.existsById(id)) {
      throw new NoPostWithSuchIdException();
    }
    User currentUser = userService.findByUsername(username);
    return likeRepository.findUsersByLikedPost(id)
            .stream()
            .skip(page * usersForPage).limit(usersForPage)
            .peek(f -> f.setCurrUserFollower(userService.isFollowed(currentUser, f)))
            .toList();
  }

  public int countPostLikes(int id) {
    return likeRepository.countAllByLikedPost(new Post(id));
  }

  public boolean existsByIds(int userId, int postId) {
    return likeRepository.existsByLikePk(new LikePk(userId, postId));
  }
}
