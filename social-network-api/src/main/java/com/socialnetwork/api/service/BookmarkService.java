package com.socialnetwork.api.service;

import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.model.additional.Bookmark;
import com.socialnetwork.api.model.additional.keys.BookmarkPk;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.BookmarkRepository;
import com.socialnetwork.api.service.authorized.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkService {
  private final BookmarkRepository bookmarkRepository;
  private final UserService userService;

  public void save(int userId, int postId) {
    bookmarkRepository.save(new Bookmark(new User(userId), new Post(postId)));
  }

  public void delete(int userId, int postId) {
    bookmarkRepository.deleteByBookmarkedByAndBookmarkedPost(new User(userId), new Post(postId));
  }

  public boolean existsByIds(int userId, int postId) {
    return bookmarkRepository.existsByBookmarkPk(new BookmarkPk(userId, postId));
  }

  public List<Integer> getUsersBookmarksIds(Post post) {
    return bookmarkRepository.findAllByBookmarkedPost(post)
          .stream()
          .map(bookmark -> bookmark.getBookmarkedBy().getId())
          .toList();
  }

  public int countPostBookmarks(int id) {
    return bookmarkRepository.countAllByBookmarkedPost(new Post(id));
  }

  public boolean bookmarkUnBookmark(int postId, String username) throws NoUserWithSuchCredentialsException {
    int userId = userService.findByUsername(username).getId();
    if (!existsByIds(userId, postId)) {
      save(userId, postId);
      return true;
    } else {
      delete(userId, postId);
      return false;
    }
  }

  public List<User> getBookmarks(int id, String username, int page, int usersForPage)
        throws NoUserWithSuchCredentialsException {
    User currentUser = userService.findByUsername(username);
    return bookmarkRepository.findUsersByBookmarkedPost(id)
          .stream()
          .skip(page * usersForPage).limit(usersForPage)
          .peek(f -> f.setCurrUserFollower(userService.isFollowed(currentUser, f)))
          .toList();
  }
}
