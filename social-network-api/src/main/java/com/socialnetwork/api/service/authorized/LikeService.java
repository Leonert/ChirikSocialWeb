package com.socialnetwork.api.service.authorized;

import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.keys.LikePk;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.LikeRepository;
import com.socialnetwork.api.repository.PostRepository;
import com.socialnetwork.api.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeService {
  private final LikeRepository likeRepository;

  private final UserService userService;

  private final NotificationService notificationService;
  private final PostRepository postRepository;

  public boolean likeUnlike(int userId, int postId) {
    if (!existsByIds(userId, postId)) {
      save(userId, postId);
      notificationService.saveLike(userId, postId);
      return true;
    } else {
      delete(userId, postId);
      return false;
    }
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

  public int countPostLikes(Post post) {
    return likeRepository.countAllByLikedPost(post);
  }

  public boolean existsByIds(int userId, int postId) {
    return likeRepository.existsByLikePk(new LikePk(userId, postId));
  }
}
