package com.socialnetwork.api.service.noneauthorized;

import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.LikeRepository;
import com.socialnetwork.api.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NonAuthLikeService {
  private final LikeRepository likeRepository;
  private final PostRepository postRepository;

  public List<User> getLikes(int id, int page, int usersForPage) throws NoPostWithSuchIdException {
    if (!postRepository.existsById(id)) {
      throw new NoPostWithSuchIdException();
    }
    return likeRepository.findUsersByLikedPost(id).stream()
          .skip(page * usersForPage).limit(usersForPage).toList();
  }

  public int countPostLikes(int id) {
    return likeRepository.countAllByLikedPost(new Post(id));
  }
}
