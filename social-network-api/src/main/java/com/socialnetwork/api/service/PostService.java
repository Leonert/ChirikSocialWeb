package com.socialnetwork.api.service;

import com.socialnetwork.api.exception.NoPostWithSuchIdException;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PostService {
  private final PostRepository postRepository;

  public void save(Post post) {
    post.setCreatedDate(LocalDateTime.now());
    postRepository.save(post);
  }

  public List<Post> getPosts(int page, int postsNumber) {
    return postRepository.findAll(PageRequest.of(page, postsNumber, Sort.by("createdDate")))
            .stream()
            .toList();
  }

  public boolean existsById(Integer postId) {
    return postRepository.existsById(postId);
  }

  public void delete(Post post) {
    postRepository.delete(post);
  }

  public Optional<Post> findById(int id) {
    return postRepository.findById(id);
  }

  public Post getReferenceById(int id) throws NoPostWithSuchIdException {
    if (!postRepository.existsById(id)) {
      throw new NoPostWithSuchIdException();
    }
    return postRepository.getReferenceById(id);
  }
}
