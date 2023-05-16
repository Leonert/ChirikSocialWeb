package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.UserDto;
import com.socialnetwork.api.exception.custom.AccessDeniedException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.UserMapper;
import com.socialnetwork.api.models.additional.Response;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.UserService;
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
import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;
import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;
  private final UserMapper userMapper;
  private final JwtTokenUtil jwtTokenUtil;

  @GetMapping("p/{username}")
  public UserDto.Response.Profile getProfileByUsername(
      @PathVariable("username") String username, HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return userMapper.mapForProfile(userService.findByUsername(username), username);
  }

  @GetMapping("followers")
  public List<UserDto.Response.Listing> getFollowers(@RequestBody UserDto.Request.Username userDto,
                                                     @RequestParam("p") Optional<Integer> page,
                                                     @RequestParam("n") Optional<Integer> postsPerPage,
                                                     HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return userMapper.mapForListing(userService.getFollowers(userDto.getUsername(),
        jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)),
        page.orElse(PAGE_NUMBER_DEFAULT), postsPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("followed")
  public List<UserDto.Response.Listing> getFollowed(@RequestBody UserDto.Request.Username userDto,
                                                    @RequestParam("p") Optional<Integer> page,
                                                    @RequestParam("n") Optional<Integer> postsPerPage,
                                                    HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return userMapper.mapForListing(userService.getFollowed(userDto.getUsername(),
        jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)),
        page.orElse(PAGE_NUMBER_DEFAULT), postsPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("connect")
  public List<UserDto.Response.Listing> getConnect(@RequestParam("p") Optional<Integer> page,
                                                   @RequestParam("n") Optional<Integer> postsPerPage,
                                                   HttpServletRequest request) throws NoUserWithSuchCredentialsException {
    return userMapper.mapForListing(
        userService.getListForConnectPage(jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)),
        page.orElse(PAGE_NUMBER_DEFAULT), postsPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
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
