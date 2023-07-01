package com.socialnetwork.api.repository;

import com.socialnetwork.api.model.base.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByUsername(String username);

  Optional<User> findByEmailAddress(String emailAddress);

  Page<User> findByUsernameContainingIgnoreCaseOrNameContaining(String username, String name, Pageable pageable);

  boolean existsByUsername(String username);

  boolean existsByEmailAddress(String emailAddress);

  Optional<User> findByUsernameAndId(String username, int id);

  List<User> findByUsernameContainingIgnoreCase(String keyword);

}
