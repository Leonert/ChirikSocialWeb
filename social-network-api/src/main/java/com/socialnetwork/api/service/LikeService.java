package com.socialnetwork.api.service;

import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.keys.LikePk;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeService {
  private final LikeRepository likeRepository;
  private final NotificationService notificationService;

  public void save(int userId, int postId) {
    likeRepository.save(new Like(new User(userId), new Post(postId)));
  }

  public void delete(int userId, int postId) {
    likeRepository.deleteByLikedByAndLikedPost(new User(userId), new Post(postId));
  }

  public boolean existsByIds(int userId, int postId) {
    return likeRepository.existsByLikePk(new LikePk(userId, postId));
  }

  public List<Integer> getUsersLikesIds(Post post) {
    return likeRepository.findAllByLikedPost(post)
        .stream()
        .map(like -> like.getLikedBy().getId())
        .toList();
  }

  public int countPostLikes(Post post) {
    return likeRepository.countAllByLikedPost(post);
  }

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
}
