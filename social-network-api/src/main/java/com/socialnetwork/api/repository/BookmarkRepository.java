package com.socialnetwork.api.repository;

import com.socialnetwork.api.models.additional.Bookmark;
import com.socialnetwork.api.models.additional.keys.BookmarkPk;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, BookmarkPk> {
  boolean existsByBookmarkPk(BookmarkPk bookmarkPk);

  List<Bookmark> findAllByBookmarkedPost(Post post);

  int countAllByBookmarkedPost(Post post);

  @Transactional
  void deleteByBookmarkedByAndBookmarkedPost(User user, Post post);
}
