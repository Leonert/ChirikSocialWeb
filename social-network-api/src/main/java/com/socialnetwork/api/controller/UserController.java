package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.dto.UserDto;
import com.socialnetwork.api.exception.AccessDeniedException;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.additional.Response;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
  static final int PAGE_NUMBER = 0;
  static final int RESULTS_PER_PAGE = 10;
  static final String AUTHORIZATION_HEADER = "Authorization";
  private final UserService userService;
  private final ModelMapper modelMapper;
  private final JwtTokenUtil jwtTokenUtil;

  @GetMapping("p/{username}")
  public UserDto.Response.Profile getProfileByUsername(
          @PathVariable("username") String username, HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return mapForProfile(userService.findByUsername(username),
            jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)));
  }

  @GetMapping("followers")
  public List<UserDto.Response.Listing> getFollowers(@RequestBody UserDto.Request.Username userDto,
                                                     @RequestParam("p") Optional<Integer> page,
                                                     @RequestParam("n") Optional<Integer> postsPerPage,
                                                     HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return mapForListing(userService.getFollowers(userDto.getUsername(),
            jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)),
            page.orElse(PAGE_NUMBER), postsPerPage.orElse(RESULTS_PER_PAGE)));
  }

  @GetMapping("followed")
  public List<UserDto.Response.Listing> getFollowed(@RequestBody UserDto.Request.Username userDto,
                                                    @RequestParam("p") Optional<Integer> page,
                                                    @RequestParam("n") Optional<Integer> postsPerPage,
                                                    HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return mapForListing(userService.getFollowed(userDto.getUsername(),
            jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)),
            page.orElse(PAGE_NUMBER), postsPerPage.orElse(RESULTS_PER_PAGE)));
  }

  @GetMapping("connect")
  public List<UserDto.Response.Listing> getConnect(@RequestParam("p") Optional<Integer> page,
                                                   @RequestParam("n") Optional<Integer> postsPerPage,
                                                   HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return mapForListing(
            userService.getListForConnectPage(jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)),
                    page.orElse(PAGE_NUMBER), postsPerPage.orElse(RESULTS_PER_PAGE)));
  }

  @PatchMapping("p")
  public ResponseEntity<?> editProfile(@RequestBody UserDto.Request.ProfileEditing userDto,
                                       HttpServletRequest request)
          throws NoUserWithSuchCredentialsException, AccessDeniedException {
    if (!userDto.getUsername().equals(jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)))) {
      throw new AccessDeniedException();
    }
    userService.editProfile(userDto);
    return ResponseEntity.ok(new Response("Profile was edited"));
  }

  @PostMapping("p/{username}")
  public ResponseEntity<?> followUnfollow(@PathVariable("username") String username,
                                          HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return userService.followUnfollow(username, jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)))
            ? ResponseEntity.status(HttpStatus.CREATED).body(new Response("User was subscribed successfully")) :
            ResponseEntity.status(HttpStatus.OK).body(new Response("User was unsubscribed"));
  }

  private UserDto.Response.Profile mapForProfile(User user, String currentUserName) {
    UserDto.Response.Profile profile = modelMapper.map(user, UserDto.Response.Profile.class);
    profile.setFollowedCounter(user.getFollowed().size());
    profile.setFollowersCounter(user.getFollowers().size());
    try {
      profile.setCurrUserFollower(userService.isFollowed(userService.findByUsername(currentUserName), user));
    } catch (NoUserWithSuchCredentialsException e) {
      profile.setCurrUserFollower(false);
    }
    profile.setProfilePosts(user.getPosts().stream().map(p -> modelMapper.map(p, PostDto.Response.Profile.class)).toList());
    return profile;
  }

  private List<UserDto.Response.Listing> mapForListing(List<User> users) {
    return users.stream().map(u -> modelMapper.map(u, UserDto.Response.Listing.class)).toList();
  }
}
