package com.socialnetwork.api.service;

import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.model.Post;
import com.socialnetwork.api.model.User;
import com.socialnetwork.api.repository.PostRepository;
import com.socialnetwork.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
  private final PostRepository postRepository;
  private final UserRepository userRepository;

  public void save(Post post) {
    enrichPost(post);
    postRepository.save(post);
  }

  public void edit(Post post) {
    postRepository.save(post);
  }

  public boolean existsById(Integer postId) {
    return postRepository.existsById(postId);
  }

  public void delete(Post post) {
    postRepository.delete(post);
  }

  public Post getReferenceById(int id) {
    return postRepository.getReferenceById(id);
  }

  public Page<Post> findAll(PageRequest request) {
    return postRepository.findAll(request);
  }

  public Page<Post> findByUserId(Integer id, PageRequest request) {
    return postRepository.findByUserId(id, request);
  }

  public Page<Post> findPostsByUsername(String username, Optional<Integer> page) throws NoUserWithSuchCredentialsException {
    Optional<User> user = userRepository.findByUsername(username);
    if (user.isEmpty()) throw new NoUserWithSuchCredentialsException();
    return postRepository.findByUserId(user.get().getId(), PageRequest.of(page.orElse(1), 10));
  }

  public void enrichPost(Post post) {
    post.setCreatedDate(LocalDateTime.now());
    post.setLikes(0);
  }
}
