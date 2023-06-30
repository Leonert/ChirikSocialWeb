package com.socialnetwork.api.repository;

import com.socialnetwork.api.model.additional.Follow;
import com.socialnetwork.api.model.additional.keys.FollowPk;
import com.socialnetwork.api.model.base.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowsRepository extends JpaRepository<Follow, FollowPk> {

  List<Follow> findAllByFollowerUser(User user);
}
