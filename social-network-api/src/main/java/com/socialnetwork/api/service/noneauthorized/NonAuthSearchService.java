package com.socialnetwork.api.service.noneauthorized;

import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.PostRepository;
import com.socialnetwork.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NonAuthSearchService {
  private final PostRepository postRepository;
  private final UserRepository userRepository;


  public List<Post> searchPosts(String query, int page, int postsPerPage) {
    return postRepository.findPostsByTextContainingIgnoreCase(
          query, PageRequest.of(page, postsPerPage));
  }

  public List<User> searchUsers(String query, int page, int usersPerPage) {
    return userRepository
          .findByUsernameContainingIgnoreCaseOrNameContaining(query, query, PageRequest.of(page, usersPerPage)).toList();
  }
}
