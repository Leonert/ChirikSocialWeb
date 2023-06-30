package com.socialnetwork.api.repository;

import com.socialnetwork.api.model.additional.Bookmark;
import com.socialnetwork.api.model.additional.keys.BookmarkPk;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, BookmarkPk> {
  boolean existsByBookmarkPk(BookmarkPk bookmarkPk);

  List<Bookmark> findAllByBookmarkedPost(Post post);

  int countAllByBookmarkedPost(Post post);

  @Query("SELECT b.bookmarkedBy FROM Bookmark b WHERE b.bookmarkedPost.id = :id")
  List<User> findUsersByBookmarkedPost(@Param("id") int id);

  @Transactional
  void deleteByBookmarkedByAndBookmarkedPost(User user, Post post);
}
