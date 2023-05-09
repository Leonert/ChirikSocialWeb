package com.socialnetwork.api.repository;

import java.util.List;

import com.socialnetwork.api.models.base.Message;
import com.socialnetwork.api.models.base.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

  List<Message> findByRecipient(User recipient);

  List<Message> findBySender(User sender);

  List<Message> findByMessageContainingIgnoreCase(String keyword);
}
