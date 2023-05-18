package com.socialnetwork.api.controller.authorized;

import com.socialnetwork.api.dto.authorized.PostDto;
import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.exception.custom.AccessDeniedException;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.authorized.PostMapper;
import com.socialnetwork.api.mapper.authorized.UserMapper;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.BookmarkService;
import com.socialnetwork.api.service.authorized.LikeService;
import com.socialnetwork.api.service.authorized.PostService;
import com.socialnetwork.api.service.authorized.UserService;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;
import static com.socialnetwork.api.util.Constants.Auth.ID_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.PAGE_NUMBER_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.RESULTS_PER_PAGE_QUERY;
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
  public PostDto.Response.WithAuthor getPostById(@PathVariable(ID_QUERY) Integer id,
                                                 HttpServletRequest request)
          throws NoPostWithSuchIdException, NoUserWithSuchCredentialsException {
    return postMapper.convertToPostDtoDefault(postService.getReferenceById(id),
            jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)));
  }

  @GetMapping()
  public List<PostDto.Response.WithAuthor>
    getFeed(@RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
            @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> postsPerPage,
            @RequestParam("viewed") Optional<Boolean> showViewedPosts, HttpServletRequest request)
          throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {
    String username = jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER));
    List<PostDto.Response.WithAuthor> outcome = new ArrayList<>();
    for (Post post: showViewedPosts.orElse(false) ? postService.getPosts(
                    page.orElse(PAGE_NUMBER_DEFAULT), postsPerPage.orElse(POSTS_PER_PAGE_DEFAULT))
        :  postService.getUnviewedPosts(
            page.orElse(PAGE_NUMBER_DEFAULT), postsPerPage.orElse(POSTS_PER_PAGE_DEFAULT), username)) {
      outcome.add(postMapper.convertToPostDtoDefault(post, username));
    }
    return outcome;
  }

  @GetMapping("/{id}/replies]")
  public List<PostDto.Response.WithAuthor> getReplies(
          @PathVariable("id") int id,
          @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
          @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage,
          HttpServletRequest request) throws NoPostWithSuchIdException {
    return postMapper.mapForListing(postService.getReplies(id,
            page.orElse(PAGE_NUMBER_DEFAULT), usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT)),
            jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)));
  }

  @GetMapping("/{id}/retweets")
  public List<UserDto.Response.Listing> getRetweets(
          @PathVariable("id") int id,
          @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
          @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage,
          HttpServletRequest request) throws NoPostWithSuchIdException, NoUserWithSuchCredentialsException {
    String currentUserUsername = jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER));
    return userMapper.mapForListing(postService.getRetweets(id,
            currentUserUsername, page.orElse(PAGE_NUMBER_DEFAULT),
            usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT)), currentUserUsername);
  }

  @GetMapping("/{id}/likes")
  public List<UserDto.Response.Listing> getLikes(
          @PathVariable("id") int id,
          @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
          @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage,
          HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    String currentUserUsername = jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER));
    return userMapper.mapForListing(likeService.getLikes(id,
            currentUserUsername, page.orElse(PAGE_NUMBER_DEFAULT),
            usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT)), currentUserUsername);
  }

  @PostMapping()
  public ResponseEntity<Void> addPost(@RequestBody PostDto.Request.Created postDto, HttpServletRequest request)
          throws NoPostWithSuchIdException, AccessDeniedException {
    User user = userService.getReferenceById(postDto.getUser().getId());
    checkAuthentication(user, request);
    postService.save(postMapper.convertToPost(postDto, user));
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PatchMapping()
  public ResponseEntity<Void> editPost(@RequestBody PostDto.Request.Editable postDto, HttpServletRequest request)
          throws NoPostWithSuchIdException, AccessDeniedException {
    Post post = postService.getReferenceById(postDto.getId());
    checkAuthentication(post, request);
    postService.edit(postMapper.convertToPost(postDto), post);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("{id}")
  public ResponseEntity<Void> deletePostById(@PathVariable(ID_QUERY) int id, HttpServletRequest request)
          throws NoPostWithSuchIdException, AccessDeniedException {
    Post post = postService.getReferenceById(id);
    checkAuthentication(post, request);
    postService.delete(post);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  @PostMapping("/{id}/bookmarks")
  public ResponseEntity<Integer> bookmarkUnbookmark(@PathVariable(ID_QUERY) int postId,
                                                    HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return ResponseEntity
            .status(bookmarkService.bookmarkUnBookmark(postId, jwtTokenUtil.getUsernameFromToken(
                    request.getHeader(AUTHORIZATION_HEADER))) ? HttpStatus.OK : HttpStatus.CREATED)
            .body(bookmarkService.countPostBookmarks(new Post(postId)));
  }

  @PostMapping("/{id}/likes")
  public ResponseEntity<Integer> saveLike(@PathVariable(ID_QUERY) int postId, HttpServletRequest request)
          throws NoUserWithSuchCredentialsException {
    return ResponseEntity
            .status(likeService.likeUnlike(userService.findByUsername(jwtTokenUtil.getUsernameFromToken(
                    request.getHeader(AUTHORIZATION_HEADER))).getId(),
                    postId) ? HttpStatus.CREATED : HttpStatus.OK)
            .body(likeService.countPostLikes(new Post(postId)));
  }

  @PostMapping("/{id}/views")
  public void saveView(@PathVariable(ID_QUERY) int postId, HttpServletRequest request)
          throws NoUserWithSuchCredentialsException {
    postService.saveView(userService.findByUsername(
        jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER))), postId);
  }

  private void checkAuthentication(Post post, HttpServletRequest request) throws AccessDeniedException {
    if (!jwtTokenUtil.getUsernameFromToken(
        request.getHeader(AUTHORIZATION_HEADER)).equals(post.getAuthor().getUsername())) {
      throw new AccessDeniedException();
    }
  }

  private void checkAuthentication(User user, HttpServletRequest request) throws AccessDeniedException {
    if (!jwtTokenUtil.getUsernameFromToken(
        request.getHeader(AUTHORIZATION_HEADER)).equals(user.getUsername())) {
      throw new AccessDeniedException();
    }
  }
}
