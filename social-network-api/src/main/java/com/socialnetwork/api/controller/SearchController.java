package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.PostDtoInterface;
import com.socialnetwork.api.dto.UserDtoInterface;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.authorized.PostMapper;
import com.socialnetwork.api.mapper.authorized.UserMapper;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthUserMapper;
import com.socialnetwork.api.security.CurrentUser;
import com.socialnetwork.api.security.jwt.UserPrincipal;
import com.socialnetwork.api.service.authorized.SearchService;
import com.socialnetwork.api.service.noneauthorized.NonAuthSearchService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Request.PAGE_NUMBER_QUERY;
import static com.socialnetwork.api.util.Constants.Request.QUERY;
import static com.socialnetwork.api.util.Constants.Request.RESULTS_PER_PAGE_QUERY;
import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.POSTS_PER_PAGE_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;

@RestController
@RequestMapping("/api/search")
@AllArgsConstructor
public class SearchController {

  private final SearchService searchService;
  private final UserMapper userMapper;
  private final PostMapper postMapper;
  private final NonAuthSearchService nonAuthSearchService;
  private final NonAuthUserMapper nonAuthUserMapper;

  @GetMapping("/posts")
  public List<? extends PostDtoInterface> searchPosts(@RequestParam(QUERY) String query,
                                                      @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                                                      @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> postsPerPage,
                                                      @CurrentUser UserPrincipal currentUser) {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = postsPerPage.orElse(POSTS_PER_PAGE_DEFAULT);

    if (currentUser == null) {
      return nonAuthUserMapper.mapPostsForListing(nonAuthSearchService.searchPosts(query, pageD, resultsD));
    }

    return postMapper.mapForListing(searchService.searchPosts(query, pageD,
          resultsD), currentUser.getUsername());
  }

  @GetMapping("/users")
  public List<? extends UserDtoInterface> searchUsers(@RequestParam(QUERY) String query,
                                                      @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                                                      @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersPerPage,
                                                      @CurrentUser UserPrincipal currentUser)
        throws NoUserWithSuchCredentialsException {
    int pageD = page.orElse(PAGE_NUMBER_DEFAULT);
    int resultsD = usersPerPage.orElse(RESULTS_PER_PAGE_DEFAULT);

    if (currentUser == null) {
      return nonAuthUserMapper.mapUsersForListing(nonAuthSearchService.searchUsers(query, pageD, resultsD));
    }

    return userMapper.mapForListing(searchService.searchUsers(query, pageD,
          resultsD), currentUser.getUsername());
  }
}
