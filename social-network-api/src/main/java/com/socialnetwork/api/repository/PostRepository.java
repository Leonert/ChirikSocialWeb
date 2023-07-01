package com.socialnetwork.api.repository;

import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
  List<Post> findPostsByTextContainingIgnoreCase(String query, Pageable pageable);

  int countAllByOriginalPostAndTextNotNullAndImageNull(Post post);

  int countAllByOriginalPostAndTextNullAndImageNull(Post post);

  @Query("SELECT p.author FROM Post p WHERE p.originalPost.id = :id AND p.text IS NULL AND p.image IS NULL")
  List<User> findUsersByRetweetedPost(@Param("id") int id);

  List<Post> findAllByOriginalPostAndTextIsNotNull(Post post, Pageable pageable);

  List<Post> findAllByAuthorIn(List<User> authors, Pageable pageable);

  @Transactional
  void deletePostByAuthorAndOriginalPostAndTextIsNullAndImageIsNull(User author, Post originalPost);

  boolean existsByAuthorAndOriginalPostAndTextIsNullAndImageIsNull(User author, Post originalPost);

  @Query("from Post p where p.id not in (select v.seenPost.id from View v where v.viewer.id = :currentUserid)")
  List<Post> findAllPostsUnViewedByUser(@Param("currentUserid") int currentUserId, Pageable pageable);
}
