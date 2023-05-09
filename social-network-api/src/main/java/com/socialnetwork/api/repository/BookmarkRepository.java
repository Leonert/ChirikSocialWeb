package com.socialnetwork.api.repository;

import com.socialnetwork.api.models.additional.Bookmark;
import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.keys.BookmarkPk;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, BookmarkPk> {
  boolean existsByBookmarkedByAndBookmarkedPost(User user, Post post);

  Optional<Bookmark> findByBookmarkedByAndBookmarkedPost(User user, Post post);

  List<Bookmark> findAllByBookmarkedPost(Post post);
}
