package com.socialnetwork.api.controller.authorized;

import com.socialnetwork.api.dto.authorized.PostDto;
import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.authorized.PostMapper;
import com.socialnetwork.api.mapper.authorized.UserMapper;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.authorized.SearchService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;
import static com.socialnetwork.api.util.Constants.Auth.PAGE_NUMBER_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.QUERY;
import static com.socialnetwork.api.util.Constants.Auth.RESULTS_PER_PAGE_QUERY;
import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;

@RestController
@RequestMapping("/api/search")
@AllArgsConstructor
public class SearchController {
  private final SearchService searchService;
  private final UserMapper userMapper;
  private final PostMapper postMapper;
  private final JwtTokenUtil jwtTokenUtil;

  @GetMapping("/posts")
  public List<PostDto.Response.WithAuthor> searchPosts(@RequestParam(QUERY) String query,
                                                       @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                                                       @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> postsPerPage,
                                                       HttpServletRequest request) {
    return postMapper.mapForListing(searchService.searchPosts(query, page.orElse(PAGE_NUMBER_DEFAULT),
        postsPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)),
            jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)));
  }

  @GetMapping("/users")
  public List<UserDto.Response.Listing> searchUsers(@RequestParam(QUERY) String query,
                                                    @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                                                    @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersPerPage,
                                                    HttpServletRequest request)
          throws NoUserWithSuchCredentialsException {
    return userMapper.mapForListing(searchService.searchUsers(query, page.orElse(PAGE_NUMBER_DEFAULT),
        usersPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)),
            jwtTokenUtil.getUsernameFromToken(request.getHeader(AUTHORIZATION_HEADER)));
  }
}
