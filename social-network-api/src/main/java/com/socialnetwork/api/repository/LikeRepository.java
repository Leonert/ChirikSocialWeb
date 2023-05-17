package com.socialnetwork.api.repository;

import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.keys.LikePk;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface LikeRepository extends JpaRepository<Like, LikePk> {
  boolean existsByLikePk(LikePk likePk);

  List<Like> findAllByLikedPost(Post post);

  int countAllByLikedPost(Post post);

  @Query("SELECT l.likedBy FROM Like l WHERE l.likedPost.id = :id")
  List<User> findUsersByLikedPost(@Param("id") int id);

  @Transactional
  void deleteByLikedByAndLikedPost(User user, Post post);
}
