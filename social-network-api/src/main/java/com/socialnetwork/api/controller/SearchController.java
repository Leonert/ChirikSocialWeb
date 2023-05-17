package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.dto.UserDto;
import com.socialnetwork.api.mapper.UserMapper;
import com.socialnetwork.api.service.SearchService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;

@RestController
@RequestMapping("/api/search")
@AllArgsConstructor
public class SearchController {
  private final SearchService searchService;
  private final UserMapper userMapper;

  @GetMapping("/posts")
  public List<PostDto.Response.PostInfo> searchPosts(@RequestParam("q") String query,
                                   @RequestParam("p") Optional<Integer> page,
                                   @RequestParam("n") Optional<Integer> postsPerPage) {
    return userMapper.mapPostsForListing(searchService.searchPosts(query, page.orElse(PAGE_NUMBER_DEFAULT),
        postsPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("/users")
  public List<UserDto.Response.Listing> searchUsers(@RequestParam("q") String query,
                                                    @RequestParam("p") Optional<Integer> page,
                                                    @RequestParam("n") Optional<Integer> usersPerPage,
                                                    HttpServletRequest request) { //TODO
    return userMapper.mapUsersForListing(searchService.searchUsers(query, page.orElse(PAGE_NUMBER_DEFAULT),
        usersPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }
}
