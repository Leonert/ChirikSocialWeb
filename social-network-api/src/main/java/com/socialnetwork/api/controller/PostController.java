package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.exception.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.model.Post;
import com.socialnetwork.api.model.User;
import com.socialnetwork.api.model.GetPostsResponse;
import com.socialnetwork.api.model.GoodResponse;
import com.socialnetwork.api.model.BadResponse;
import com.socialnetwork.api.service.PostService;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
  private static final String POST_NOT_FOUND = "Post with such id wasn`t found";
  private final PostService postService;
  private final UserService userService;
  private final ModelMapper modelMapper;

  @GetMapping("/{id}")
  public PostDto getPost(@PathVariable("id") int id) throws NoPostWithSuchIdException {
    return postService.getReferenceById(id);
  }

  @GetMapping("/get")
  public ResponseEntity<?> getSomePosts(@RequestParam("p") Integer page, @RequestParam("n") Integer postsNumber) {
    // example :
    // page == 1, postsNumber == 3
    // 1. post with id 1, reposted_id = null
    // 2. post with id 2, reposted_id = null
    // 3. post with id 3, reposted_id = 2
    // 4. post with id 4, reposted_id = 1
    // 5. post with id 5, reposted_id = 4
    // 6. post with id 6, reposted_id = null
    // response : { posts: [{post with id 4}, {post with id 5}, {post with id 6}],
    //             reposts: [{post with id 1}, {post with id 4}] }

    List<Post> posts = postService.getSomePosts(page, postsNumber);
    List<Post> reposts = postService.getRepostedPosts(posts);

    GetPostsResponse response = new GetPostsResponse(posts, reposts);

    return ResponseEntity.ok(response);
  }

  @GetMapping("feed")
  public List<PostDto> getPostsSortedByCreatedDate() {
    return postService.getPostsSortedByCreatedDate();
  }

  @GetMapping("user/{username}")
  public List<PostDto> getPostsByUsername(@PathVariable("username") String username)
          throws NoUserWithSuchCredentialsException {
    return postService.findPostsByUsername(username);
  }

  @PostMapping("/add")
  public ResponseEntity<?> addPost(@RequestBody Post post) throws NoUserWithSuchCredentialsException {
    Optional<User> optionalUser = userService.findById(post.getUser().getId());

    if (optionalUser.isEmpty()) {
      throw new NoUserWithSuchCredentialsException();
    }

    post.setUser(optionalUser.get());
    postService.save(post);
    return ResponseEntity.status(201).body(new GoodResponse("Post was created"));
  }

  //  @PostMapping("/add")
  //  public ResponseEntity<?> addPost(@RequestBody PostDto postDto) throws NoUserWithSuchCredentialsException {
  //    //Retrieving user id from DTO (only needed field in request), looking for it
  //    // in userservice and throwing exception if user with such id wasn`t found
  //    //Also checking of JWT token and comparing it with user needed to be realise in future TODO
  //    Post post = convertToPost(postDto);
  //    Optional<User> user = userService.findById(post.getUser().getId());
  //    if (user.isEmpty()) {
  //      throw new NoUserWithSuchCredentialsException();
  //    }
  //    post.setUser(user.get());
  //    postService.save(post);
  //    return ResponseEntity.status(201).body(new GoodResponse("Post was created"));
  //  }

  @PatchMapping()
  public ResponseEntity<?> editPost(@RequestBody PostDto postDto) {
    Post post = convertToPost(postDto);
    if (!postService.existsById(post.getPostId())) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new BadResponse(POST_NOT_FOUND));
    }
    postService.edit(post);
    return ResponseEntity.ok(new GoodResponse("Post was edited successfully"));
  }

  @DeleteMapping()
  public ResponseEntity<?> deletePost(@RequestBody PostDto postDto) {
    Post post = convertToPost(postDto);
    if (!postService.existsById(post.getPostId())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BadResponse(POST_NOT_FOUND));
    }
    postService.delete(post);
    return ResponseEntity.ok(new GoodResponse("Post was deleted"));
  }

  private Post convertToPost(PostDto postDto) {
    return modelMapper.map(postDto, Post.class);
  }
}
