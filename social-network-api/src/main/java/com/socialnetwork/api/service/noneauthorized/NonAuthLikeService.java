package com.socialnetwork.api.service.noneauthorized;

import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NonAuthLikeService {
  private final LikeRepository likeRepository;

  public List<User> getLikes(int id, int page, int usersForPage) {
    return likeRepository.findUsersByLikedPost(id).stream()
        .skip(page * usersForPage).limit(usersForPage).toList();
  }

  public int countPostLikes(Post post) {
    return likeRepository.countAllByLikedPost(post);
  }
}
