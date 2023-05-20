package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.PostDtoInterface;
import com.socialnetwork.api.dto.UserDtoInterface;
import com.socialnetwork.api.dto.authorized.PostDto;
import com.socialnetwork.api.exception.custom.AccessDeniedException;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.authorized.PostMapper;
import com.socialnetwork.api.mapper.authorized.UserMapper;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthPostMapper;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthUserMapper;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.service.BookmarkService;
import com.socialnetwork.api.service.authorized.LikeService;
import com.socialnetwork.api.service.authorized.PostService;
import com.socialnetwork.api.service.authorized.UserService;
import com.socialnetwork.api.service.noneauthorized.NonAuthLikeService;
import com.socialnetwork.api.service.noneauthorized.NonAuthPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Auth.ID_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.PAGE_NUMBER_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.RESULTS_PER_PAGE_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.USERNAME_ATTRIBUTE;
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
  private final NonAuthPostMapper nonAuthPostMapper;
  private final NonAuthUserMapper nonAuthUserMapper;
  private final NonAuthPostService nonAuthPostService;
  private final NonAuthLikeService nonAuthLikeService;

  @GetMapping("/{id}")
  public PostDtoInterface getPostById(@PathVariable(ID_QUERY) Integer id,
                                      @RequestAttribute(USERNAME_ATTRIBUTE) Optional<String> username)
      throws NoPostWithSuchIdException, NoUserWithSuchCredentialsException {
    if (username.isEmpty()) {
      return nonAuthPostMapper.convertToPostDtoDefault(nonAuthPostService.getReferenceById(id));
    }
    return postMapper.convertToPostDtoDefault(postService.getReferenceById(id),
        username.get());
  }

  @GetMapping("")
  public List<? extends PostDtoInterface>
    getFeed(@RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
          @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> postsPerPage,
          @RequestParam("viewed") Optional<Boolean> showViewedPosts,
          @RequestAttribute(USERNAME_ATTRIBUTE) Optional<String> username)
      throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = postsPerPage.orElse(POSTS_PER_PAGE_DEFAULT);
    if (username.isEmpty()) {
      return nonAuthPostMapper.mapForListing(nonAuthPostService.getPosts(pageD, resultsD));
    }
    String usernameD = username.get();
    List<PostDto.Response.WithAuthor> outcome = new ArrayList<>();
    List<Post> posts = showViewedPosts.orElse(false)
        ? postService.getPosts(pageD, resultsD) :
        postService.getUnviewedPosts(pageD, resultsD, usernameD);
    for (Post post : posts) {
      outcome.add(postMapper.convertToPostDtoDefault(post, usernameD));
    }
    return outcome;
  }

  @GetMapping("/{id}/replies")
  public List<? extends PostDtoInterface> getReplies(
      @PathVariable("id") int id, @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
      @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage,
      @RequestAttribute(USERNAME_ATTRIBUTE) Optional<String> username) throws NoPostWithSuchIdException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT);
    if (username.isEmpty()) {
      return nonAuthPostMapper.mapForListing(nonAuthPostService.getReplies(id,
          pageD, resultsD));
    }
    return postMapper.mapForListing(postService.getReplies(id, pageD, resultsD),
        username.get());
  }

  @GetMapping("/{id}/retweets")
  public List<? extends UserDtoInterface> getRetweets(
      @PathVariable("id") int id,
      @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
      @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage,
      @RequestAttribute(USERNAME_ATTRIBUTE) Optional<String> username) throws NoUserWithSuchCredentialsException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT);
    if (username.isEmpty()) {
      return nonAuthUserMapper.mapForListing(nonAuthPostService.getRetweets(id,
          pageD, resultsD));
    }
    String currentUserUsername = username.get();
    return userMapper.mapForListing(postService.getRetweets(id,
        currentUserUsername, pageD, resultsD), currentUserUsername);
  }

  @GetMapping("/{id}/likes")
  public List<? extends UserDtoInterface> getLikes(
      @PathVariable("id") int id,
      @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
      @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage,
      @RequestAttribute(USERNAME_ATTRIBUTE) Optional<String> username) throws NoUserWithSuchCredentialsException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT);
    if (username.isEmpty()) {
      return nonAuthUserMapper.mapForListing(nonAuthLikeService.getLikes(id,
          pageD, resultsD));
    }
    String currentUserUsername = username.get();
    return userMapper.mapForListing(likeService.getLikes(id,
        currentUserUsername, pageD, resultsD), currentUserUsername);
  }

  @PostMapping()
  public ResponseEntity<Integer> addPost(@RequestBody PostDto.Request.Created postDto,
                                         @RequestAttribute(USERNAME_ATTRIBUTE) Optional<String> username)
      throws NoPostWithSuchIdException, NoUserWithSuchCredentialsException {
    User user = userService.findByUsername(username.get());
    return ResponseEntity.status(HttpStatus.CREATED).body(postService.save(postMapper.convertToPost(postDto, user)));
  }

  @PatchMapping()
  public ResponseEntity<?> editPost(@RequestBody PostDto.Request.Editable postDto,
                                    @RequestAttribute(USERNAME_ATTRIBUTE) String username)
      throws NoPostWithSuchIdException, AccessDeniedException {
    Post post = postService.getReferenceById(postDto.getId());
    checkAuthenticationForPost(post, username);
    postService.edit(postMapper.convertToPost(postDto), post);
    return ResponseEntity.status(202).build();
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> deletePostById(@PathVariable(ID_QUERY) int id,
                                          @RequestAttribute(USERNAME_ATTRIBUTE) String username)
      throws NoPostWithSuchIdException, AccessDeniedException {
    Post post = postService.getReferenceById(id);
    checkAuthenticationForPost(post, username);
    postService.delete(post);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  @PostMapping("/{id}/bookmarks")
  public ResponseEntity<Integer> bookmarkUnbookmark(@PathVariable(ID_QUERY) int postId,
                                                    @RequestAttribute(USERNAME_ATTRIBUTE) String username)
      throws NoUserWithSuchCredentialsException {
    return ResponseEntity
        .status(bookmarkService.bookmarkUnBookmark(postId, username) ? HttpStatus.OK : HttpStatus.CREATED)
        .body(bookmarkService.countPostBookmarks(new Post(postId)));
  }

  @PostMapping("/{id}/likes")
  public ResponseEntity<Integer> saveLike(@PathVariable(ID_QUERY) int postId,
                                          @RequestAttribute(USERNAME_ATTRIBUTE) String username)
      throws NoUserWithSuchCredentialsException {
    return ResponseEntity
        .status(likeService.likeUnlike(userService.findByUsername(username).getId(),
            postId) ? HttpStatus.CREATED : HttpStatus.OK)
        .body(likeService.countPostLikes(new Post(postId)));
  }

  @PostMapping("/{id}/views")
  public void saveView(@PathVariable(ID_QUERY) int postId,
                       @RequestAttribute(USERNAME_ATTRIBUTE) String username)
      throws NoUserWithSuchCredentialsException {
    postService.saveView(userService.findByUsername(username), postId);
  }

  private void checkAuthenticationForPost(Post post, String username) throws AccessDeniedException {
    if (!username.equals(post.getAuthor().getUsername())) {
      throw new AccessDeniedException();
    }
  }
}
