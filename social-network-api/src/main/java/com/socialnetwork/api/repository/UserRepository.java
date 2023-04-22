package com.socialnetwork.api.repository;

import com.socialnetwork.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByUsername(String username);

  Optional<User> findByEmailAddress(String emailAddress);
}
