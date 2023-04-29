package com.socialnetwork.api.controller;

import com.socialnetwork.api.DTO.PostDTO;
import com.socialnetwork.api.exception.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.model.BadResponse;
import com.socialnetwork.api.model.GoodResponse;
import com.socialnetwork.api.model.Post;
import com.socialnetwork.api.model.User;
import com.socialnetwork.api.service.PostService;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {
  private static final String POST_NOT_FOUND = "Post with such id wasn`t found";
  private final PostService postService;
  private final UserService userService;
  private final ModelMapper modelMapper;

  @PostMapping("add")
  public ResponseEntity<?> addPost(@RequestBody PostDTO postDTO) throws NoUserWithSuchCredentialsException {
    //Retrieving user id from DTO (only needed field in request), looking for it in userservice and throwing exception if user with such id wasn`t found
    //Also checking of JWT token and comparing it with user needed to be realise in future TODO
    Post post = convertToPost(postDTO);
    Optional<User> user = userService.findById(post.getUser().getId());
    if (user.isEmpty()) throw new NoUserWithSuchCredentialsException(); // TODO
    post.setUser(user.get());
    postService.save(convertToPost(postDTO));
    return ResponseEntity.ok(new GoodResponse("OK"));
  }

  @PostMapping("delete")
  public ResponseEntity<?> deletePost(@RequestBody PostDTO postDTO) {
    Post post = convertToPost(postDTO);
    if (!postService.existsById(post.getPostId()))
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BadResponse(POST_NOT_FOUND));
    postService.delete(post);
    return ResponseEntity.ok(new GoodResponse("OK"));
  }

  @PostMapping("edit")
  public ResponseEntity<?> editPost(@RequestBody PostDTO postDTO) {
    Post post = convertToPost(postDTO);
    if (!postService.existsById(post.getPostId()))
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BadResponse(POST_NOT_FOUND));
    postService.edit(post);
    return ResponseEntity.ok(new GoodResponse("OK"));
  }

  @PostMapping("get")
  public PostDTO getPost(@RequestBody PostDTO postDTO) throws NoPostWithSuchIdException {
    return postService.getReferenceById(postDTO.getId());
  }

  @PostMapping("feed")
  public List<PostDTO> getPostsSortedByCreatedDate() {
    return postService.getPostsSortedByCreatedDate();
  }

  @PostMapping("user")
  public List<PostDTO> getPostsByUsername(@RequestBody User user) throws NoUserWithSuchCredentialsException {
    return postService.findPostsByUsername(user.getUsername());
  }

  private Post convertToPost(PostDTO postDTO) {
    return modelMapper.map(postDTO, Post.class);
  }
}
