package com.socialnetwork.api.repository;

import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.model.base.chat.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Integer> {

  List<Message> findByRecipient(User recipient);

  List<Message> findBySender(User sender);

  List<Message> findByMessageContainingIgnoreCase(String keyword);

  Optional<Message> findFirstByidOrderByTimestampDesc(int id);

  @Transactional
  @Modifying
  @Query("DELETE FROM Message m WHERE m.chat.chatId = :id")
  void deleteMessagesByChatId(@Param("id") int chatId);

  List<Message> findByChat_ChatIdOrderByTimestampDesc(int chatId);

}