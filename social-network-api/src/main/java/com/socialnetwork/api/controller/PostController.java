package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.exception.AccessDeniedException;
import com.socialnetwork.api.exception.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.service.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
  private static final String AUTHORIZATION_HEADER = "Authorization";
  private static final Integer PAGE_NUMBER_DEFAULT = 0;
  private static final Integer POSTS_NUMBER_DEFAULT = 3;
  private final PostService postService;
  private final LikeService likeService;
  private final BookmarkService bookmarkService;
  private final UserService userService;
  private final JwtService jwtService;
  private final ModelMapper modelMapper;

  @GetMapping("/{id}")
  public PostDto.Response.Default getPostById(@PathVariable("id") Integer id) throws NoPostWithSuchIdException {
    return convertToPostDto(postService.getReferenceById(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePostById(@PathVariable("id") Integer id) throws NoPostWithSuchIdException {
    if (!postService.existsById(id)) {
      throw new NoPostWithSuchIdException();
    }

    postService.delete(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  @PatchMapping()
  public ResponseEntity<Void> editPost(@RequestBody PostDto.Request.Editable postDto) throws NoPostWithSuchIdException {
    if (!postService.existsById(postDto.getId())) {
      throw new NoPostWithSuchIdException();
    }

    postService.edit(convertToPost(postDto));
    return ResponseEntity.ok().build();
  }

  @GetMapping()
  public List<PostDto.Response.Default> getPosts(@RequestParam("p") Optional<Integer> page, @RequestParam("n") Optional<Integer> posts) {
    int pageNum = page.orElse(PAGE_NUMBER_DEFAULT);
    int postsNum = posts.orElse(POSTS_NUMBER_DEFAULT);

    return postService.getPosts(pageNum, postsNum).stream().map(post -> {
      try {
        return convertToPostDto(post);
      } catch (NoPostWithSuchIdException e) {
        throw new RuntimeException(e);
      }
    }).toList();
  }

  @PostMapping()
  public ResponseEntity<Void> addPost(@RequestBody PostDto.Request.Created postDto, HttpServletRequest request) throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {
    User user = userService.getReferenceById(postDto.getUser().getId());
    Post post = convertToPost(postDto, user);

    //          jwtTokenUtil.verifyUsernames(request.getHeader(AUTHORIZATION_HEADER), user.getUsername());

    postService.save(post);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PostMapping("/bookmark")
  public ResponseEntity<Integer> saveBookmark(@RequestBody PostDto.Request.Action postDto, HttpServletRequest request) throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {
    int userId = postDto.getUser().getId();
    int postId = postDto.getPost().getId();

    if (!userService.existsById(userId)) {
      throw new NoUserWithSuchCredentialsException();
    }

    if (!postService.existsById(postId)) {
      throw new NoPostWithSuchIdException();
    }

    //      jwtService.verifyById(request.getHeader(AUTHORIZATION_HEADER), userId);

    boolean bookmarkExists = bookmarkService.existsByIds(userId, postId);

    if (bookmarkExists) {
      bookmarkService.delete(userId, postId);
    } else {
      bookmarkService.save(userId, postId);
    }

    return ResponseEntity.status(bookmarkExists ? HttpStatus.OK : HttpStatus.CREATED).body(bookmarkService.countPostBookmarks(convertToPost(postDto.getPost())));
  }

  @PostMapping("/like")
  public ResponseEntity<Integer> saveLike(@RequestBody PostDto.Request.Action postDto, HttpServletRequest request) throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException, AccessDeniedException {
    int userId = postDto.getUser().getId();
    int postId = postDto.getPost().getId();

    if (!userService.existsById(userId)) {
      throw new NoUserWithSuchCredentialsException();
    }

    if (!postService.existsById(postId)) {
      throw new NoPostWithSuchIdException();
    }

    //      jwtService.verifyById(request.getHeader(AUTHORIZATION_HEADER), userId);

    boolean likeExists = likeService.existsByIds(userId, postId);

    if (likeExists) {
      likeService.delete(userId, postId);
    } else {
      likeService.save(userId, postId);
    }

    return ResponseEntity.status(likeExists ? HttpStatus.OK : HttpStatus.CREATED).body(likeService.countPostLikes(convertToPost(postDto.getPost())));
  }

  private Post convertToPost(PostDto.Request.Created postDto, User user) throws NoPostWithSuchIdException {
    Integer originalPostId = postDto.getOriginalPostId();
    Post post = modelMapper.map(postDto, Post.class);
    post.setAuthor(user);

    if (originalPostId != null && postService.existsById(originalPostId)) {
      post.setOriginalPost(postService.getReferenceById(originalPostId));
    }

    return post;
  }

  private Post convertToPost(PostDto.Request.Editable postDto) {
    return modelMapper.map(postDto, Post.class);
  }

  private Post convertToPost(PostDto.Request.Default postDto) {
    return modelMapper.map(postDto, Post.class);
  }

  private PostDto.Response.Default convertToPostDto(Post post) throws NoPostWithSuchIdException {
    PostDto.Response.Default postDto = modelMapper.map(post, PostDto.Response.Default.class);
    postDto.setLikesNumber(likeService.countPostLikes(post));
    postDto.setBookmarksNumber(bookmarkService.countPostBookmarks(post));

    if (postDto.getOriginalPost() != null) {
      Post originalPost = postService.getReferenceById(postDto.getOriginalPost().getId());
      postDto.getOriginalPost().setLikesNumber(likeService.countPostLikes(originalPost));
      postDto.getOriginalPost().setBookmarksNumber(bookmarkService.countPostBookmarks(originalPost));
    }

    return postDto;
  }
}
