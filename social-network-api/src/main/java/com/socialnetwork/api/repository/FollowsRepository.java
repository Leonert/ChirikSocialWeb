package com.socialnetwork.api.repository;

import com.socialnetwork.api.models.additional.Follow;
import com.socialnetwork.api.models.additional.keys.FollowPk;
import com.socialnetwork.api.models.base.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowsRepository extends JpaRepository<Follow, FollowPk> {
  List<Follow> findAllByFollowedUser(User user);

  List<Follow> findAllByFollowerUser(User user);
}
