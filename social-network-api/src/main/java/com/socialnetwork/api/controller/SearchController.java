package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.dto.UserDto;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.service.SearchService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Const.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Const.Response.RESULTS_PER_PAGE_DEFAULT;

@RestController
@RequestMapping("/api/search")
@AllArgsConstructor
public class SearchController {
  private final SearchService searchService;
  private final ModelMapper modelMapper;

  @GetMapping("/posts")
  public List<PostDto.Response.Default> searchPosts(@RequestParam("q") String query,
                                   @RequestParam("p") Optional<Integer> page,
                                   @RequestParam("n") Optional<Integer> postsPerPage) {
    return mapPostsForListing(searchService.searchPosts(query, page.orElse(PAGE_NUMBER_DEFAULT),
        postsPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("/users")
  public List<UserDto.Response.Listing> searchUsers(@RequestParam("q") String query,
                                                    @RequestParam("p") Optional<Integer> page,
                                                    @RequestParam("n") Optional<Integer> usersPerPage,
                                                    HttpServletRequest request) { //TODO
    return mapUsersForListing(searchService.searchUsers(query, page.orElse(PAGE_NUMBER_DEFAULT),
        usersPerPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  private List<UserDto.Response.Listing> mapUsersForListing(List<User> users) {
    return users.stream().map(u -> modelMapper.map(u, UserDto.Response.Listing.class)).toList();
  }

  private List<PostDto.Response.Default> mapPostsForListing(List<Post> posts) {
    return posts.stream().map(p -> modelMapper.map(p, PostDto.Response.Default.class)).toList();
  }
}
