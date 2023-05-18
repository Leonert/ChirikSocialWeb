package com.socialnetwork.api.controller.noneauthorized;

import com.socialnetwork.api.dto.noneauthorized.NonAuthUserDto;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthUserMapper;
import com.socialnetwork.api.service.noneauthorized.NonAuthUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Auth.PAGE_NUMBER_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.RESULTS_PER_PAGE_QUERY;
import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/unauth")
public class NonAuthUserController {
  private final NonAuthUserService nonAuthUserService;
  private final NonAuthUserMapper nonAuthUserMapper;

  @GetMapping("p/{username}")
  public NonAuthUserDto.Response.Profile getProfileByUsername(
      @PathVariable("username") String username) throws NoUserWithSuchCredentialsException {
    return nonAuthUserMapper.mapForProfile(nonAuthUserService.findByUsername(username));
  }

  @GetMapping("{username}/followers")
  public List<NonAuthUserDto.Response.Listing>
    getFollowers(@PathVariable("username") String username,
                 @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                 @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> postsPerPage)
      throws NoUserWithSuchCredentialsException {
    return nonAuthUserMapper.mapForListing(nonAuthUserService.getFollowers(username,
        page.orElse(PAGE_NUMBER_DEFAULT), postsPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("{username}/followed")
  public List<NonAuthUserDto.Response.Listing>
    getFollowed(@PathVariable("username") String username,
                @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> postsPerPage)
      throws NoUserWithSuchCredentialsException {
    return nonAuthUserMapper.mapForListing(nonAuthUserService.getFollowed(username,
        page.orElse(PAGE_NUMBER_DEFAULT), postsPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }
}
