package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.dto.UserDto;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.UserMapper;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.BookmarkService;
import com.socialnetwork.api.service.LikeService;
import com.socialnetwork.api.service.PostService;
import com.socialnetwork.api.service.UserService;
import com.socialnetwork.api.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
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

import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;
import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.POSTS_PER_PAGE_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
  private final PostService postService;
  private final LikeService likeService;
  private final BookmarkService bookmarkService;
  private final UserService userService;
  private final PostMapper postMapper;
  private final UserMapper userMapper;
  private final JwtTokenUtil jwtTokenUtil;

  @GetMapping("/{id}")
  public PostDto.Response.PostInfo getPostById(@PathVariable("id") Integer id) throws NoPostWithSuchIdException {
    return postMapper.convertToPostDtoDefault(postService.getReferenceById(id));
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

    postService.edit(postMapper.convertToPost(postDto));
    return ResponseEntity.ok().build();
  }

  @GetMapping()
  public List<PostDto.Response.PostInfo>
  getPosts(@RequestParam("p") Optional<Integer> page, @RequestParam("n") Optional<Integer> posts) {
    int pageNum = page.orElse(PAGE_NUMBER_DEFAULT);
    int postsNum = posts.orElse(POSTS_PER_PAGE_DEFAULT);

    return postService.getPosts(pageNum, postsNum)
            .stream()
            .map(post -> {
              try {
                return postMapper.convertToPostDtoDefault(post);
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
    Post post = postMapper.convertToPost(postDto, user);

    //          jwtTokenUtil.verifyUsernames(request.getHeader(AUTHORIZATION_HEADER), user.getUsername());

    postService.save(post);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @GetMapping("/replies")
  public List<PostDto.Response.PostInfo> getReplies(
          @RequestParam("i") Optional<Integer> id,
          @RequestParam("p") Optional<Integer> page,
          @RequestParam("n") Optional<Integer> usersForPage,
          HttpServletRequest request) throws NoPostWithSuchIdException, NoUserWithSuchCredentialsException {
    return postMapper.mapForListing(postService.getReplies(id.orElseThrow(NoPostWithSuchIdException::new),
            page.orElse(PAGE_NUMBER_DEFAULT), usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("/retweets")
  public List<UserDto.Response.Listing> getRetweets(
          @RequestParam("i") Optional<Integer> id,
          @RequestParam("p") Optional<Integer> page,
          @RequestParam("n") Optional<Integer> usersForPage,
          HttpServletRequest request) throws NoPostWithSuchIdException, NoUserWithSuchCredentialsException {
    return userMapper.mapForListing(postService.getRetweets(id.orElseThrow(NoPostWithSuchIdException::new),
            jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)),
            page.orElse(PAGE_NUMBER_DEFAULT), usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("/likes")
  public List<UserDto.Response.Listing> getLikes(
          @RequestParam("i") Optional<Integer> id,
          @RequestParam("p") Optional<Integer> page,
          @RequestParam("n") Optional<Integer> usersForPage,
          HttpServletRequest request) throws NoPostWithSuchIdException, NoUserWithSuchCredentialsException {
    return userMapper.mapForListing(likeService.getLikes(id.orElseThrow(NoPostWithSuchIdException::new),
            jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)),
            page.orElse(PAGE_NUMBER_DEFAULT), usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("/bookmarks")
  public List<UserDto.Response.Listing> getBookmarks(
          @RequestParam("i") Optional<Integer> id,
          @RequestParam("p") Optional<Integer> page,
          @RequestParam("n") Optional<Integer> usersForPage,
          HttpServletRequest request) throws NoPostWithSuchIdException, NoUserWithSuchCredentialsException {
    return userMapper.mapForListing(bookmarkService.getBookmarks(id.orElseThrow(NoPostWithSuchIdException::new),
            jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)),
            page.orElse(PAGE_NUMBER_DEFAULT), usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @PostMapping("/bookmarks")
  public ResponseEntity<Integer> bookmarkUnbookmark(@RequestBody PostDto.Request.Default postDto, HttpServletRequest request)
          throws NoUserWithSuchCredentialsException {
    //      jwtService.verifyById(request.getHeader(AUTHORIZATION_HEADER), userId);
    return ResponseEntity
            .status(bookmarkService.bookmarkUnBookmark(postDto.getId(), request.getHeader(AUTHORIZATION_HEADER))
                    ? HttpStatus.OK
                    : HttpStatus.CREATED)
            .body(bookmarkService.countPostBookmarks(postMapper.convertToPost(postDto)));
  }

  @PostMapping("/likes")
  public ResponseEntity<Integer> saveLike(@RequestBody PostDto.Request.Default postDto, HttpServletRequest request)
          throws NoUserWithSuchCredentialsException {
    //      jwtService.verifyById(request.getHeader(AUTHORIZATION_HEADER), userId);
    return ResponseEntity
            .status(likeService.likeUnlike(userService.findByUsername(request.getHeader(AUTHORIZATION_HEADER)).getId(),
                    postDto.getId()) ? HttpStatus.CREATED : HttpStatus.OK)
            .body(likeService.countPostLikes(postMapper.convertToPost(postDto)));
  }
}
