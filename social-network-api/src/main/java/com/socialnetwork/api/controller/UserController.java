package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.UserDtoInterface;
import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.exception.custom.AccessDeniedException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.authorized.UserMapper;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthUserMapper;
import com.socialnetwork.api.models.additional.Response;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.authorized.UserService;
import com.socialnetwork.api.service.noneauthorized.NonAuthUserService;
import lombok.RequiredArgsConstructor;
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
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;
import static com.socialnetwork.api.util.Constants.Auth.PAGE_NUMBER_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.QUERY;
import static com.socialnetwork.api.util.Constants.Auth.RESULTS_PER_PAGE_QUERY;
import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
  private final JwtTokenUtil jwtTokenUtil;
  private final UserService userService;
  private final UserMapper userMapper;
  private final NonAuthUserService nonAuthUserService;
  private final NonAuthUserMapper nonAuthUserMapper;

  @GetMapping("p/{username}")
  public UserDtoInterface getProfileByUsername(
      @PathVariable("username") String username, HttpServletRequest request)
      throws NoUserWithSuchCredentialsException {
    if (!jwtTokenUtil.isAuthTokenExists(request)) {
      return nonAuthUserMapper.mapForProfile(nonAuthUserService.findByUsername(username));

    }
    return userMapper.mapForProfile(userService.findByUsername(username),
            jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)));
  }

  @GetMapping("{username}/followers")
  public List<? extends UserDtoInterface> getFollowers(@PathVariable("username") String username,
                                                     @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                                                     @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersPerPage,
                                                     HttpServletRequest request)
      throws NoUserWithSuchCredentialsException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = usersPerPage.orElse(RESULTS_PER_PAGE_DEFAULT);
    if (!jwtTokenUtil.isAuthTokenExists(request)) {
      return nonAuthUserMapper.mapForListing(nonAuthUserService.getFollowers(username,
          pageD, resultsD));

    }
    String currentUserUsername = jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER));
    return userMapper.mapForListing(userService.getFollowers(username, currentUserUsername,
        pageD, resultsD), currentUserUsername);
  }

  @GetMapping("{username}/followed")
  public List<? extends UserDtoInterface> getFollowed(@PathVariable("username") String username,
                                                    @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                                                    @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersPerPage,
                                                    HttpServletRequest request)
      throws NoUserWithSuchCredentialsException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = usersPerPage.orElse(RESULTS_PER_PAGE_DEFAULT);
    if (!jwtTokenUtil.isAuthTokenExists(request)) {
      return nonAuthUserMapper.mapForListing(nonAuthUserService.getFollowed(username,
          pageD, resultsD));

    }
    String currentUserUsername = jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER));
    return userMapper.mapForListing(userService.getFollowed(username, currentUserUsername,
        pageD, resultsD), currentUserUsername);
  }

  @GetMapping("connect")
  public List<? extends UserDtoInterface> getConnect(@RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                                                   @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> postsPerPage,
                                                   HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    String currentUserUsername = jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER));
    return userMapper.mapForListing(
        userService.getListForConnectPage(currentUserUsername, page.orElse(PAGE_NUMBER_DEFAULT),
                postsPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)), currentUserUsername);
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
}
