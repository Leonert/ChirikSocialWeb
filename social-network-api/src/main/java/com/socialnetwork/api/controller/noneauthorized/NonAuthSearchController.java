package com.socialnetwork.api.controller.noneauthorized;

import com.socialnetwork.api.dto.noneauthorized.NonAuthPostDto;
import com.socialnetwork.api.dto.noneauthorized.NonAuthUserDto;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthUserMapper;
import com.socialnetwork.api.service.noneauthorized.NonAuthSearchService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Auth.PAGE_NUMBER_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.QUERY;
import static com.socialnetwork.api.util.Constants.Auth.RESULTS_PER_PAGE_QUERY;
import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;

@RestController
@RequestMapping("/api/unauth/search")
@AllArgsConstructor
public class NonAuthSearchController {
  private final NonAuthSearchService nonAuthSearchService;
  private final NonAuthUserMapper nonAuthUserMapper;

  @GetMapping("/posts")
  public List<NonAuthPostDto.Response.WithAuthor> searchPosts(@RequestParam(QUERY) String query,
                                   @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                                   @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> postsPerPage) {
    return nonAuthUserMapper.mapPostsForListing(nonAuthSearchService.searchPosts(query, page.orElse(PAGE_NUMBER_DEFAULT),
        postsPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("/users")
  public List<NonAuthUserDto.Response.Listing> searchUsers(@RequestParam(QUERY) String query,
                                                    @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                                                    @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersPerPage) {
    return nonAuthUserMapper.mapUsersForListing(nonAuthSearchService.searchUsers(query, page.orElse(PAGE_NUMBER_DEFAULT),
        usersPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }
}
