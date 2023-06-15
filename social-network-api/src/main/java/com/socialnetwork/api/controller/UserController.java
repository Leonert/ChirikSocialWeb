package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.DtoInterface;
import com.socialnetwork.api.dto.UserDtoInterface;
import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.authorized.PostMapper;
import com.socialnetwork.api.mapper.authorized.UserMapper;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthPostMapper;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthUserMapper;
import com.socialnetwork.api.models.additional.Response;
import com.socialnetwork.api.service.authorized.LikeService;
import com.socialnetwork.api.service.authorized.UserService;
import com.socialnetwork.api.service.noneauthorized.NonAuthUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Request.PAGE_NUMBER_QUERY;
import static com.socialnetwork.api.util.Constants.Request.RESULTS_PER_PAGE_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.USERNAME_ATTRIBUTE;
import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController extends Controller {
  private final UserService userService;
  private final UserMapper userMapper;
  private final LikeService likeService;
  private final PostMapper postMapper;
  private final NonAuthPostMapper nonAuthPostMapper;
  private final NonAuthUserService nonAuthUserService;
  private final NonAuthUserMapper nonAuthUserMapper;

  @GetMapping("p/{username}")
  public UserDtoInterface getProfileByUsername(
          @PathVariable("username") String username,
          @RequestAttribute(USERNAME_ATTRIBUTE) Optional<String> currentUserUsername)
          throws NoUserWithSuchCredentialsException {
    if (currentUserUsername.isEmpty()) {
      return nonAuthUserMapper.mapForProfile(nonAuthUserService.findByUsername(username));
    }
    return userMapper.mapForProfile(userService.findByUsername(username), currentUserUsername.get());
  }

  @GetMapping("{username}/followers")
  public ResponseEntity<List<? extends DtoInterface>>
    getFollowers(@PathVariable("username") String username,
               @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
               @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersPerPage,
               @RequestAttribute(USERNAME_ATTRIBUTE) Optional<String> currentUserUsername)
          throws NoUserWithSuchCredentialsException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = usersPerPage.orElse(RESULTS_PER_PAGE_DEFAULT);
    if (currentUserUsername.isEmpty()) {
      return getListResponseEntity(nonAuthUserMapper.mapForListing(nonAuthUserService.getFollowers(username,
              pageD, resultsD)));

    }
    String currentUserUsernameD = currentUserUsername.get();
    return getListResponseEntity(userMapper.mapForListing(userService.getFollowers(username, currentUserUsernameD,
            pageD, resultsD), currentUserUsernameD));
  }

  @GetMapping("{username}/followed")
  public ResponseEntity<List<? extends DtoInterface>>
    getFollowed(@PathVariable("username") String username,
              @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
              @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersPerPage,
              @RequestAttribute(USERNAME_ATTRIBUTE) Optional<String> currentUserUsername)
          throws NoUserWithSuchCredentialsException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = usersPerPage.orElse(RESULTS_PER_PAGE_DEFAULT);
    if (currentUserUsername.isEmpty()) {
      return getListResponseEntity(nonAuthUserMapper.mapForListing(nonAuthUserService.getFollowed(username,
              pageD, resultsD)));
    }
    String currentUserUsernameD = currentUserUsername.get();
    return getListResponseEntity(userMapper.mapForListing(userService.getFollowed(username, currentUserUsernameD,
            pageD, resultsD), currentUserUsernameD));
  }

  @GetMapping("connect")
  public ResponseEntity<List<? extends DtoInterface>>
    getConnect(@RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
             @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> postsPerPage,
             @RequestAttribute(USERNAME_ATTRIBUTE) String currentUserUsername)
          throws NoUserWithSuchCredentialsException {
    return getListResponseEntity(userMapper.mapForListing(
            userService.getListForConnectPage(currentUserUsername, page.orElse(PAGE_NUMBER_DEFAULT),
                    postsPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)), currentUserUsername));
  }

  @PostMapping("p")
  public ResponseEntity<UserDtoInterface> editProfile(@RequestBody UserDto.Request.ProfileEditing userDto,
                                                      @RequestAttribute(USERNAME_ATTRIBUTE) String username)
          throws NoUserWithSuchCredentialsException {
    return ResponseEntity.ok(userMapper.mapForProfile(userService.editProfile(userDto, username), username));
  }

  @PostMapping("p/{username}")
  public ResponseEntity<?> followUnfollow(@PathVariable("username") String username,
                                          @RequestAttribute(USERNAME_ATTRIBUTE) String currentUserUsername)
          throws NoUserWithSuchCredentialsException {
    return userService.followUnfollow(username, currentUserUsername)
            ? ResponseEntity.status(HttpStatus.CREATED).body(new Response("User was subscribed successfully")) :
            ResponseEntity.status(HttpStatus.OK).body(new Response("User was unsubscribed"));
  }

  @GetMapping("p/{username}/liked")
  public ResponseEntity<?> getLikedPosts(@PathVariable("username") String username,
                                         @RequestAttribute(USERNAME_ATTRIBUTE) Optional<String> currentUserUsername)
          throws NoUserWithSuchCredentialsException {
    if (currentUserUsername.isEmpty()) {
      return getListResponseEntity(nonAuthPostMapper.mapForListing(
              likeService.getUserLikedPosts(userService.findByUsername(username))));
    }
    return getListResponseEntity(postMapper.mapForListing(
            likeService.getUserLikedPosts(userService.findByUsername(username)),
            currentUserUsername.get()));
  }
}
