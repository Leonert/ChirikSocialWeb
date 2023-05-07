package com.socialnetwork.api.service;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.exception.NoPostWithSuchIdException;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.repository.PostRepository;
import com.socialnetwork.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final ModelMapper modelMapper;

  public void save(Post post) {
    enrichNewPost(post);
    postRepository.save(post);
  }

  //  public void edit(Post post) {
  //    // Maps fields which weren`t null in postcontroller request to update only them in DB
  //    Post postToUpdate = postRepository.getReferenceById(post.getPostId());
  //    modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
  //    modelMapper.map(post, postToUpdate);
  //    postRepository.save(postToUpdate);
  //  }

  public boolean existsById(Integer postId) {
    return postRepository.existsById(postId);
  }

  public void delete(Post post) {
    postRepository.delete(post);
  }

  public PostDto getReferenceById(int id) throws NoPostWithSuchIdException {
    if (!postRepository.existsById(id)) {
      throw new NoPostWithSuchIdException();
    }
    return modelMapper.map(postRepository.getReferenceById(id), PostDto.class);
  }

  public List<PostDto> getPostsSortedByCreatedDate() {
    return postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdDate"))
        .stream().map(post -> modelMapper.map(post, PostDto.class)).toList();
  }

  //  public List<PostDto> findPostsByUsername(String username) throws NoUserWithSuchCredentialsException {
  //    Optional<User> user = userRepository.findByUsername(username);
  //    if (user.isEmpty()) {
  //      throw new NoUserWithSuchCredentialsException();
  //    }
  //    return convertToPostDtosList(postRepository.findByUserId(user.get().getId()));
  //  }

  public void enrichNewPost(Post post) {
    //Add fields which weren`t specified in PostDTO - timestamp and likes count (current time and 0 likes for a new post)
    post.setCreatedDate(LocalDateTime.now());
//    post.setLikes(0);
  }

  private List<PostDto> convertToPostDtosList(List<Post> posts) {
    return posts.stream().map(post -> modelMapper.map(post, PostDto.class)).toList();
  }
}
