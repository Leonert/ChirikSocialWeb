package com.socialnetwork.api.service;

import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Conditions;
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
  private final UserService userService;
  private final NotificationService notificationService;
  private final ModelMapper modelMapper;

  public void save(Post post) {
    post.setCreatedDate(LocalDateTime.now());
    postRepository.save(post);
    notificationService.saveReplyRetweet(post);
  }

  public List<Post> getPosts(int page, int postsNumber) {
    return postRepository.findAll(PageRequest.of(page, postsNumber, Sort.by("createdDate"))).toList();
  }

  public boolean existsById(Integer postId) {
    return postRepository.existsById(postId);
  }

  public void edit(Post editedPost) {
    Post post = postRepository.findById(editedPost.getId()).get();
    modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
    modelMapper.map(editedPost, post);
    postRepository.save(post);
  }

  public void delete(Integer id) {
    postRepository.deleteById(id);
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

  public int countPostRetweets(Post post) {
    return postRepository.countAllByOriginalPostAndTextNullAndImageNull(post);
  }

  public int countPostReplies(Post post) {
    return postRepository.countAllByOriginalPostAndTextNotNullAndImageNull(post);
  }

  public List<User> getRetweets(int id, String username, int page, int usersForPage)
          throws NoUserWithSuchCredentialsException {
    User currentUser = userService.findByUsername(username);
    return postRepository.findUsersByRetweetedPost(id)
            .stream()
            .skip(page * usersForPage).limit(usersForPage)
            .peek(f -> f.setCurrUserFollower(userService.isFollowed(currentUser, f)))
            .toList();
  }

  public List<Post> getReplies(int id, int page, int usersForPage)
          throws NoPostWithSuchIdException {
    Post post = getReferenceById(id);
    return postRepository.findAllByOriginalPostAndTextIsNotNull(
            post,
            PageRequest.of(page, usersForPage, Sort.by("createdDate")));
  }
}
