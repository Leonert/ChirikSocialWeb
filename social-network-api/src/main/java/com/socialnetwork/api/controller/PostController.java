package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.BookmarkDto;
import com.socialnetwork.api.dto.LikeDto;
import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.exception.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.additional.Bookmark;
import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.Response;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.service.BookmarkService;
import com.socialnetwork.api.service.LikeService;
import com.socialnetwork.api.service.PostService;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
  private final PostService postService;
  private final LikeService likeService;
  private final BookmarkService bookmarkService;
  private final UserService userService;
  private final ModelMapper modelMapper;

  @GetMapping("/get/{id}")
  public ResponseEntity<PostDto.Response.Default> getPostById(@PathVariable("id") Integer id)
          throws NoPostWithSuchIdException {

    Post post = postService.getReferenceById(id);

    return ResponseEntity.ok(postService.convertToPostDto(post));
  }

  @GetMapping("/get-posts")
  public ResponseEntity<PostDto.Response.Feed>
    getSomePosts(@RequestParam("p") Integer page, @RequestParam("n") Integer postsNumber) {
    List<PostDto.Response.Default> posts = postService.getSomePosts(page, postsNumber);

    PostDto.Response.Feed postDto = new PostDto.Response.Feed();
    postDto.setPosts(posts);

    return ResponseEntity.ok(postDto);
  }

  @PostMapping("/add")
  public ResponseEntity<Response> addPost(@RequestBody PostDto.Request.Created postDto)
          throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {

    Optional<User> optionalUser = userService.findById(postDto.getAuthorId());

    if (optionalUser.isEmpty()) {
      throw new NoUserWithSuchCredentialsException();
    }

    Integer originalPostId = postDto.getOriginalPostId();

    Post post = convertToPost(postDto);
    post.setAuthor(optionalUser.get());

    if (originalPostId != null && postService.existsById(originalPostId)) {
      post.setOriginalPost(postService.getReferenceById(originalPostId));
    }

    postService.save(post);

    return ResponseEntity.status(HttpStatus.OK).body(new Response("Post was created."));
  }

  @PostMapping("/bookmark/add")
  public ResponseEntity<BookmarkDto.Response.BookmarksList>
    saveBookmark(@RequestBody BookmarkDto.Request.Default bookmarkDto)
          throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {
    Optional<User> optionalUser = userService.findById(bookmarkDto.getUserId());

    if (optionalUser.isEmpty()) {
      throw new NoUserWithSuchCredentialsException();
    }

    Post post = postService.getReferenceById(bookmarkDto.getPostId());

    User user = optionalUser.get();

    if (bookmarkService.existsByUserAndPost(user, post)) {
      Bookmark bookmark = bookmarkService.findByUserAndPost(user, post).get();
      bookmarkService.delete(bookmark);
    } else {
      bookmarkService.save(user, post);
    }

    return ResponseEntity.ok(bookmarkService.getUsersIdsDtoForPost(post));
  }

  @PostMapping("/like/add")
  public ResponseEntity<LikeDto.Response.LikesList> saveLike(@RequestBody LikeDto.Request.Default likeDto)
          throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {
    Optional<User> optionalUser = userService.findById(likeDto.getUserId());

    if (optionalUser.isEmpty()) {
      throw new NoUserWithSuchCredentialsException();
    }

    Post post = postService.getReferenceById(likeDto.getPostId());

    User user = optionalUser.get();

    if (likeService.existsByUserAndPost(user, post)) {
      Like like = likeService.findByUserAndPost(user, post).get();
      likeService.delete(like);
    } else {
      likeService.save(user, post);
    }

    return ResponseEntity.ok(likeService.getUsersIdsDtoForPost(post));
  }

  private Post convertToPost(PostDto.Request.Created postDto) {
    return modelMapper.map(postDto, Post.class);
  }
}
