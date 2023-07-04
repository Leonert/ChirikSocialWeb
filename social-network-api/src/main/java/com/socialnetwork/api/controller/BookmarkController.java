package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.PostDtoInterface;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.mapper.authorized.PostMapper;
import com.socialnetwork.api.model.additional.Bookmark;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.security.CurrentUser;
import com.socialnetwork.api.security.jwt.UserPrincipal;
import com.socialnetwork.api.service.authorized.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

  private final UserService userService;
  private final PostMapper postMapper;

  @GetMapping()
  public ResponseEntity<List<PostDtoInterface>> getUserNotifications(@CurrentUser UserPrincipal currentUser)
        throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException {
    List<PostDtoInterface> outcome = new ArrayList<>();
    String username = currentUser.getUsername();

    for (Post post : userService.findByUsername(username).getBookmarkedPosts()
          .stream().map(Bookmark::getBookmarkedPost).toList()) {
      outcome.add(postMapper.convertToPostDtoDefault(post, username));
    }

    return ResponseEntity.ok().body(outcome);
  }
}
