package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.DtoInterface;
import com.socialnetwork.api.dto.PostDtoInterface;
import com.socialnetwork.api.dto.authorized.PostDto;
import com.socialnetwork.api.exception.custom.AccessDeniedException;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.exception.custom.PostWithNoDataException;
import com.socialnetwork.api.mapper.authorized.PostMapper;
import com.socialnetwork.api.mapper.authorized.UserMapper;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthPostMapper;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthUserMapper;
import com.socialnetwork.api.model.additional.Follow;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.security.CurrentUser;
import com.socialnetwork.api.security.jwt.UserPrincipal;
import com.socialnetwork.api.service.BookmarkService;
import com.socialnetwork.api.service.authorized.LikeService;
import com.socialnetwork.api.service.authorized.PostService;
import com.socialnetwork.api.service.authorized.UserService;
import com.socialnetwork.api.service.noneauthorized.NonAuthLikeService;
import com.socialnetwork.api.service.noneauthorized.NonAuthPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Request.ID_QUERY;
import static com.socialnetwork.api.util.Constants.Request.PAGE_NUMBER_QUERY;
import static com.socialnetwork.api.util.Constants.Request.RESULTS_PER_PAGE_QUERY;
import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.POSTS_PER_PAGE_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;
import static com.socialnetwork.api.util.Constants.WebSocket.TOPIC_POSTS;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController extends Controller {

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
  private final SimpMessagingTemplate messagingTemplate;

  @GetMapping("/{id}")
  public PostDtoInterface getPostById(@PathVariable(ID_QUERY) Integer id,
                                      @CurrentUser UserPrincipal currentUser)
          throws NoPostWithSuchIdException, NoUserWithSuchCredentialsException {
    if (currentUser == null) {
      return nonAuthPostMapper.convertToPostDtoDefault(nonAuthPostService.getReferenceById(id));
    }

    return postMapper.convertToPostDtoDefault(postService.getReferenceById(id), currentUser.getUsername());
  }

  @GetMapping("")
  public ResponseEntity<List<? extends DtoInterface>>
    getFeed(@RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
            @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> postsPerPage,
            @RequestParam("viewed") Optional<Boolean> showViewedPosts,
            @CurrentUser UserPrincipal currentUser)
          throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = postsPerPage.orElse(POSTS_PER_PAGE_DEFAULT);

    if (currentUser == null) {
      return getListResponseEntity(nonAuthPostMapper.mapForListing(
              nonAuthPostService.getPosts(pageD, resultsD)));
    }

    String username = currentUser.getUsername();
    List<PostDto.Response.WithAuthor> outcome = new ArrayList<>();
    List<Post> posts = showViewedPosts.orElse(false) ? postService.getPosts(pageD, resultsD)
            : postService.getUnviewedPosts(pageD, resultsD, username);

    for (Post post : posts) {
      outcome.add(postMapper.convertToPostDtoDefault(post, username));
    }

    return getListResponseEntity(outcome);
  }

  @GetMapping("/following")
  public ResponseEntity<List<? extends DtoInterface>>
    getFollowingFeed(@RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> pageParam,
                     @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> postsQuantityParam,
                     @CurrentUser UserPrincipal currentUser)
          throws NoUserWithSuchCredentialsException, AccessDeniedException {
    int page = pageParam.orElse(PAGE_NUMBER_DEFAULT);
    int results = postsQuantityParam.orElse(POSTS_PER_PAGE_DEFAULT);

    if (currentUser == null) {
      throw new AccessDeniedException();
    }

    String username = currentUser.getUsername();
    List<User> followings = userService.findByUsername(username)
            .getFollowed()
            .stream()
            .map(Follow::getFollowedUser)
            .toList();

    return getListResponseEntity(postMapper.mapForListing(
                    postService.getFollowingPosts(page, results, followings),
                    username
            )
    );
  }

  @GetMapping("/{id}/replies")
  public ResponseEntity<List<? extends DtoInterface>> getReplies(
          @PathVariable("id") int id, @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
          @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage,
          @CurrentUser UserPrincipal currentUser) throws NoPostWithSuchIdException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT);

    if (currentUser == null) {
      return getListResponseEntity(nonAuthPostMapper.mapForListing(nonAuthPostService.getReplies(id, pageD, resultsD)));
    }

    return getListResponseEntity(postMapper.mapForListing(
            postService.getReplies(id, pageD, resultsD), currentUser.getUsername()));
  }

  @GetMapping("/{id}/retweets")
  public ResponseEntity<List<? extends DtoInterface>> getRetweets(
          @PathVariable("id") int id,
          @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
          @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage,
          @CurrentUser UserPrincipal currentUser)
          throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT);

    if (currentUser == null) {
      return getListResponseEntity(nonAuthUserMapper.mapForListing(nonAuthPostService.getRetweets(id,
              pageD, resultsD)));
    }

    String currentUserUsername = currentUser.getUsername();
    return getListResponseEntity(userMapper.mapForListing(postService.getRetweets(id,
            currentUserUsername, pageD, resultsD), currentUserUsername));
  }

  @GetMapping("/{id}/likes")
  public ResponseEntity<List<? extends DtoInterface>> getLikes(
          @PathVariable("id") int id,
          @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
          @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage,
          @CurrentUser UserPrincipal currentUser)
          throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT);

    if (currentUser == null) {
      return getListResponseEntity(nonAuthUserMapper.mapForListing(nonAuthLikeService.getLikes(id,
              pageD, resultsD)));
    }

    String currentUserUsername = currentUser.getUsername();
    return getListResponseEntity(userMapper.mapForListing(likeService.getLikes(id,
            currentUserUsername, pageD, resultsD), currentUserUsername));
  }

  @PostMapping()
  public ResponseEntity<?> addPost(@RequestBody PostDto.Request.Created postDto,
                                   @CurrentUser UserPrincipal currentUser)
          throws NoPostWithSuchIdException, NoUserWithSuchCredentialsException, PostWithNoDataException {
    Integer id = postDto.getOriginalPost();
    String username = currentUser.getUsername();

    if (id == null && postDto.getImage() == null && postDto.getText() == null) {
      throw new PostWithNoDataException();
    }

    if (id != null && postDto.getText() == null && postDto.getImage() == null
            && postService.isRetweetedByUser(userService.findByUsername(username).getId(), id)) {
      postService.deleteUserRetweet(userService.findByUsername(username).getId(), id);
      return ResponseEntity.status(HttpStatus.OK).body(postService.countPostRetweets(id));
    }

    String image = postDto.getImage();
    postDto.setImage(null);
    PostDto.Response.WithAuthor responseDto = postMapper.convertToPostDtoDefault(postService.save(
            postMapper.convertToPost(postDto, userService.findByUsername(username)), image), username);
    messagingTemplate.convertAndSend(TOPIC_POSTS, responseDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
  }

  @PostMapping("/edit")
  public ResponseEntity<? extends PostDtoInterface> editPost(@RequestBody PostDto.Request.Editable postDto,
                                                             @CurrentUser UserPrincipal currentUser)
          throws NoPostWithSuchIdException, AccessDeniedException, NoUserWithSuchCredentialsException {
    Post post = postService.getReferenceById(postDto.getId());
    String username = currentUser.getUsername();
    checkAuthenticationForPost(post, username);
    return ResponseEntity.status(202).body(postMapper.convertToPostDtoDefault(
            postService.edit(postMapper.convertToPost(postDto), post), username));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> deletePostById(@PathVariable(ID_QUERY) int id,
                                          @CurrentUser UserPrincipal currentUser)
          throws NoPostWithSuchIdException, AccessDeniedException {
    Post post = postService.getReferenceById(id);
    checkAuthenticationForPost(post, currentUser.getUsername());
    postService.delete(post);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  @PostMapping("/{id}/bookmarks")
  public ResponseEntity<Integer> bookmarkUnbookmark(@PathVariable(ID_QUERY) int postId,
                                                    @CurrentUser UserPrincipal currentUser)
          throws NoUserWithSuchCredentialsException {
    return ResponseEntity
            .status(bookmarkService.bookmarkUnBookmark(postId, currentUser.getUsername())
                    ? HttpStatus.OK
                    : HttpStatus.CREATED)
            .body(bookmarkService.countPostBookmarks(postId));
  }

  @PostMapping("/{id}/likes")
  public ResponseEntity<Integer> saveLike(@PathVariable(ID_QUERY) int postId,
                                          @CurrentUser UserPrincipal currentUser)
          throws NoUserWithSuchCredentialsException {
    return ResponseEntity
            .status(likeService.likeUnlike(userService.findByUsername(currentUser.getUsername()).getId(),
                    postId) ? HttpStatus.CREATED : HttpStatus.OK)
            .body(likeService.countPostLikes(postId));
  }

  @PostMapping("/{id}/views")
  public void saveView(@PathVariable(ID_QUERY) int postId,
                       @CurrentUser UserPrincipal currentUser)
          throws NoUserWithSuchCredentialsException {
    postService.saveView(userService.findByUsername(currentUser.getUsername()), postId);
  }

  private void checkAuthenticationForPost(Post post, String username) throws AccessDeniedException {
    if (!username.equals(post.getAuthor().getUsername())) {
      throw new AccessDeniedException();
    }
  }
}
