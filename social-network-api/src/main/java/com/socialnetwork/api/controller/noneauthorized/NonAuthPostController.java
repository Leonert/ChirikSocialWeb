package com.socialnetwork.api.controller.noneauthorized;

import com.socialnetwork.api.dto.noneauthorized.NonAuthPostDto;
import com.socialnetwork.api.dto.noneauthorized.NonAuthUserDto;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthPostMapper;
import com.socialnetwork.api.mapper.noneauthorized.NonAuthUserMapper;
import com.socialnetwork.api.service.noneauthorized.NonAuthLikeService;
import com.socialnetwork.api.service.noneauthorized.NonAuthPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Auth.ID_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.PAGE_NUMBER_QUERY;
import static com.socialnetwork.api.util.Constants.Auth.RESULTS_PER_PAGE_QUERY;
import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.POSTS_PER_PAGE_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/unauth/posts")
public class NonAuthPostController {
  private final NonAuthPostService nonAuthPostService;
  private final NonAuthLikeService nonAuthLikeService;
  private final NonAuthPostMapper nonAuthPostMapper;
  private final NonAuthUserMapper nonAuthUserMapper;

  @GetMapping("/{id}")
  public NonAuthPostDto.Response.WithAuthor getPostById(@PathVariable(ID_QUERY) Integer id)
      throws NoPostWithSuchIdException {
    return nonAuthPostMapper.convertToPostDtoDefault(nonAuthPostService.getReferenceById(id));
  }

  @GetMapping()
  public List<NonAuthPostDto.Response.WithAuthor> getPosts(@RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                                                    @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> posts) {
    return nonAuthPostMapper.mapForListing(nonAuthPostService.getPosts(page.orElse(PAGE_NUMBER_DEFAULT),
            posts.orElse(POSTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("replies")
  public List<NonAuthPostDto.Response.WithAuthor> getReplies(@RequestParam(ID_QUERY) int id,
                                                      @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
                                                      @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage)
          throws NoPostWithSuchIdException {
    return nonAuthPostMapper.mapForListing(nonAuthPostService.getReplies(id,
            page.orElse(PAGE_NUMBER_DEFAULT), usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("retweets")
  public List<NonAuthUserDto.Response.Listing> getRetweets(
          @RequestParam(ID_QUERY) int id,
          @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
          @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage) {
    return nonAuthUserMapper.mapForListing(nonAuthPostService.getRetweets(id,
            page.orElse(PAGE_NUMBER_DEFAULT), usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }

  @GetMapping("likes")
  public List<NonAuthUserDto.Response.Listing> getLikes(
          @RequestParam(ID_QUERY) int id,
          @RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> page,
          @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> usersForPage) {
    return nonAuthUserMapper.mapForListing(nonAuthLikeService.getLikes(id,
            page.orElse(PAGE_NUMBER_DEFAULT), usersForPage.orElse(RESULTS_PER_PAGE_DEFAULT)));
  }
}
