package com.socialnetwork.api.repository;

import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.keys.LikePk;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface LikeRepository extends JpaRepository<Like, LikePk> {
  boolean existsByLikePk(LikePk likePk);

  List<Like> findAllByLikedPost(Post post);

  int countAllByLikedPost(Post post);

  @Transactional
  void deleteByLikedByAndLikedPost(User user, Post post);
}
