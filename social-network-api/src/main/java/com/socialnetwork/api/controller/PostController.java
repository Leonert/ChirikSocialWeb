package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.exception.AccessDeniedException;
import com.socialnetwork.api.exception.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.service.BookmarkService;
import com.socialnetwork.api.service.JwtService;
import com.socialnetwork.api.service.LikeService;
import com.socialnetwork.api.service.PostService;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Const.Auth.AUTHORIZATION_HEADER;
import static com.socialnetwork.api.util.Const.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Const.Response.POSTS_PER_PAGE_DEFAULT;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
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
  public List<PostDto.Response.Default>
    getPosts(@RequestParam("p") Optional<Integer> page, @RequestParam("n") Optional<Integer> posts) {
    int pageNum = page.orElse(PAGE_NUMBER_DEFAULT);
    int postsNum = posts.orElse(POSTS_PER_PAGE_DEFAULT);

    return postService.getPosts(pageNum, postsNum)
        .stream()
        .map(post -> {
          try {
            return convertToPostDto(post);
          } catch (NoPostWithSuchIdException e) {
            throw new RuntimeException(e);
          }
        })
        .toList();
  }

  @PostMapping()
  public ResponseEntity<Void> addPost(@RequestBody PostDto.Request.Created postDto, HttpServletRequest request)
      throws NoPostWithSuchIdException {
    User user = userService.getReferenceById(postDto.getUser().getId());
    Post post = convertToPost(postDto, user);

    //          jwtTokenUtil.verifyUsernames(request.getHeader(AUTHORIZATION_HEADER), user.getUsername());

    postService.save(post);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PostMapping("/bookmark")
  public ResponseEntity<Integer> bookmarkUnbookmark(@RequestBody PostDto.Request.Default postDto, HttpServletRequest request)
      throws NoUserWithSuchCredentialsException {
    //      jwtService.verifyById(request.getHeader(AUTHORIZATION_HEADER), userId);
    return ResponseEntity
        .status(bookmarkService.bookmarkUnBookmark(postDto.getId(), request.getHeader(AUTHORIZATION_HEADER))
            ? HttpStatus.OK : HttpStatus.CREATED).body(bookmarkService.countPostBookmarks(convertToPost(postDto)));
  }

  @PostMapping("/like")
  public ResponseEntity<Integer> saveLike(@RequestBody PostDto.Request.Default postDto, HttpServletRequest request)
      throws NoUserWithSuchCredentialsException {
    //      jwtService.verifyById(request.getHeader(AUTHORIZATION_HEADER), userId);
    return ResponseEntity
        .status(likeService.likeUnlike(userService.findByUsername(request.getHeader(AUTHORIZATION_HEADER)).getId(),
            postDto.getId()) ? HttpStatus.CREATED : HttpStatus.OK)
        .body(likeService.countPostLikes(convertToPost(postDto)));
  }

  private Post convertToPost(PostDto.Request.Created postDto, User user)
      throws NoPostWithSuchIdException {
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
