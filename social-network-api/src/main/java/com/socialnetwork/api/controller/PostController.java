package com.socialnetwork.api.controller;

import com.socialnetwork.api.DTO.PostDTO;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.model.BadResponse;
import com.socialnetwork.api.model.GoodResponse;
import com.socialnetwork.api.model.Post;
import com.socialnetwork.api.model.User;
import com.socialnetwork.api.service.PostService;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {
  private final PostService postService;
  private final UserService userService;
  private final ModelMapper modelMapper;
  private static final String POST_NOT_FOUND = "Post with such id wasn`t found";

  @PostMapping("add")
  public ResponseEntity<?> addPost(@RequestBody PostDTO postDTO) throws NoUserWithSuchCredentialsException {
    //Retrieving user id from DTO (only needed field in request), looking for it in userservice and throwing exception if user with such id wasn`t found
    //Also checking of JWT token and comparing it with user needed to be realise in future TODO
    Post post = convertToPost(postDTO);
    Optional<User> user = userService.findById(post.getUser().getId());
    if(user.isEmpty()) throw new NoUserWithSuchCredentialsException();
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

  @PostMapping("edit/{id}")
  public ResponseEntity<?> editPost(@RequestBody PostDTO postDTO) {
    Post post = convertToPost(postDTO);
    if (!postService.existsById(post.getPostId()))
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BadResponse(POST_NOT_FOUND));
    postService.edit(post);
    return ResponseEntity.ok(new GoodResponse("OK"));
  }

  @PostMapping("{id}")
  public Post getPost(@PathVariable("id") int id) {
    return postService.getReferenceById(id);
  }

  @PostMapping("feed/{page}")
  public Page<Post> getPostsSortedByCreatedDate(@PathVariable(name = "page", required = false)Optional<Integer> page) {
    return postService.findAll(PageRequest.of(page.orElse(1), 10, Sort.by(Sort.Direction.DESC, "created_date")));
  }

  @PostMapping("user/{page}")
  public Page<Post> getPostsByUsername(@RequestBody User user,
                                       @PathVariable(name = "page", required = false)Optional<Integer> page) throws NoUserWithSuchCredentialsException {
    return postService.findPostsByUsername(user.getUsername(), page);
  }

  @ExceptionHandler(NoUserWithSuchCredentialsException.class)
  @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "User with such credentials wasn`t found")
  private void handleException() {}

  private Post convertToPost(PostDTO postDTO) {
    return modelMapper.map(postDTO, Post.class);
  }
}
