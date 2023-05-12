package com.socialnetwork.api.repository;

import java.util.List;

import com.socialnetwork.api.dto.MessageDto;
import com.socialnetwork.api.models.base.Message;
import com.socialnetwork.api.models.base.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
  List<Message> findByRecipient(User recipient);

  List<Message> findBySender(User sender);

  List<Message> findByMessageContainingIgnoreCase(String keyword);
  List<Message> findAll();

  @Transactional
  @Modifying
  @Query("DELETE FROM Message m WHERE m.id = :id")
  void deleteMessage(@Param("id") int id);
}